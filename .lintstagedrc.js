module.exports = {
  '*.{js,jsx,ts,tsx,json,css,md,mdx}': [
    'biome check --write --no-errors-on-unmatched',
  ],
}
