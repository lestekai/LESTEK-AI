import React, { useState, useEffect } from 'react';
import { resolveExerciseMedia, ResolvedMedia, markMediaAsFailed } from '@/lib/exerciseResolver';
import { Dumbbell, ImageOff } from 'lucide-react';
import { detectMediaType } from '@/lib/mediaValidator';

interface ExerciseMediaProps {
  exerciseNameOrId?: string;
  name?: string;
  id?: string;
  exerciseName?: string;
  fallbackMuscle?: string;
  className?: string;
  priority?: boolean;
}

export const ExerciseMedia = ({
  exerciseNameOrId = '',
  name,
  id,
  exerciseName,
  fallbackMuscle,
  className = 'w-full h-full absolute inset-0',
  priority = false
}: ExerciseMediaProps) => {
  const [resolvedMedia, setResolvedMedia] = useState<ResolvedMedia | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // Derive human-readable name and id
  const isSynthetic = (s?: string) => !s || s.startsWith('ex_') || s.startsWith('ex-') || /^[0-9a-f]{8}-/i.test(s);
  const humanName = name || exerciseName || (!isSynthetic(exerciseNameOrId) ? exerciseNameOrId : '');
  const candidateId = id || (exerciseNameOrId !== humanName ? exerciseNameOrId : '');

  const primarySearch = humanName || candidateId || exerciseNameOrId || '';
  const secondarySearch = candidateId && candidateId !== primarySearch ? candidateId : (humanName && humanName !== primarySearch ? humanName : '');

  useEffect(() => {
    // Media resolution with dual identifiers
    let media = resolveExerciseMedia(primarySearch, fallbackMuscle, secondarySearch);
    if (media.sourcePriority === 'fallback' && secondarySearch) {
      const alt = resolveExerciseMedia(secondarySearch, fallbackMuscle);
      if (alt.sourcePriority !== 'fallback') {
        media = alt;
      }
    }
    media.type = detectMediaType(media.url) as 'video'|'image'|'placeholder';
    
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setResolvedMedia(media);
    setHasError(false);
    setIsLoading(true);
  }, [primarySearch, secondarySearch, fallbackMuscle]);

  const handleMediaLoad = () => {
    setIsLoading(false);
  };

  const handleMediaError = () => {
    if (resolvedMedia?.url) {
       console.error('Falhou ao carregar mídia, buscando fallback:', resolvedMedia.url, primarySearch);
       
       // Track this failure so we don't try it again
       markMediaAsFailed(resolvedMedia.url);

       // Re-resolve with secondary search fallback
       let nextMedia = resolveExerciseMedia(primarySearch, fallbackMuscle, secondarySearch);
       if (nextMedia.sourcePriority === 'fallback' && secondarySearch) {
         const alt = resolveExerciseMedia(secondarySearch, fallbackMuscle);
         if (alt.sourcePriority !== 'fallback') {
           nextMedia = alt;
         }
       }
       
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
          alt={primarySearch || exerciseNameOrId}
          className={`w-full h-full object-center transition-all duration-700 ${objectFitStyle} ${isLoading ? 'opacity-0 scale-95' : 'opacity-100 scale-100'} absolute top-0 left-0`}
          onLoad={handleMediaLoad}
          onError={handleMediaError}
          referrerPolicy="no-referrer"
        />
      )}
    </div>
  );
};
