import React, { useState, useEffect, useRef } from 'react'
import { Heart, Sparkles, ChevronDown } from 'lucide-react'

export default function Scene7Message() {
  const scrollRef = useRef(null)
  const [canScrollDown, setCanScrollDown] = useState(true)

  const paragraphs = [
    { text: 'Manisha,', isGreeting: true },
    { text: 'From January 2025 to now, somehow you\'ve become someone really special to me.' },
    { text: 'It\'s funny how we\'ve only met once, yet the bond we\'ve built feels like so much more than that.' },
    { text: 'I may not have a thousand memories with you yet, but I\'m genuinely grateful for the conversations, the laughs, the comfort, and simply having you in my life.' },
    { text: 'Some people don\'t need years of knowing each other to become important.' },
    { text: 'You\'re one of those people.', isHighlight: true },
    { text: 'So today, I just wanted to make something that reminds you:' },
    {
      isCallout: true,
      lines: ['you are special,', 'you are appreciated,', 'and you matter.'],
    },
    { text: 'Happy Birthday, Manisha. ❤️', isClosing: true },
  ]

  const handleScroll = () => {
    if (!scrollRef.current) return
    const { scrollTop, scrollHeight, clientHeight } = scrollRef.current
    if (scrollTop + clientHeight >= scrollHeight - 30) {
      setCanScrollDown(false)
    } else {
      setCanScrollDown(true)
    }
  }

  useEffect(() => {
    handleScroll()
  }, [])

  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ top: 220, behavior: 'smooth' })
    }
  }

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center p-4 sm:p-6 z-20 pointer-events-auto select-text">
      {/* Scrollable Glass Card */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="w-full max-w-2xl max-h-[76vh] sm:max-h-[82vh] overflow-y-auto glass-panel rounded-3xl p-6 sm:p-10 border border-[#e6c887]/35 shadow-[0_25px_70px_rgba(0,0,0,0.95)] relative backdrop-blur-2xl overscroll-contain custom-scrollbar scroll-smooth"
        style={{
          scrollbarWidth: 'thin',
          scrollbarColor: 'rgba(230, 200, 135, 0.4) rgba(5, 5, 8, 0.6)',
        }}
      >
        {/* Subtle decorative gold ambient glow */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-[#e6c887]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#d68fa8]/15 rounded-full blur-3xl pointer-events-none" />

        {/* Header Icon */}
        <div className="flex items-center justify-center mb-6">
          <div className="w-11 h-11 rounded-full bg-white/5 border border-[#e6c887]/40 flex items-center justify-center shadow-[0_0_20px_rgba(230,200,135,0.25)]">
            <Sparkles className="w-4 h-4 text-[#e6c887]" />
          </div>
        </div>

        {/* Letter Body */}
        <div className="space-y-5 text-left font-cormorant pb-4">
          {paragraphs.map((para, idx) => {
            if (para.isGreeting) {
              return (
                <h3
                  key={idx}
                  className="font-cinzel text-2xl sm:text-3xl font-semibold text-[#fdfbf7] tracking-wider drop-shadow-md"
                >
                  {para.text}
                </h3>
              )
            }

            if (para.isCallout) {
              return (
                <div
                  key={idx}
                  className="my-5 pl-4 sm:pl-6 border-l-2 border-[#e6c887] space-y-1.5 bg-[#e6c887]/5 py-2 rounded-r-xl"
                >
                  {para.lines.map((l, li) => (
                    <p
                      key={li}
                      className="font-cormorant text-2xl sm:text-3xl text-[#fdfbf7] italic font-medium tracking-wide drop-shadow"
                    >
                      {l}
                    </p>
                  ))}
                </div>
              )
            }

            if (para.isClosing) {
              return (
                <div
                  key={idx}
                  className="pt-6 border-t border-white/15 flex items-center justify-between mt-6"
                >
                  <span className="font-cinzel text-2xl sm:text-3xl gold-shimmer font-bold drop-shadow-lg">
                    {para.text}
                  </span>
                  <Heart className="w-6 h-6 text-[#d68fa8] fill-[#d68fa8] animate-pulse" />
                </div>
              )
            }

            return (
              <p
                key={idx}
                className={`text-xl sm:text-2xl leading-relaxed text-[#eee9f8] font-light drop-shadow-sm ${
                  para.isHighlight ? 'text-[#e6c887] font-normal text-2xl sm:text-3xl' : ''
                }`}
              >
                {para.text}
              </p>
            )
          })}
        </div>
      </div>

      {/* Floating Scroll Indicator if more content below */}
      {canScrollDown && (
        <button
          onClick={scrollToBottom}
          className="mt-3 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#12101a]/90 hover:bg-[#1c182a] border border-[#e6c887]/40 text-xs font-sans text-[#e6c887] shadow-xl backdrop-blur-md cursor-pointer transition-all animate-bounce"
        >
          <span>Scroll down to continue reading</span>
          <ChevronDown className="w-3.5 h-3.5 text-[#e6c887]" />
        </button>
      )}
    </div>
  )
}
