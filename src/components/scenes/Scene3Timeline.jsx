import React from 'react'
import { Sparkles } from 'lucide-react'

export default function Scene3Timeline() {
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center px-4 sm:px-6 text-center select-none pointer-events-none z-10">
      {/* High-Contrast Frosted Glass Scrim */}
      <div className="max-w-xl w-full glass-panel bg-[#07060d]/90 border border-[#e6c887]/35 rounded-3xl p-6 sm:p-10 shadow-[0_25px_60px_rgba(0,0,0,0.95)] backdrop-blur-2xl space-y-6 relative overflow-hidden">
        {/* Subtle ambient lighting inside the card */}
        <div className="absolute top-0 right-0 w-36 h-36 bg-[#e6c887]/15 rounded-full blur-2xl pointer-events-none" />

        {/* Date Milestone Pill */}
        <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-[#161324] border border-[#e6c887]/40 shadow-[0_0_20px_rgba(230,200,135,0.2)]">
          <span className="w-2.5 h-2.5 rounded-full bg-[#e6c887] animate-pulse" />
          <span className="font-cinzel text-sm sm:text-base tracking-[0.25em] text-[#e6c887] font-bold">
            JANUARY 2025
          </span>
        </div>

        {/* Headline */}
        <h2 className="font-cormorant text-3xl sm:text-4xl md:text-5xl font-light text-[#fdfbf7] tracking-wide drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
          "That's when our story started."
        </h2>

        {/* Narrative Lines */}
        <div className="space-y-4 pt-2">
          <p className="font-sans text-base sm:text-lg text-[#eee9f8] font-normal leading-relaxed drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]">
            One conversation became a friendship.
          </p>
          <p className="font-cormorant text-2xl sm:text-3xl text-[#e6c887] italic font-medium tracking-wide drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
            And somehow, the distance never felt like distance.
          </p>
        </div>

        <div className="pt-2 border-t border-white/10 flex items-center justify-center gap-2 text-xs uppercase tracking-[0.25em] text-[#9b98a6]">
          <Sparkles className="w-3 h-3 text-[#e6c887]" />
          <span>Timeline of a special bond</span>
        </div>
      </div>
    </div>
  )
}
