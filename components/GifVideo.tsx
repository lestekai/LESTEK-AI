'use client';

import { useEffect, useRef } from 'react';

export function GifVideo({ src, className }: { src: string; className?: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.defaultMuted = true;
      video.muted = true;
      video.playsInline = true;
      
      const attemptPlay = async () => {
        try {
          await video.play();
        } catch (error) {
          console.warn("Autoplay prevented:", error);
          // Omit controls fallback for small gifs so UI doesn't break.
        }
      };

      attemptPlay();
    }
  }, [src]);

  return (
    <video
      key={src}
      ref={videoRef}
      src={src}
      className={className}
      autoPlay
      loop
      muted
      playsInline
      preload="auto"
      onLoadedData={(e) => {
        e.currentTarget.play().catch(() => {});
      }}
    />
  );
}
