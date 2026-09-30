import React from 'react'

export default function Scene2Name() {
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center px-6 text-center select-none pointer-events-none z-10">
      <div className="max-w-4xl space-y-4">
        {/* Central Monolithic Typography */}
        <h1 className="font-cinzel text-6xl sm:text-7xl md:text-9xl font-bold tracking-[0.12em] gold-shimmer drop-shadow-[0_15px_30px_rgba(0,0,0,0.8)]">
          MANISHA
        </h1>

        {/* Subtitle */}
        <p className="font-cormorant text-xl sm:text-2xl md:text-3xl text-[#d4cfe2] font-light tracking-wide max-w-xl mx-auto pt-2">
          "A little corner of the internet, made just for you."
        </p>
      </div>
    </div>
  )
}
