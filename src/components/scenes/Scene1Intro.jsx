import React, { useState, useEffect } from 'react'
import { ArrowRight, Sparkles } from 'lucide-react'

export default function Scene1Intro({ onEnter }) {
  const [phase, setPhase] = useState(0)

  useEffect(() => {
    // Elegant cinematic text reveal staging
    const t1 = setTimeout(() => setPhase(1), 800)
    const t2 = setTimeout(() => setPhase(2), 2600)
    const t3 = setTimeout(() => setPhase(3), 4400)
    const t4 = setTimeout(() => setPhase(4), 5800)

    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(t3)
      clearTimeout(t4)
    }
  }, [])

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center px-6 text-center select-none pointer-events-none z-10">
      <div className="max-w-3xl space-y-6">
        {/* Line 1 */}
        <p
          className={`font-cormorant text-2xl sm:text-3xl md:text-4xl text-[#d4cfe2] font-light tracking-wide transition-all duration-1000 transform ${
            phase >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          Some people enter your life...
        </p>

        {/* Line 2 */}
        <p
          className={`font-cormorant text-2xl sm:text-3xl md:text-4xl text-[#ece9f5] italic font-light tracking-wide transition-all duration-1000 transform ${
            phase >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          ...and somehow become special.
        </p>

        {/* Line 3 - Happy Birthday, Manisha */}
        <div
          className={`pt-6 transition-all duration-1200 transform ${
            phase >= 3 ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-6 scale-95'
          }`}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-4 backdrop-blur-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#e6c887]" />
            <span className="text-xs uppercase tracking-[0.25em] text-[#e6c887]/90 font-medium">A personal gift</span>
          </div>

          <h1 className="font-cinzel text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight gold-shimmer">
            Happy Birthday, Manisha
          </h1>
        </div>

        {/* Interactive Enter Button */}
        <div
          className={`pt-8 transition-all duration-1000 pointer-events-auto transform ${
            phase >= 4 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
          }`}
        >
          <button
            onClick={onEnter}
            className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white/5 hover:bg-white/10 border border-[#e6c887]/40 hover:border-[#e6c887] text-[#fdfbf7] font-medium text-base tracking-widest uppercase transition-all duration-300 shadow-[0_0_25px_rgba(230,200,135,0.15)] hover:shadow-[0_0_40px_rgba(230,200,135,0.35)] active:scale-95 cursor-pointer"
          >
            <span>Enter</span>
            <ArrowRight className="w-4 h-4 text-[#e6c887] transition-transform duration-300 group-hover:translate-x-1.5" />
          </button>
        </div>
      </div>
    </div>
  )
}
