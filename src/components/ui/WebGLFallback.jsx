import React, { useState } from 'react'
import { photos } from '../../data/photos'
import { Sparkles, Heart, ChevronLeft, ChevronRight, Wind } from 'lucide-react'
import confetti from 'canvas-confetti'

export default function WebGLFallback({ currentScene, onSceneChange }) {
  const [candlesBlown, setCandlesBlown] = useState(false)

  const handleBlow = () => {
    setCandlesBlown(true)
    try {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#e6c887', '#d68fa8', '#ffffff'],
      })
    } catch (e) {}
  }

  return (
    <div className="relative w-full h-full min-h-screen bg-[#050508] text-white flex flex-col justify-between p-6 overflow-y-auto">
      {/* Background Ambient Glow */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#8e7dbe]/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#e6c887]/10 rounded-full blur-[120px]" />
      </div>

      {/* Main Content Area based on currentScene */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center max-w-4xl mx-auto my-auto py-12 text-center">
        {currentScene === 1 && (
          <div className="space-y-6 animate-fade-in">
            <p className="font-cormorant text-3xl sm:text-4xl text-[#d4cfe2] font-light">
              Some people enter your life...
            </p>
            <p className="font-cormorant text-3xl sm:text-4xl text-[#ece9f5] italic font-light">
              ...and somehow become special.
            </p>
            <h1 className="font-cinzel text-5xl sm:text-7xl font-bold gold-shimmer pt-4">
              Happy Birthday, Manisha
            </h1>
            <div className="pt-8">
              <button
                onClick={() => onSceneChange(2)}
                className="px-8 py-3.5 rounded-full bg-white/10 hover:bg-white/15 border border-[#e6c887]/50 text-white tracking-widest uppercase text-sm font-medium cursor-pointer transition-all"
              >
                Enter Experience →
              </button>
            </div>
          </div>
        )}

        {currentScene === 2 && (
          <div className="space-y-8 animate-fade-in">
            <h1 className="font-cinzel text-7xl sm:text-9xl font-bold gold-shimmer">
              MANISHA
            </h1>
            <p className="font-cormorant text-2xl sm:text-3xl text-[#d4cfe2] font-light">
              "A little corner of the internet, made just for you."
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6">
              {photos.map((p) => (
                <div key={p.id} className="rounded-xl overflow-hidden border border-white/20 shadow-xl">
                  <img src={p.url} alt={p.title} className="w-full h-44 object-cover" />
                </div>
              ))}
            </div>
          </div>
        )}

        {currentScene === 3 && (
          <div className="space-y-6 animate-fade-in max-w-xl">
            <div className="inline-block px-4 py-1.5 rounded-full bg-[#161324] border border-[#e6c887]/40">
              <span className="font-cinzel text-sm text-[#e6c887] tracking-widest font-semibold">
                JANUARY 2025
              </span>
            </div>
            <h2 className="font-cormorant text-4xl sm:text-5xl font-light">
              "That's when our story started."
            </h2>
            <p className="font-sans text-lg text-[#c5c0d6] font-light">
              One conversation became a friendship.
            </p>
            <p className="font-cormorant text-2xl text-[#e6c887] italic">
              And somehow, the distance never felt like distance.
            </p>
          </div>
        )}

        {currentScene === 4 && (
          <div className="space-y-6 animate-fade-in max-w-2xl">
            <p className="font-cormorant text-4xl sm:text-5xl font-light">
              "We've only met once."
            </p>
            <p className="font-sans text-xl text-[#c5c0d6] font-light">
              But some connections don't need frequent meetings to feel real.
            </p>
            <p className="font-cormorant text-3xl text-[#e6c887] italic">
              Maybe that's what makes this friendship special.
            </p>
          </div>
        )}

        {currentScene === 5 && (
          <div className="space-y-6 animate-fade-in">
            <h2 className="font-cinzel text-3xl sm:text-4xl gold-shimmer">Her Moments</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-4">
              {photos.map((photo) => (
                <div key={photo.id} className="glass-panel p-3 rounded-2xl border border-white/10 text-left">
                  <img src={photo.url} alt={photo.title} className="w-full h-64 object-cover rounded-xl mb-3" />
                  <p className="font-cormorant text-lg text-[#fdfbf7] italic">"{photo.caption}"</p>
                  <p className="text-xs text-[#9b98a6]">{photo.title}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {currentScene === 6 && (
          <div className="space-y-6 animate-fade-in max-w-xl">
            <h2 className="font-cormorant text-4xl sm:text-5xl font-light">
              "A collection of little moments."
            </h2>
            <p className="font-sans text-lg text-[#c5c0d6] font-light">
              And somehow, every picture has a little bit of you in it.
            </p>
          </div>
        )}

        {currentScene === 7 && (
          <div className="glass-panel p-8 sm:p-10 rounded-3xl max-w-2xl text-left font-cormorant space-y-4 border border-[#e6c887]/30">
            <h3 className="font-cinzel text-2xl text-[#fdfbf7] tracking-wider">Manisha,</h3>
            <p className="text-xl text-[#ddd8ec] font-light leading-relaxed">
              From January 2025 to now, somehow you've become someone really special to me.
            </p>
            <p className="text-xl text-[#ddd8ec] font-light leading-relaxed">
              It's funny how we've only met once, yet the bond we've built feels like so much more than that.
            </p>
            <p className="text-xl text-[#ddd8ec] font-light leading-relaxed">
              I may not have a thousand memories with you yet, but I'm genuinely grateful for the conversations, the laughs, the comfort, and simply having you in my life.
            </p>
            <p className="text-xl text-[#e6c887] font-normal leading-relaxed">
              Some people don't need years of knowing each other to become important. You're one of those people.
            </p>
            <div className="my-4 pl-4 border-l-2 border-[#e6c887] italic text-2xl text-[#fdfbf7]">
              <p>you are special,</p>
              <p>you are appreciated,</p>
              <p>and you matter.</p>
            </div>
            <div className="pt-4 border-t border-white/10 flex justify-between items-center">
              <span className="font-cinzel text-2xl gold-shimmer font-bold">
                Happy Birthday, Manisha. ❤️
              </span>
              <Heart className="w-5 h-5 text-[#d68fa8] fill-[#d68fa8]" />
            </div>
          </div>
        )}

        {currentScene === 8 && (
          <div className="space-y-6 animate-fade-in max-w-md">
            <h2 className="font-cinzel text-4xl gold-shimmer">
              {candlesBlown ? 'Wish Made ✨' : 'Make a Wish'}
            </h2>
            <div className="p-8 rounded-3xl glass-panel border border-[#e6c887]/30 flex flex-col items-center space-y-4">
              <div className="text-5xl">🎂</div>
              <p className="font-cormorant text-xl text-[#d4cfe2] italic">
                {candlesBlown ? 'Candles blown out.' : 'Close your eyes and make a wish...'}
              </p>
              {!candlesBlown ? (
                <button
                  onClick={handleBlow}
                  className="px-6 py-3 rounded-full bg-[#e6c887] text-[#050508] font-bold text-xs uppercase tracking-widest cursor-pointer hover:bg-[#f5e3b5]"
                >
                  Blow Out Candles
                </button>
              ) : (
                <button
                  onClick={() => onSceneChange(9)}
                  className="px-6 py-3 rounded-full bg-white/10 border border-[#e6c887] text-white font-medium text-xs uppercase tracking-widest cursor-pointer"
                >
                  Final Reveal →
                </button>
              )}
            </div>
          </div>
        )}

        {currentScene === 9 && (
          <div className="space-y-6 animate-fade-in max-w-2xl">
            <h1 className="font-cinzel text-5xl sm:text-7xl font-bold gold-shimmer">
              Happy Birthday, Manisha
            </h1>
            <p className="font-cormorant text-3xl text-[#ece9f5] font-light">
              Here's to more conversations, more laughs, more memories...
            </p>
            <p className="font-sans text-xl text-[#e6c887] font-light italic">
              ...and hopefully more than one meeting someday.
            </p>
            <p className="font-cormorant text-2xl text-[#fdfbf7]">
              Until then, keep being you. ✨
            </p>
            <div className="pt-6">
              <button
                onClick={() => onSceneChange(1)}
                className="px-6 py-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-xs uppercase tracking-widest"
              >
                Experience Again ↺
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Scene Switcher */}
      <div className="relative z-10 flex items-center justify-center gap-4 py-4">
        <button
          onClick={() => currentScene > 1 && onSceneChange(currentScene - 1)}
          disabled={currentScene === 1}
          className="p-2 rounded-full glass-pill disabled:opacity-20 cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <span className="text-xs font-mono text-[#e6c887]">
          0{currentScene} / 09
        </span>
        <button
          onClick={() => currentScene < 9 && onSceneChange(currentScene + 1)}
          disabled={currentScene === 9}
          className="p-2 rounded-full glass-pill disabled:opacity-20 cursor-pointer"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}
