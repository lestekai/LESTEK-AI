import React, { useState, useEffect } from 'react';
import { resolveExerciseMedia, ResolvedMedia, markMediaAsFailed } from '@/lib/exerciseResolver';
import { Dumbbell, ImageOff } from 'lucide-react';
import { detectMediaType } from '@/lib/mediaValidator';

interface ExerciseMediaProps {
  exerciseNameOrId: string;
  fallbackMuscle?: string;
  className?: string;
  priority?: boolean;
}

export const ExerciseMedia = ({
  exerciseNameOrId,
  fallbackMuscle,
  className = 'w-full h-full absolute inset-0',
  priority = false
}: ExerciseMediaProps) => {
  const [resolvedMedia, setResolvedMedia] = useState<ResolvedMedia | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    // Media resolution
    const media = resolveExerciseMedia(exerciseNameOrId, fallbackMuscle);
    media.type = detectMediaType(media.url) as 'video'|'image'|'placeholder';
    
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setResolvedMedia(media);
    setHasError(false);
    setIsLoading(true);
  }, [exerciseNameOrId, fallbackMuscle]);

  const handleMediaLoad = () => {
    setIsLoading(false);
  };

  const handleMediaError = () => {
    if (resolvedMedia?.url) {
       console.error('Falhou ao carregar mídia, buscando fallback:', resolvedMedia.url, exerciseNameOrId);
       
       // Track this failure so we don't try it again
       markMediaAsFailed(resolvedMedia.url);

       // Re-resolve. Since the bad url is tracked, it should hand us the next priority url (remote or placeholder)
       const nextMedia = resolveExerciseMedia(exerciseNameOrId, fallbackMuscle);
       
       if (nextMedia.url && nextMedia.url !== resolvedMedia.url) {
          nextMedia.type = detectMediaType(nextMedia.url) as 'video'|'image'|'placeholder';
          setResolvedMedia(nextMedia);
          setIsLoading(true); // reset load state for new image
          setHasError(false); // we have a new hope!
          return;
       }
    }
    
    setHasError(true);
    setIsLoading(false);
  };

  const objectFitStyle = resolvedMedia?.type === 'placeholder' ? 'object-contain scale-90' : 'object-cover sm:object-contain';

  return (
    <div className={`relative flex items-center justify-center overflow-hidden bg-surface ${className}`}>
      {isLoading && !hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-surface border border-surface-light z-10 animate-pulse">
           <div className="w-1/3 aspect-video bg-text-primary/5 rounded-lg"></div>
        </div>
      )}

      {hasError ? (
         <div className="absolute inset-0 flex flex-col items-center justify-center bg-surface text-text-secondary/50">
            <ImageOff size={20} className="opacity-50 mb-2 text-neon-pink" />
            <span className="text-[10px] font-bold uppercase text-center">Indisponível</span>
         </div>
      ) : !resolvedMedia?.url ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-surface text-text-secondary/50">
          <Dumbbell size={20} className="opacity-50" />
        </div>
      ) : resolvedMedia.type === 'video' ? (
        <video
          key={resolvedMedia.url}
          src={resolvedMedia.url}
          autoPlay
          loop
          muted
          playsInline
          disableRemotePlayback
          className={`w-full h-full object-center transition-all duration-700 ${objectFitStyle} ${isLoading ? 'opacity-0' : 'opacity-100'}`}
          onLoadedData={handleMediaLoad}
          onError={handleMediaError}
        />
      ) : (
        <img
          src={resolvedMedia.url}
          alt={exerciseNameOrId}
          className={`w-full h-full object-center transition-all duration-700 ${objectFitStyle} ${isLoading ? 'opacity-0 scale-95' : 'opacity-100 scale-100'} absolute top-0 left-0`}
          onLoad={handleMediaLoad}
          onError={handleMediaError}
          referrerPolicy="no-referrer"
        />
      )}
    </div>
  );
};
