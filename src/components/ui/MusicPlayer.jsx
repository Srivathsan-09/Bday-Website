import React, { useState, useEffect } from 'react'
import { soundManager } from '../../utils/soundtrack'
import { Volume2, VolumeX, Music } from 'lucide-react'

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    const unsubscribe = soundManager.subscribe((state) => {
      setIsPlaying(state.isPlaying)
    })
    return () => unsubscribe()
  }, [])

  const handleToggle = () => {
    soundManager.toggle()
  }

  return (
    <div className="fixed top-6 right-6 z-30 pointer-events-auto">
      <button
        onClick={handleToggle}
        className={`glass-pill px-4 py-2 rounded-full flex items-center gap-2.5 text-xs font-medium tracking-wider uppercase transition-all duration-300 border shadow-lg cursor-pointer ${
          isPlaying
            ? 'border-[#e6c887]/60 bg-[#e6c887]/10 text-[#fdfbf7] shadow-[0_0_20px_rgba(230,200,135,0.2)]'
            : 'border-white/10 text-[#9b98a6] hover:text-white'
        }`}
        title={isPlaying ? 'Pause Soundtrack' : 'Play Ambient Soundtrack'}
      >
        {isPlaying ? (
          <>
            {/* Equalizer animation bars */}
            <div className="flex items-end gap-[2px] h-3 w-3">
              <span className="w-[2px] bg-[#e6c887] h-full animate-[pulse_0.6s_ease-in-out_infinite]" />
              <span className="w-[2px] bg-[#e6c887] h-2/3 animate-[pulse_0.8s_ease-in-out_infinite_0.2s]" />
              <span className="w-[2px] bg-[#e6c887] h-4/5 animate-[pulse_0.7s_ease-in-out_infinite_0.4s]" />
            </div>
            <span className="text-[#e6c887]">Soundtrack</span>
          </>
        ) : (
          <>
            <span className="text-sm">♫</span>
            <span>Play</span>
          </>
        )}
      </button>
    </div>
  )
}
