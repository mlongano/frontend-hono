export type Theme = 'dark' | 'light' | 'system'

export function getSystemTheme(): Theme {
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark'
  }
  return 'light'
}
