import React, { useEffect, useRef } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export default function NavigationControls({
  currentScene,
  totalScenes = 8,
  onSceneChange,
}) {
  const isWheelingRef = useRef(false)
  const touchStartRef = useRef({ x: 0, y: 0 })

  // Wheel debounce handler to allow smooth scene navigation
  useEffect(() => {
    const handleWheel = (e) => {
      // In Scene 6 (Birthday Letter), let the user scroll freely through the personal letter without triggering scene changes!
      if (currentScene === 6) {
        return
      }

      if (isWheelingRef.current) return
      if (Math.abs(e.deltaY) < 30) return

      isWheelingRef.current = true
      setTimeout(() => {
        isWheelingRef.current = false
      }, 900)

      if (e.deltaY > 0) {
        // Next scene
        if (currentScene < totalScenes) {
          onSceneChange(currentScene + 1)
        }
      } else {
        // Prev scene
        if (currentScene > 1) {
          onSceneChange(currentScene - 1)
        }
      }
    }

    // Touch swipe handler
    const handleTouchStart = (e) => {
      touchStartRef.current = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
      }
    }

    const handleTouchEnd = (e) => {
      // If in Scene 6, allow vertical touch scroll inside the letter
      if (currentScene === 6) {
        return
      }

      const deltaX = e.changedTouches[0].clientX - touchStartRef.current.x
      const deltaY = e.changedTouches[0].clientY - touchStartRef.current.y

      if (Math.abs(deltaY) > 60 || Math.abs(deltaX) > 60) {
        if (deltaY < -60 || deltaX < -60) {
          if (currentScene < totalScenes) onSceneChange(currentScene + 1)
        } else if (deltaY > 60 || deltaX > 60) {
          if (currentScene > 1) onSceneChange(currentScene - 1)
        }
      }
    }

    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight' || e.key === ' ' || (e.key === 'ArrowDown' && currentScene !== 6)) {
        if (currentScene < totalScenes) onSceneChange(currentScene + 1)
      } else if (e.key === 'ArrowLeft' || (e.key === 'ArrowUp' && currentScene !== 6)) {
        if (currentScene > 1) onSceneChange(currentScene - 1)
      }
    }

    window.addEventListener('wheel', handleWheel, { passive: true })
    window.addEventListener('touchstart', handleTouchStart, { passive: true })
    window.addEventListener('touchend', handleTouchEnd, { passive: true })
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('wheel', handleWheel)
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchend', handleTouchEnd)
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [currentScene, totalScenes, onSceneChange])

  const formattedCurrent = String(currentScene).padStart(2, '0')
  const formattedTotal = String(totalScenes).padStart(2, '0')

  return (
    <>
      {/* Top Left: Scene Counter "01 / 08" */}
      <div className="fixed top-6 left-6 z-30 pointer-events-auto flex items-center gap-3">
        <div className="glass-pill px-3.5 py-1.5 rounded-full flex items-center gap-2 border border-white/10 text-xs font-mono tracking-widest text-[#fdfbf7]">
          <span className="text-[#e6c887] font-semibold">{formattedCurrent}</span>
          <span className="text-white/40">/</span>
          <span className="text-white/60">{formattedTotal}</span>
        </div>
      </div>

      {/* Bottom Center: Navigation Controls & Dots */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-30 pointer-events-auto flex items-center gap-4">
        {/* Prev Button */}
        <button
          onClick={() => currentScene > 1 && onSceneChange(currentScene - 1)}
          disabled={currentScene === 1}
          className={`glass-pill p-2 rounded-full transition-all duration-300 ${
            currentScene === 1
              ? 'opacity-20 cursor-not-allowed'
              : 'opacity-80 hover:opacity-100 hover:border-[#e6c887] cursor-pointer'
          }`}
          title="Previous Scene (Left Arrow)"
        >
          <ChevronLeft className="w-4 h-4 text-white" />
        </button>

        {/* Scene Dots */}
        <div className="glass-pill px-3 py-2 rounded-full flex items-center gap-2">
          {Array.from({ length: totalScenes }).map((_, idx) => {
            const sceneNum = idx + 1
            const isActive = currentScene === sceneNum
            return (
              <button
                key={sceneNum}
                onClick={() => onSceneChange(sceneNum)}
                className={`transition-all duration-300 rounded-full cursor-pointer ${
                  isActive
                    ? 'w-6 h-1.5 bg-[#e6c887] shadow-[0_0_10px_#e6c887]'
                    : 'w-1.5 h-1.5 bg-white/30 hover:bg-white/60'
                }`}
                title={`Scene ${sceneNum}`}
              />
            )
          })}
        </div>

        {/* Next Button */}
        <button
          onClick={() => currentScene < totalScenes && onSceneChange(currentScene + 1)}
          disabled={currentScene === totalScenes}
          className={`glass-pill p-2 rounded-full transition-all duration-300 ${
            currentScene === totalScenes
              ? 'opacity-20 cursor-not-allowed'
              : 'opacity-80 hover:opacity-100 hover:border-[#e6c887] cursor-pointer'
          }`}
          title="Next Scene (Right Arrow / Scroll)"
        >
          <ChevronRight className="w-4 h-4 text-white" />
        </button>
      </div>
    </>
  )
}
