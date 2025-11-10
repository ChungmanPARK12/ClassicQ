// src/utils/debugTracks.ts
import type { Track } from '../navigation/types';
import { trackIdOf } from '../data/trackId';

/**
 * Prints a quick table of the first N tracks and validates:
 * - required fields (id/title/composer)
 * - duplicate ids
 * - deterministic ids (id === trackIdOf(title, composer))
 */
export const debugValidateTracks = (tracks: Track[], peekCount = 10) => {
  if (!__DEV__) return; // stay silent in production

  console.log('========== TRACK DEBUG START ==========');

  // A) Peek first N
  const peek = tracks.slice(0, peekCount).map(({ id, title, composer }, i) => ({ i, id, title, composer }));
  // @ts-ignore – Metro supports console.table
  if (console.table) console.table(peek); else console.log('TRACK PEEK:', peek);

  // B) Validate required fields + duplicates
  const ids = new Set<string>();
  const duplicates: { i: number; id: string }[] = [];
  const missing: { i: number; fields: string[] }[] = [];

  tracks.forEach((t, i) => {
    const fields: string[] = [];
    if (!t.id) fields.push('id');
    if (!t.title) fields.push('title');
    if (!t.composer) fields.push('composer');
    if (fields.length) missing.push({ i, fields });

    if (t.id) {
      if (ids.has(t.id)) duplicates.push({ i, id: t.id });
      ids.add(t.id);
    }
  });

  // C) Determinism check
  const mismatches = tracks
    .filter((t) => !!t.id && t.id !== trackIdOf(t.title, t.composer))
    .map((t) => ({ id: t.id, shouldBe: trackIdOf(t.title, t.composer), title: t.title, composer: t.composer }));

  // Summary
  console.log(
    `[Tracks] total=${tracks.length} uniqueIds=${ids.size} dupIds=${duplicates.length} missingRows=${missing.length} mismatches=${mismatches.length}`
  );
  if (duplicates.length) console.warn('Duplicate IDs:', duplicates);
  if (missing.length) console.warn('Missing fields:', missing);
  if (mismatches.length) console.warn('Determinism mismatches:', mismatches);

  const ok = duplicates.length === 0 && missing.length === 0 && mismatches.length === 0;
  console.log(ok ? '✅ TRACKS OK' : '⚠️ TRACKS NEED ATTENTION');

  console.log('=========== TRACK DEBUG END ===========');
};
