import React, { useState, useEffect } from 'react'
import { Sparkles, RotateCcw, Images } from 'lucide-react'
import confetti from 'canvas-confetti'

export default function Scene9Reveal({ onRestart, onGoToGallery }) {
  const [phase, setPhase] = useState(0)

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 500)
    const t2 = setTimeout(() => setPhase(2), 1800)
    const t3 = setTimeout(() => {
      setPhase(3)
      try {
        confetti({
          particleCount: 70,
          spread: 80,
          origin: { y: 0.5 },
          colors: ['#e6c887', '#d68fa8', '#ffffff', '#c49e54'],
          disableForReducedMotion: true,
          scalar: 0.9,
          ticks: 200,
        })
      } catch (e) {}
    }, 3600)
    const t4 = setTimeout(() => setPhase(4), 5200)

    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(t3)
      clearTimeout(t4)
    }
  }, [])

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center px-4 sm:px-6 text-center select-none pointer-events-none z-10">
      <div className="max-w-2xl w-full glass-panel bg-[#07060d]/90 border border-[#e6c887]/35 rounded-3xl p-6 sm:p-10 shadow-[0_25px_70px_rgba(0,0,0,0.95)] backdrop-blur-2xl space-y-6 relative overflow-hidden">
        {/* Top Tag */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5 text-[#e6c887]" />
          <span className="text-xs uppercase tracking-[0.25em] text-[#e6c887] font-semibold">
            Nashik & Beyond
          </span>
        </div>

        {/* Heading */}
        <h1
          className={`font-cinzel text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight gold-shimmer transition-all duration-700 drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)] transform ${
            phase >= 1 ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-95'
          }`}
        >
          Happy Birthday, Manisha
        </h1>

        {/* Line 1 */}
        <p
          className={`font-cormorant text-2xl sm:text-3xl md:text-4xl text-[#ece9f5] font-light tracking-wide transition-all duration-700 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] transform ${
            phase >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          Here's to more conversations, more laughs, more memories...
        </p>

        {/* Line 2 (Playful) */}
        <p
          className={`font-sans text-base sm:text-lg md:text-xl text-[#e6c887] font-normal italic transition-all duration-700 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] transform ${
            phase >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          ...and hopefully more than one meeting someday.
        </p>

        {/* Line 3 Final Blessing */}
        <div
          className={`pt-2 transition-all duration-700 transform ${
            phase >= 4 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <p className="font-cormorant text-2xl sm:text-3xl text-[#fdfbf7] font-light drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
            Until then, keep being you. ✨
          </p>

          {/* Interactive replay button */}
          <div className="pt-6 flex items-center justify-center pointer-events-auto">
            <button
              onClick={onRestart}
              className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/25 hover:border-[#e6c887] text-[#fdfbf7] text-xs uppercase tracking-widest transition-all duration-300 active:scale-95 cursor-pointer backdrop-blur-md shadow-lg"
            >
              <RotateCcw className="w-4 h-4 text-[#e6c887]" />
              <span>Experience Again</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
