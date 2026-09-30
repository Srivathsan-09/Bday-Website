import React, { useState, useEffect } from 'react'
import { ArrowRight, Sparkles } from 'lucide-react'
import { photos } from '../../data/photos'

export default function Scene1Intro({ onEnter }) {
  const [phase, setPhase] = useState(0)
  const heroPhoto = photos[0] // Manisha's signature portrait

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 400)
    const t2 = setTimeout(() => setPhase(2), 1400)
    const t3 = setTimeout(() => setPhase(3), 2400)
    const t4 = setTimeout(() => setPhase(4), 3400)

    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(t3)
      clearTimeout(t4)
    }
  }, [])

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center px-4 sm:px-6 text-center select-none pointer-events-none z-10 overflow-y-auto py-8">
      <div className="max-w-3xl flex flex-col items-center space-y-5 my-auto">
        {/* Intro Staged Typography */}
        <div className="space-y-1.5">
          <p
            className={`font-cormorant text-xl sm:text-2xl md:text-3xl text-[#d4cfe2] font-light tracking-wide transition-all duration-700 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] transform ${
              phase >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
            }`}
          >
            Some people enter your life...
          </p>

          <p
            className={`font-cormorant text-xl sm:text-2xl md:text-3xl text-[#ece9f5] italic font-light tracking-wide transition-all duration-700 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] transform ${
              phase >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
            }`}
          >
            ...and somehow become special.
          </p>
        </div>

        {/* Center Hero Image of Manisha */}
        <div
          className={`transition-all duration-1000 transform my-1 ${
            phase >= 3
              ? 'opacity-100 translate-y-0 scale-100'
              : 'opacity-0 translate-y-6 scale-95'
          }`}
        >
          <div className="relative group cursor-default">
            {/* Ambient backlight glow */}
            <div className="absolute -inset-2 bg-gradient-to-tr from-[#e6c887]/25 via-[#d68fa8]/20 to-[#8e7dbe]/20 rounded-3xl blur-2xl opacity-75 group-hover:opacity-100 transition-opacity duration-700" />

            {/* Luxury Physical Card Frame */}
            <div className="relative w-44 h-56 sm:w-52 sm:h-64 md:w-60 md:h-76 rounded-2xl sm:rounded-3xl p-2.5 sm:p-3 bg-gradient-to-b from-[#fdfbf7] via-[#f7f2ea] to-[#e8e2d5] shadow-[0_25px_60px_rgba(0,0,0,0.95)] border border-[#e6c887]/60 transform hover:scale-[1.02] transition-transform duration-500 animate-float">
              {/* Photo */}
              <div className="relative w-full h-full rounded-xl sm:rounded-2xl overflow-hidden shadow-inner">
                <img
                  src={heroPhoto.url}
                  alt="Manisha"
                  className="w-full h-full object-cover object-top filter contrast-[1.03]"
                />
                {/* Subtle glass gloss highlight reflection */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none" />
              </div>

              {/* Little corner metallic accent */}
              <div className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-gradient-to-tr from-[#e6c887] to-[#fff4d1] border border-white/60 shadow-md flex items-center justify-center">
                <Sparkles className="w-2.5 h-2.5 text-[#050508]" />
              </div>
            </div>
          </div>
        </div>

        {/* Happy Birthday, Manisha Headline */}
        <div
          className={`space-y-3 transition-all duration-700 transform ${
            phase >= 3 ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-95'
          }`}
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
            <Sparkles className="w-3 h-3 text-[#e6c887]" />
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#e6c887] font-semibold">
              A Personal Gift
            </span>
          </div>

          <h1 className="font-cinzel text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight gold-shimmer drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)]">
            Happy Birthday, Manisha
          </h1>
        </div>

        {/* Interactive Enter Button */}
        <div
          className={`pt-2 transition-all duration-700 pointer-events-auto transform ${
            phase >= 4 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
          }`}
        >
          <button
            onClick={onEnter}
            className="group relative inline-flex items-center gap-3 px-8 sm:px-10 py-3.5 sm:py-4 rounded-full bg-white/5 hover:bg-white/10 border border-[#e6c887]/50 hover:border-[#e6c887] text-[#fdfbf7] font-medium text-sm sm:text-base tracking-widest uppercase transition-all duration-300 shadow-[0_0_30px_rgba(230,200,135,0.2)] hover:shadow-[0_0_50px_rgba(230,200,135,0.45)] active:scale-95 cursor-pointer backdrop-blur-md"
          >
            <span>Enter Experience</span>
            <ArrowRight className="w-4 h-4 text-[#e6c887] transition-transform duration-300 group-hover:translate-x-1.5" />
          </button>
        </div>
      </div>
    </div>
  )
}
