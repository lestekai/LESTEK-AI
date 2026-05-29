'use client';

import { useEffect } from 'react';
import { useAppStore } from '@/lib/store';

export function ZoomManager() {
  const zoomLevel = useAppStore((state) => state.zoomLevel);

  useEffect(() => {
    if (typeof document !== 'undefined') {
      // Apply the zoom percentage directly to body/documentElement
      document.documentElement.style.zoom = `${zoomLevel}%`;
    }
  }, [zoomLevel]);

  return null;
}
