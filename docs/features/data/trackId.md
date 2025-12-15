# Track Id Documentation

This document explains the generates deterministic, compact IDs for tracks from their metadata(title, composer).

## Overview

IDs are normalized, hashed, and base36-encoded, then prefixed with `trk_`e.g.
Use these IDs consistently for: favorites, deduplication, local storage keys, logging, and debugging across ClassicQ.
String normalization -> Character processing -> Hashing -> Number encoding -> Final formatting. 


## Method

- `normalize(s: string): string`, prevents input text to minimize accidental differences.
- `NFKC -> lowercase -> trim -> collapse spaces`

```ts
normalize("  Béthoven　Symphony No.5 ") // "béthoven symphony no.5"
```

- `trackIdOf(title: string, composer: string, extra?: string): string`.
- Main API that returns a stable ID for a track.

```ts
trackIdOf(title: string, composer: string, extra?: string): string
```

- Builds a normalized key from `title | composer and extra when provided`.
- returns `trk_<base36>`.

```ts
trackIdOf("Symphony No.5", "Beethoven"); 
// → "trk_1znrcjb" (example)

trackIdOf("Symphony No.5", "Beethoven", "Berlin Philharmonic"); 
// → "trk_3pw6e1x" (example)

```

## Major Fucntion and Logic

# Normalize
- Apply Unicode NFKC to fold compatibility characters. 
- Lowercase, trim, and collapse multiple spaces -> single spaces.
- Purpose: aviod duplicate IDs caused by "BETHOVEN", "Beethoven", or extra spaces. 

# Key Construction
- Concatenate normalized fields with vertical bars: `title | composer | extra?`

# Hash (FNV-1a 32 bit)
- Lightweight hash producing an unsigned 32-bit number

# Encode(base36) + Prefix
- Convert hash to base36 string and prefix with `trk_`. Result: `trk_<base36hash>`.

## Responsibility
- Generates a repeatable ID from text inputs.
- Normalizes Unicode(NFKC), case, whitespace so equivalent strings map to the same ID.


