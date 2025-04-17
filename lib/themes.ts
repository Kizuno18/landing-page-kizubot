export const THEMES = {
  "spatial-hacker": {
    label: "Spatial Hacker",
    colors: ["#00CCFF", "#FFAA00", "#AA66FF"],
  },
  "gold-days": {
    label: "Gold Days",
    colors: ["#FFD700", "#4b0082", "#6a0dad"],
  },
} as const;

export type ThemeKey = keyof typeof THEMES;
export const THEME_KEYS = Object.keys(THEMES) as ThemeKey[];
