import React, { useState, useEffect } from 'react'
import { Sparkles } from 'lucide-react'

export default function LoadingScreen({ onComplete, isAssetsReady }) {
  const [progress, setProgress] = useState(0)
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev < 90) {
          return prev + Math.floor(Math.random() * 8 + 3)
        }
        if (isAssetsReady && prev < 100) {
          return prev + 5
        }
        if (prev >= 100) {
          clearInterval(timer)
          setIsReady(true)
          setTimeout(onComplete, 1200)
          return 100
        }
        return prev
      })
    }, 90)

    return () => clearInterval(timer)
  }, [isAssetsReady, onComplete])

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#050508] text-white px-6 select-none transition-opacity duration-1000">
      <div className="max-w-md w-full flex flex-col items-center text-center space-y-8">
        {/* Glowing Monogram / Sparkle */}
        <div className="relative">
          <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#e6c887]/20 via-[#d68fa8]/10 to-transparent flex items-center justify-center border border-[#e6c887]/30 shadow-[0_0_30px_rgba(230,200,135,0.2)]">
            <Sparkles className="w-6 h-6 text-[#e6c887] animate-pulse" />
          </div>
          <div className="absolute inset-0 rounded-full border border-white/10 animate-ping opacity-30" />
        </div>

        {/* Text */}
        <div className="space-y-2">
          <h2 className="font-cormorant text-2xl sm:text-3xl text-[#fdfbf7] font-light tracking-wide">
            {isReady ? 'Ready.' : 'Creating something for Manisha...'}
          </h2>
          <p className="font-sans text-xs tracking-[0.25em] uppercase text-[#9b98a6]">
            {isReady ? 'Entering Experience' : 'Preparing 3D Atmosphere & Memories'}
          </p>
        </div>

        {/* Elegant Minimal Progress Bar */}
        <div className="w-48 sm:w-64 space-y-2">
          <div className="h-[2px] w-full bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#e6c887] to-[#d68fa8] transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between items-center text-[10px] tracking-widest text-[#9b98a6]/70 uppercase font-mono">
            <span>Progress</span>
            <span>{progress}%</span>
          </div>
        </div>
      </div>
    </div>
  )
}
