// src/hooks/useImagesReady.ts
import { useEffect, useMemo, useRef, useState } from 'react';
import { Image, ImageResolvedAssetSource } from 'react-native';

type ImageSource = number | { uri: string };

export const useImagesReady = (sources: ImageSource[]) => {
  const [ready, setReady] = useState(false);
  const remaining = useRef(new Set<number>());

  const normalized = useMemo(() => sources.filter(Boolean), [sources]);

  useEffect(() => {
    setReady(false);
    remaining.current = new Set(normalized.map((_, idx) => idx));

    // Try to prefetch everything once (works for uri; require() is fine without)
    const tasks = normalized
      .map((src) => {
        if (typeof src === 'number') {
          const res = (Image.resolveAssetSource(src) as ImageResolvedAssetSource);
          return res?.uri ? Image.prefetch(res.uri) : Promise.resolve(true);
        }
        if ('uri' in src && src.uri) return Image.prefetch(src.uri);
        return Promise.resolve(true);
      });

    Promise.allSettled(tasks).then(() => {
      // actual “done” is confirmed by onLoadEnd handlers below
    });
  }, [normalized]);

  const markLoaded = (index: number) => {
    remaining.current.delete(index);
    if (remaining.current.size === 0) setReady(true);
  };

  return { ready, markLoaded };
};
