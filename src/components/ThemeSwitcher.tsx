import { useEffect, useState } from 'react'

// Light / dark toggle. Light = "sand" (default, set on <html> in index.html), dark = "dark".
type Mode = 'sand' | 'dark'
const KEY = 'portfolio-theme'
const META = { sand: '#f7f4ef', dark: '#0e0d0c' }

function initial(): Mode {
  const current = document.documentElement.dataset.theme
  return current === 'dark' ? 'dark' : 'sand'
}

export default function ThemeSwitcher() {
  const [mode, setMode] = useState<Mode>(initial)

  useEffect(() => {
    document.documentElement.dataset.theme = mode
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', META[mode])
    try {
      localStorage.setItem(KEY, mode)
    } catch {
      /* storage unavailable — ignore */
    }
  }, [mode])

  const dark = mode === 'dark'
  return (
    <button
      className="mode"
      aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={dark ? 'Light mode' : 'Dark mode'}
      onClick={() => setMode(dark ? 'sand' : 'dark')}
    >
      {dark ? (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
        </svg>
      )}
    </button>
  )
}
