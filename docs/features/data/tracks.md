#  Tracks Documentation

This document defines the main dataset and identity assignment system for all classical music tracks used in ClassicQ.

## Overview

It imports `trackIdof()` from `trackId.ts` to automatically attach stable and unique identifiers to every track object. 

## Debugging

```ts
console.log("Total tracks loaded:", trackList.length);
```

## Main Component

-Export `trackList` array each track object(`title`, `composer`, `image`).
- Generates an ID using `trackIdOf()`.
- Checks for collisions with the `seen` set.
- If duplicate detected, regenerates the ID using a salt (extra).
- Appends the new object ({`id`, `title`, `composer`, `image`}) into `trackList`.
- Finally, the completed list is exported for all modules, `ListScreen`, `FavouriteScreen`, and `PlayingScreen`.

## Major Fucntion and Logic

- A raw dataset array containing all tracks without IDs.
```ts
const RAW_TRACKS = [
  { title: 'Moonlight Sonata', composer: 'Beethoven', image: require('../../assets/tracks/moonlight.png') },
  ...
];

```
- The mapping loop assigns IDs, checks for duplicates, and merges the result.
```ts
RAW_TRACKS.map((t) => {
  let id = trackIdOf(t.title, t.composer);
  let salt = 1;
  while (seen.has(id)) {
    id = trackIdOf(t.title, t.composer, String(salt++));
  }
  seen.add(id);
  return { id, ...t };
});

```

## Responsibility

- Data backbone of ClassicQ, it merges raw metadata, local assdets, and hash-based identity logic into one stable export, ensuring every track has a unique, consistent, and reuable identity throughout the entire application. 

