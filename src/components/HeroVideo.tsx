'use client'

import React, { useEffect, useRef, useState } from 'react'

export const HeroVideo: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [showControls, setShowControls] = useState(true)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    video.muted = true
    video.defaultMuted = true

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')

    const handleMotion = () => {
      if (motionQuery.matches) {
        video.pause()
        setIsPlaying(false)
        setShowControls(false)
      } else {
        setShowControls(true)
        const playPromise = video.play()
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              setIsPlaying(true)
            })
            .catch((err) => {
              console.warn('Autoplay prevented:', err)
              setIsPlaying(false)
            })
        }
      }
    }

    handleMotion()
    motionQuery.addEventListener('change', handleMotion)
    return () => motionQuery.removeEventListener('change', handleMotion)
  }, [])

  const togglePlay = () => {
    const video = videoRef.current
    if (!video) return

    if (video.paused) {
      video.muted = true
      video
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false))
    } else {
      video.pause()
      setIsPlaying(false)
    }
  }

  return (
    <>
      <div className="hero-art" aria-hidden="true">
        <video
          ref={videoRef}
          className="hero-video"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/media/chapada.jpeg"
        >
          <source src="/media/video-novo-jane.mp4" type="video/mp4" />
        </video>
      </div>
      {showControls && (
        <button
          className="hero-motion"
          type="button"
          onClick={togglePlay}
          aria-label={isPlaying ? 'Pausar vídeo de fundo' : 'Reproduzir vídeo de fundo'}
          title={isPlaying ? 'Pausar vídeo de fundo' : 'Reproduzir vídeo de fundo'}
        >
          {isPlaying ? (
            <svg
              className="icon-pause"
              viewBox="0 0 24 24"
              width="14"
              height="14"
              fill="currentColor"
              aria-hidden="true"
            >
              <rect x="6" y="4" width="3.5" height="16" rx="1" />
              <rect x="14.5" y="4" width="3.5" height="16" rx="1" />
            </svg>
          ) : (
            <svg
              className="icon-play"
              viewBox="0 0 24 24"
              width="14"
              height="14"
              fill="currentColor"
              aria-hidden="true"
            >
              <polygon points="7,4 20,12 7,20" />
            </svg>
          )}
        </button>
      )}
    </>
  )
}

export default HeroVideo
