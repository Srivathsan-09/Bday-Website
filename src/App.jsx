import React, { useState, useCallback } from 'react'
import CinematicCanvas from './components/3d/CinematicCanvas'
import Scene1Intro from './components/scenes/Scene1Intro'
import Scene2Name from './components/scenes/Scene2Name'
import Scene3Timeline from './components/scenes/Scene3Timeline'
import Scene4Distance from './components/scenes/Scene4Distance'
import Scene5Gallery from './components/scenes/Scene5Gallery'
import Scene6Constellation from './components/scenes/Scene6Constellation'
import Scene7Message from './components/scenes/Scene7Message'
import Scene8Cake from './components/scenes/Scene8Cake'
import Scene9Reveal from './components/scenes/Scene9Reveal'

import LoadingScreen from './components/ui/LoadingScreen'
import NavigationControls from './components/ui/NavigationControls'
import MusicPlayer from './components/ui/MusicPlayer'
import WebGLFallback from './components/ui/WebGLFallback'

export default function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [isAssetsReady, setIsAssetsReady] = useState(false)
  const [currentScene, setCurrentScene] = useState(1)
  const [selectedPhotoId, setSelectedPhotoId] = useState(null)
  const [candlesBlown, setCandlesBlown] = useState(false)
  const [webglSupported, setWebglSupported] = useState(true)

  const handleAssetsLoaded = useCallback(() => {
    setIsAssetsReady(true)
  }, [])

  const handleWebGLUnsupported = useCallback(() => {
    setWebglSupported(false)
    setIsLoading(false)
  }, [])

  const handleSceneChange = useCallback((newScene) => {
    setSelectedPhotoId(null)
    setCurrentScene(newScene)
  }, [])

  const handleEnter = useCallback(() => {
    setCurrentScene(2)
  }, [])

  const handleBlowCandles = useCallback(() => {
    setCandlesBlown(true)
  }, [])

  const handleRestart = useCallback(() => {
    setCandlesBlown(false)
    setSelectedPhotoId(null)
    setCurrentScene(1)
  }, [])

  const handleGoToGallery = useCallback(() => {
    setCurrentScene(5)
  }, [])

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#050508] text-white select-none">
      {/* 1. Loading Screen */}
      {isLoading && (
        <LoadingScreen
          isAssetsReady={isAssetsReady}
          onComplete={() => setIsLoading(false)}
        />
      )}

      {/* 2. WebGL 3D Cinematic Background or Fallback */}
      {webglSupported ? (
        <CinematicCanvas
          currentScene={currentScene}
          selectedPhotoId={selectedPhotoId}
          onSelectPhoto={setSelectedPhotoId}
          candlesBlown={candlesBlown}
          onCandleBlow={handleBlowCandles}
          onLoaded={handleAssetsLoaded}
          onWebGLUnsupported={handleWebGLUnsupported}
        />
      ) : (
        <WebGLFallback
          currentScene={currentScene}
          onSceneChange={handleSceneChange}
        />
      )}

      {/* 3. Global HUD Elements */}
      {!isLoading && webglSupported && (
        <>
          {/* Top-Right Music Player */}
          <MusicPlayer />

          {/* Navigation Controls (Counter, Arrows, Dots, Wheel & Swipe gestures) */}
          <NavigationControls
            currentScene={currentScene}
            totalScenes={9}
            onSceneChange={handleSceneChange}
          />

          {/* 4. Active Scene UI Layer */}
          <main className="absolute inset-0 w-full h-full pointer-events-none z-10">
            {currentScene === 1 && <Scene1Intro onEnter={handleEnter} />}
            {currentScene === 2 && <Scene2Name />}
            {currentScene === 3 && <Scene3Timeline />}
            {currentScene === 4 && <Scene4Distance />}
            {currentScene === 5 && (
              <Scene5Gallery
                selectedPhotoId={selectedPhotoId}
                onSelectPhoto={setSelectedPhotoId}
              />
            )}
            {currentScene === 6 && <Scene6Constellation />}
            {currentScene === 7 && <Scene7Message />}
            {currentScene === 8 && (
              <Scene8Cake
                candlesBlown={candlesBlown}
                onBlowCandles={handleBlowCandles}
                onProceed={() => handleSceneChange(9)}
              />
            )}
            {currentScene === 9 && (
              <Scene9Reveal onRestart={handleRestart} />
            )}
          </main>
        </>
      )}
    </div>
  )
}
