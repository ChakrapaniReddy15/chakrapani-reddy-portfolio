import { useEffect, useState } from 'react'
import { Link } from '../router'
import { profile } from '../data'
import ThemeSwitcher from './ThemeSwitcher'

const LINKS = [
  { to: '/#work', label: 'Work' },
  { to: '/#about', label: 'About' },
  { to: '/#experience', label: 'Experience' },
  { to: '/#stack', label: 'Stack' },
  { to: '/#contact', label: 'Contact' },
]

export default function Nav() {
  const [open, setOpen] = useState(false)

  // Close the phone menu on navigation, Escape or a tap outside it.
  useEffect(() => {
    if (!open) return
    const close = () => setOpen(false)
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && close()
    const onDown = (e: Event) => {
      if (!(e.target as HTMLElement).closest('.nav')) close()
    }
    window.addEventListener('hashchange', close)
    window.addEventListener('keydown', onKey)
    document.addEventListener('pointerdown', onDown)
    return () => {
      window.removeEventListener('hashchange', close)
      window.removeEventListener('keydown', onKey)
      document.removeEventListener('pointerdown', onDown)
    }
  }, [open])

  return (
    <nav className={'nav' + (open ? ' open' : '')} aria-label="Main">
      <button
        className="menu-btn"
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
        aria-controls="nav-links"
        onClick={() => setOpen((o) => !o)}
      >
        <span /><span /><span />
      </button>
      <div className="nav-links" id="nav-links">
        {LINKS.map((l) => (
          <Link key={l.to} to={l.to} onClick={() => setOpen(false)}>{l.label}</Link>
        ))}
      </div>
      <ThemeSwitcher />
      <a className="cv" href={profile.resume} target="_blank" rel="noreferrer">
        Resume ↗
      </a>
    </nav>
  )
}
