// Cinematic Ambient Soundtrack Engine & Audio Manager
// Uses Web Audio API to create a bespoke, warm, slow piano & celestial ambient soundscape,
// while also gracefully supporting an external audio file if placed in /music.mp3

class AudioManager {
  constructor() {
    this.ctx = null
    this.isPlaying = false
    this.isMuted = false
    this.externalAudio = null
    this.hasExternalAudio = false
    this.synthLoopTimer = null
    this.masterGain = null
    this.initialized = false
    this.onStateChangeCallbacks = new Set()
  }

  init() {
    if (this.initialized) return
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext
      if (!AudioContext) return
      this.ctx = new AudioContext()
      this.masterGain = this.ctx.createGain()
      this.masterGain.gain.setValueAtTime(0.7, this.ctx.currentTime)
      this.masterGain.connect(this.ctx.destination)

      // Test for local external audio file
      const audio = new Audio()
      audio.src = '/music.mp3'
      audio.loop = true
      audio.preload = 'metadata'
      audio.oncanplay = () => {
        this.hasExternalAudio = true
        this.externalAudio = audio
        this.notify()
      }
      audio.onerror = () => {
        // No local audio file; fallback automatically to beautiful procedural ambient piano
        this.hasExternalAudio = false
        this.notify()
      }

      this.initialized = true
    } catch (e) {
      console.warn('AudioContext not supported or blocked:', e)
    }
  }

  subscribe(callback) {
    this.onStateChangeCallbacks.add(callback)
    return () => this.onStateChangeCallbacks.delete(callback)
  }

  notify() {
    this.onStateChangeCallbacks.forEach(cb => cb({
      isPlaying: this.isPlaying,
      isMuted: this.isMuted,
      hasExternalAudio: this.hasExternalAudio
    }))
  }

  async play() {
    if (!this.initialized) this.init()
    if (!this.ctx) return

    if (this.ctx.state === 'suspended') {
      await this.ctx.resume()
    }

    if (this.hasExternalAudio && this.externalAudio) {
      try {
        await this.externalAudio.play()
        this.isPlaying = true
        this.notify()
        return
      } catch (err) {
        console.warn('External audio play failed, falling back to ambient synth:', err)
      }
    }

    // Play generative ambient piano
    this.startAmbientSynth()
    this.isPlaying = true
    this.notify()
  }

  pause() {
    if (this.externalAudio && !this.externalAudio.paused) {
      this.externalAudio.pause()
    }
    this.stopAmbientSynth()
    this.isPlaying = false
    this.notify()
  }

  toggle() {
    if (this.isPlaying) {
      this.pause()
    } else {
      this.play()
    }
  }

  startAmbientSynth() {
    if (this.synthLoopTimer) return

    // Emotional, cinematic piano chord progression:
    // EbMaj9 (Eb, G, Bb, D, F) -> Cm9 (C, Eb, G, Bb, D) -> AbMaj7 (Ab, C, Eb, G) -> Bbadd9 (Bb, D, F, C)
    const chords = [
      [155.56, 196.00, 233.08, 293.66, 349.23], // EbMaj9
      [130.81, 155.56, 196.00, 233.08, 293.66], // Cm9
      [103.83, 130.81, 155.56, 196.00, 261.63], // AbMaj7
      [116.54, 146.83, 174.61, 220.00, 293.66], // Bb9
    ]

    let step = 0
    const playNextChord = () => {
      if (!this.isPlaying || !this.ctx) return
      const chord = chords[step % chords.length]
      step++

      chord.forEach((freq, idx) => {
        const delay = idx * 0.18 + (Math.random() * 0.08)
        this.playPianoNote(freq, delay, 4.5 + Math.random())
      })

      // Occasional gentle high starlight note
      if (Math.random() > 0.3) {
        const highNotes = [587.33, 698.46, 783.99, 880.00, 1046.50]
        const hFreq = highNotes[Math.floor(Math.random() * highNotes.length)]
        this.playPianoNote(hFreq, 1.8 + Math.random(), 3.5, 0.06)
      }

      this.synthLoopTimer = setTimeout(playNextChord, 6200)
    }

    playNextChord()
  }

  stopAmbientSynth() {
    if (this.synthLoopTimer) {
      clearTimeout(this.synthLoopTimer)
      this.synthLoopTimer = null
    }
  }

  playPianoNote(freq, delaySeconds = 0, duration = 4, volume = 0.09) {
    if (!this.ctx || !this.masterGain) return
    const now = this.ctx.currentTime + delaySeconds

    // Fundamental oscillator (Warm sine + triangle blend)
    const osc = this.ctx.createOscillator()
    const osc2 = this.ctx.createOscillator()
    const noteGain = this.ctx.createGain()
    const filter = this.ctx.createBiquadFilter()

    osc.type = 'triangle'
    osc.frequency.setValueAtTime(freq, now)

    osc2.type = 'sine'
    osc2.frequency.setValueAtTime(freq * 1.002, now) // subtle chorus detune

    // Warm low-pass filter
    filter.type = 'lowpass'
    filter.frequency.setValueAtTime(freq * 4.5, now)
    filter.frequency.exponentialRampToValueAtTime(Math.max(freq * 1.2, 100), now + duration)

    // Gentle piano envelope
    noteGain.gain.setValueAtTime(0.0001, now)
    noteGain.gain.linearRampToValueAtTime(volume, now + 0.04)
    noteGain.gain.exponentialRampToValueAtTime(volume * 0.4, now + 1.2)
    noteGain.gain.exponentialRampToValueAtTime(0.00001, now + duration)

    osc.connect(filter)
    osc2.connect(filter)
    filter.connect(noteGain)
    noteGain.connect(this.masterGain)

    osc.start(now)
    osc2.start(now)
    osc.stop(now + duration + 0.1)
    osc2.stop(now + duration + 0.1)
  }

  // Sound effect when blowing out birthday candles
  playCandleBlowSound() {
    if (!this.ctx) return
    const now = this.ctx.currentTime

    // White noise breath buffer
    const bufferSize = this.ctx.sampleRate * 1.2
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate)
    const data = buffer.getChannelData(0)
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * 0.12
    }

    const noise = this.ctx.createBufferSource()
    noise.buffer = buffer

    const filter = this.ctx.createBiquadFilter()
    filter.type = 'bandpass'
    filter.frequency.setValueAtTime(600, now)
    filter.frequency.exponentialRampToValueAtTime(250, now + 1.2)
    filter.Q.setValueAtTime(2.5, now)

    const gain = this.ctx.createGain()
    gain.gain.setValueAtTime(0.001, now)
    gain.gain.linearRampToValueAtTime(0.3, now + 0.2)
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.2)

    noise.connect(filter)
    filter.connect(gain)
    gain.connect(this.masterGain)

    noise.start(now)
    noise.stop(now + 1.3)

    // Celestial chime shimmer after extinguish
    setTimeout(() => {
      this.playChimeClimax()
    }, 400)
  }

  // Gentle chime burst
  playChimeClimax() {
    if (!this.ctx) return
    const chimeFreqs = [523.25, 659.25, 783.99, 1046.50, 1318.51, 1567.98]
    chimeFreqs.forEach((freq, idx) => {
      const now = this.ctx.currentTime + (idx * 0.1)
      const osc = this.ctx.createOscillator()
      const gain = this.ctx.createGain()

      osc.type = 'sine'
      osc.frequency.setValueAtTime(freq, now)

      gain.gain.setValueAtTime(0.0001, now)
      gain.gain.linearRampToValueAtTime(0.04, now + 0.05)
      gain.gain.exponentialRampToValueAtTime(0.00001, now + 3.0)

      osc.connect(gain)
      gain.connect(this.masterGain)

      osc.start(now)
      osc.stop(now + 3.1)
    })
  }
}

export const soundManager = new AudioManager()
