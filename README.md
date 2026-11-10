# S R Food Court

Seven stone-ground morning tiffins from four Telangana kitchens, rendered as an interactive Three.js brass thali.

## Run

```bash
bun install
bun run dev     # http://localhost:3000
bun run build   # production build in dist/
```

The lockfile is not committed: run `bun install` once and commit the `bun.lock` it generates if you want pinned versions.

## Structure

- `src/components/ThaliStage.jsx` — Three.js scene: brass thali, banana-leaf liner, katori, davara-tumbler, seven procedural tiffins, steam points, camera presets
- `src/data/` — the seven tiffins, six accompaniments, four verified branch listings
- `src/App.jsx` — branch, dish, tray and kitchen-token state
- `deploy/` — static SPA Worker + manifest used to publish the preview
