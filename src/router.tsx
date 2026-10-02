import { useEffect, useState, type AnchorHTMLAttributes, type MouseEvent } from 'react'

// Tiny client-side router: "/" and "/projects/:slug". No extra dependency.
// It also remembers the scroll position of every page, so Back returns you
// exactly where you were (e.g. to the project card you opened).

/** How the current page was reached — used to restore scroll and skip re-animations. */
export const navState: { type: 'initial' | 'push' | 'pop' } = { type: 'initial' }

if (typeof window !== 'undefined' && 'scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'manual'
}

function saveScroll() {
  window.history.replaceState({ ...(window.history.state || {}), scrollY: window.scrollY }, '')
}

/** Jump without the smooth-scroll animation set on <html>. */
export function jumpTo(top: number) {
  window.scrollTo({ top, left: 0, behavior: 'instant' as ScrollBehavior })
}

export function navigate(to: string) {
  saveScroll()
  window.history.pushState({ from: window.location.pathname }, '', to)
  navState.type = 'push'
  window.dispatchEvent(new Event('routechange'))
}

/** Go back if the previous entry is inside this site, otherwise navigate. */
export function backOr(to: string) {
  if (window.history.state?.from) window.history.back()
  else navigate(to)
}

export function usePath() {
  const [path, setPath] = useState(window.location.pathname)
  useEffect(() => {
    const onPop = () => {
      navState.type = 'pop'
      setPath(window.location.pathname)
    }
    const onPush = () => setPath(window.location.pathname)
    window.addEventListener('popstate', onPop)
    window.addEventListener('routechange', onPush)
    // Keep the saved position fresh so a reload or Back always has it.
    let t = 0
    const onScroll = () => {
      window.clearTimeout(t)
      t = window.setTimeout(saveScroll, 120)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('popstate', onPop)
      window.removeEventListener('routechange', onPush)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])
  return path
}

export function Link({ to, onClick, ...rest }: AnchorHTMLAttributes<HTMLAnchorElement> & { to: string }) {
  const handle = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e)
    if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return
    e.preventDefault()
    const [pathname, hash] = to.split('#')
    const samePage = !pathname || pathname === window.location.pathname
    if (!samePage) navigate(pathname + (hash ? '#' + hash : ''))
    if (hash) {
      requestAnimationFrame(() => {
        const el = document.getElementById(hash)
        if (!el) return
        if (samePage) el.scrollIntoView({ behavior: 'smooth' })
        else jumpTo(el.getBoundingClientRect().top + window.scrollY - 80)
      })
    }
  }
  return <a href={to} onClick={handle} {...rest} />
}
