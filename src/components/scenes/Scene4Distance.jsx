import React, { useState, useEffect } from 'react'
import { Sparkles } from 'lucide-react'

export default function Scene4Distance() {
  const [step, setStep] = useState(0)

  useEffect(() => {
    const s1 = setTimeout(() => setStep(1), 400)
    const s2 = setTimeout(() => setStep(2), 1800)
    const s3 = setTimeout(() => setStep(3), 3200)

    return () => {
      clearTimeout(s1)
      clearTimeout(s2)
      clearTimeout(s3)
    }
  }, [])

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center px-4 sm:px-6 text-center select-none pointer-events-none z-10">
      <div className="max-w-xl w-full glass-panel bg-[#07060d]/90 border border-[#e6c887]/30 rounded-3xl p-6 sm:p-10 shadow-[0_25px_60px_rgba(0,0,0,0.95)] backdrop-blur-2xl space-y-6 relative overflow-hidden">
        {/* Subtle ambient lighting */}
        <div className="absolute top-0 left-0 w-36 h-36 bg-[#d68fa8]/15 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-36 h-36 bg-[#8e7dbe]/15 rounded-full blur-2xl pointer-events-none" />

        {/* Subtle Indicator */}
        <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-[#d68fa8]" />
          <span className="text-xs uppercase tracking-[0.25em] text-[#d68fa8] font-semibold">Nashik</span>
          <span className="text-xs text-[#9b98a6]">——</span>
          <span className="text-xs uppercase tracking-[0.25em] text-[#8e7dbe] font-semibold">Across Distance</span>
          <span className="w-2 h-2 rounded-full bg-[#8e7dbe]" />
        </div>

        {/* Text 1 */}
        <p
          className={`font-cormorant text-3xl sm:text-4xl md:text-5xl font-light text-[#fdfbf7] tracking-wide transition-all duration-700 drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)] transform ${
            step >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
          }`}
        >
          "We've only met once."
        </p>

        {/* Text 2 */}
        <p
          className={`font-sans text-base sm:text-lg text-[#eee9f8] font-normal max-w-md mx-auto leading-relaxed transition-all duration-700 drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)] transform ${
            step >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
          }`}
        >
          But some connections don't need frequent meetings to feel real.
        </p>

        {/* Text 3 */}
        <p
          className={`font-cormorant text-2xl sm:text-3xl italic text-[#e6c887] font-medium pt-2 transition-all duration-700 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] transform ${
            step >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
          }`}
        >
          Maybe that's what makes this friendship special.
        </p>
      </div>
    </div>
  )
}
