// src/hooks/useImagesReady.ts
import { useEffect, useMemo, useRef, useState } from 'react';
import { Image, ImageResolvedAssetSource, ImageSourcePropType } from 'react-native';

const uriOf = (src: ImageSourcePropType): string | null => {
  try {
    if (typeof src === 'number') {
      const res = Image.resolveAssetSource(src) as ImageResolvedAssetSource | null;
      return res?.uri ?? null;
    }
    if (src && typeof src === 'object' && 'uri' in src) {
      return (src as { uri?: string }).uri ?? null;
    }
  } catch {}
  return null;
};

export const useImagesReady = (
  sources: ImageSourcePropType[],
  { timeoutMs = 12000 }: { timeoutMs?: number } = {}
) => {
  const [ready, setReady] = useState(false);
  const remaining = useRef(new Set<number>());

  const normalized = useMemo(
    () => (sources ?? []).filter(Boolean) as ImageSourcePropType[],
    [sources]
  );

  useEffect(() => {
    // reset state
    setReady(false);
    remaining.current = new Set(normalized.map((_, i) => i));

    if (normalized.length === 0) {
      setReady(true);
      return;
    }

    // Prefetch all URIs so we don't rely on list rendering
    const prefetches = normalized.map((src, i) => {
      const uri = uriOf(src);
      if (!uri) {
        // if no uri, consider it loaded to avoid deadlock
        remaining.current.delete(i);
        return Promise.resolve(true);
      }
      return Image.prefetch(uri)
        .catch(() => false)
        .finally(() => {
          remaining.current.delete(i);
          if (remaining.current.size === 0) setReady(true);
        });
    });

    // safety timeout so we never get stuck
    const timer = setTimeout(() => {
      if (remaining.current.size > 0) {
        remaining.current.clear();
        setReady(true);
      }
    }, timeoutMs);

    return () => {
      clearTimeout(timer);
    };
  }, [normalized, timeoutMs]);

  // Expose a safe no-op if already ready
  const markLoaded = (index: number) => {
    if (ready) return;
    remaining.current.delete(index);
    if (remaining.current.size === 0) setReady(true);
  };

  return { ready, markLoaded };
};
