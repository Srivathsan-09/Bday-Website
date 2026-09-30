import React from 'react'
import { Sparkles } from 'lucide-react'

export default function Scene6Constellation() {
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center px-4 sm:px-6 text-center select-none pointer-events-none z-10">
      <div className="max-w-xl w-full glass-panel bg-[#07060d]/90 border border-[#e6c887]/30 rounded-3xl p-6 sm:p-10 shadow-[0_25px_60px_rgba(0,0,0,0.95)] backdrop-blur-2xl space-y-5 relative overflow-hidden">
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5 text-[#e6c887]" />
          <span className="text-xs uppercase tracking-[0.25em] text-[#e6c887] font-semibold">
            Constellation
          </span>
        </div>

        <h2 className="font-cormorant text-3xl sm:text-4xl md:text-5xl font-light text-[#fdfbf7] tracking-wide drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
          "A collection of little moments."
        </h2>

        <p className="font-sans text-base sm:text-lg text-[#eee9f8] font-normal max-w-md mx-auto leading-relaxed drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]">
          And somehow, every picture has a little bit of you in it.
        </p>

        <p className="text-xs uppercase tracking-[0.2em] text-[#e6c887]/80 pt-2 font-sans font-medium">
          ✦ Click any star node in 3D space ✦
        </p>
      </div>
    </div>
  )
}
