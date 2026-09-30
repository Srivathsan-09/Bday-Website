import React, { useState } from 'react'
import confetti from 'canvas-confetti'
import { soundManager } from '../../utils/soundtrack'
import { Sparkles, Wind } from 'lucide-react'

export default function Scene8Cake({ candlesBlown, onBlowCandles, onProceed }) {
  const [hasInteracted, setHasInteracted] = useState(false)

  const triggerBlow = () => {
    if (candlesBlown) return
    setHasInteracted(true)
    onBlowCandles()
    soundManager.playCandleBlowSound()

    // Elegant, cinematic champagne/gold stardust burst
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.65 },
        colors: ['#e6c887', '#fff4d1', '#d68fa8', '#fdfbf7', '#c49e54'],
        disableForReducedMotion: true,
        scalar: 0.85,
        ticks: 240,
        gravity: 0.6,
      })
    } catch (e) {
      // Ignore if canvas-confetti is not loaded
    }
  }

  return (
    <div className="relative w-full h-full flex flex-col justify-between items-center p-6 select-none pointer-events-none z-10">
      {/* Top Header */}
      <div className="pt-16 sm:pt-20 text-center max-w-lg mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-2">
          <Sparkles className="w-3 h-3 text-[#e6c887]" />
          <span className="text-xs uppercase tracking-[0.25em] text-[#e6c887]">
            3D Birthday Cake
          </span>
        </div>
        <h2 className="font-cinzel text-3xl sm:text-4xl text-[#fdfbf7] font-semibold tracking-wide">
          {candlesBlown ? 'Wish Made ✨' : 'Make a Wish'}
        </h2>
        <p className="font-cormorant text-lg sm:text-xl text-[#d4cfe2] italic mt-1">
          {candlesBlown
            ? 'May all the quiet dreams you keep come true.'
            : 'Close your eyes, think of something beautiful...'}
        </p>
      </div>

      {/* Center Interactive Extinguish Button */}
      <div className="pointer-events-auto pb-16 flex flex-col items-center gap-4">
        {!candlesBlown ? (
          <button
            onClick={triggerBlow}
            className="group relative inline-flex items-center gap-3 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#e6c887]/20 via-[#d68fa8]/20 to-[#e6c887]/20 hover:from-[#e6c887]/30 hover:to-[#d68fa8]/30 border border-[#e6c887]/50 text-[#fdfbf7] font-medium text-sm tracking-widest uppercase transition-all duration-300 shadow-[0_0_30px_rgba(230,200,135,0.25)] hover:shadow-[0_0_50px_rgba(230,200,135,0.45)] active:scale-95 cursor-pointer backdrop-blur-md"
          >
            <Wind className="w-4 h-4 text-[#e6c887] animate-pulse" />
            <span>Blow Out Candles</span>
          </button>
        ) : (
          <button
            onClick={onProceed}
            className="group relative inline-flex items-center gap-3 px-8 py-3.5 rounded-full bg-white/10 hover:bg-white/15 border border-[#e6c887] text-[#fdfbf7] font-medium text-sm tracking-widest uppercase transition-all duration-300 shadow-[0_0_35px_rgba(230,200,135,0.3)] active:scale-95 cursor-pointer backdrop-blur-md animate-fade-in"
          >
            <span>Final Reveal →</span>
          </button>
        )}

        <span className="text-xs uppercase tracking-widest text-[#9b98a6]/70">
          {!candlesBlown ? '✦ Or tap directly on the cake candles ✦' : '✦ Happy Birthday Manisha ✦'}
        </span>
      </div>
    </div>
  )
}
