# debugTracks Documentation

---

## Overview

`debugTracks` is a **development-only debugging utility** used to quickly inspect
and validate track lists during development.

It provides a simple way to confirm that list data is structured correctly
before being rendered in `ListScreen` and `FavouriteScreen`

This utility runs **only in `__DEV__` mode** and has no impact on production builds.


---

## Debugging

This utility performs validation checks and logs results
to the developer console while the app is running in development mode.

- Missing required fields (`id`, `title`, `composer`)
- Duplicate track IDs
- Non-deterministic IDs (IDs that do not match `trackIdOf(title, composer)`)

It outputs:
- A small preview of track entries for quick inspection
- A summary log showing overall data health

This allows early detection of data issues that could otherwise cause
subtle UI bugs or unstable list behavior.

---

## Main Component

- **File**: `src/utils/debugTracks.ts`
- **Primary Function**: `debugValidateTracks(tracks, peekCount)`

The utility is intended to be called from screens or components during development,
such as `ListScreen` or `FavouriteScreen`, for temporary verification purposes.

---

## Major Function and Logic

### `debugValidateTracks(tracks, peekCount)`

Core responsibilities:
1. Print a preview of the first `peekCount` tracks for visual inspection
2. Validate required fields on each track
3. Detect duplicate IDs across the dataset
4. Verify deterministic ID generation using `trackIdOf`
5. Output a concise summary of validation results

All validation is performed in memory and is safe to remove after development.

---

## Responsibility

This utility is responsible for **data integrity validation only**.

It does **not**:
- Control UI rendering
- Affect application state
- Modify track data
- Run in production environments

Its sole purpose is to support safer development and debugging
when working with large static datasets.

---
