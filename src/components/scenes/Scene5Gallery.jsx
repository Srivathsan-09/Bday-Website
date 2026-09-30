import React from 'react'
import { photos } from '../../data/photos'
import { Maximize2, Sparkles, X } from 'lucide-react'

export default function Scene5Gallery({ selectedPhotoId, onSelectPhoto }) {
  const selectedPhoto = photos.find((p) => p.id === selectedPhotoId)

  return (
    <div className="relative w-full h-full flex flex-col justify-between items-center p-6 select-none pointer-events-none z-10">
      {/* Top Header */}
      <div className="pt-16 sm:pt-20 text-center max-w-xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-2">
          <Sparkles className="w-3 h-3 text-[#e6c887]" />
          <span className="text-xs uppercase tracking-[0.25em] text-[#e6c887]">
            3D Floating Gallery
          </span>
        </div>
        <h2 className="font-cinzel text-2xl sm:text-3xl md:text-4xl text-[#fdfbf7] font-semibold tracking-wide">
          Her Moments
        </h2>
        <p className="font-sans text-xs sm:text-sm text-[#9b98a6] mt-1">
          {selectedPhoto
            ? 'Hover or drag to tilt the photo in 3D'
            : 'Tap any photograph to bring it into focus'}
        </p>
      </div>

      {/* Selected Photo Caption & Return Overlay */}
      {selectedPhoto && (
        <div className="pointer-events-auto flex flex-col items-center gap-4 bg-[#0d0b17]/85 border border-[#e6c887]/30 px-6 py-4 rounded-2xl backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] max-w-md animate-fade-in mb-8">
          <div className="flex items-center justify-between w-full">
            <span className="font-cormorant text-2xl text-[#fdfbf7] italic">
              "{selectedPhoto.caption}"
            </span>
            <button
              onClick={() => onSelectPhoto(null)}
              className="p-1.5 rounded-full hover:bg-white/10 text-[#9b98a6] hover:text-white transition-colors cursor-pointer"
              title="Return to 3D gallery"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="flex items-center justify-between w-full text-xs text-[#9b98a6]/80 pt-1 border-t border-white/10">
            <span>{selectedPhoto.title}</span>
            <span className="text-[#e6c887]">{selectedPhoto.subcaption}</span>
          </div>
        </div>
      )}

      {/* Bottom Thumbnail Strip for Accessibility */}
      {!selectedPhoto && (
        <div className="pointer-events-auto flex items-center gap-3 pb-8 overflow-x-auto max-w-full px-4">
          {photos.map((photo) => (
            <button
              key={photo.id}
              onClick={() => onSelectPhoto(photo.id)}
              className="group relative w-12 h-16 sm:w-14 sm:h-20 rounded-lg overflow-hidden border border-white/20 hover:border-[#e6c887] transition-all duration-300 transform hover:scale-110 active:scale-95 shadow-lg cursor-pointer flex-shrink-0"
            >
              <img
                src={photo.url}
                alt={photo.title}
                className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-1">
                <Maximize2 className="w-3 h-3 text-[#e6c887]" />
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
