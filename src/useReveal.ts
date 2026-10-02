import { useEffect } from 'react'
import { navState } from './router'

// Adds the "in" class to every .rv element when it scrolls into view.
// When you come Back to a page, everything already on screen (or above it)
// appears instantly instead of animating in again.
export function useReveal(deps: unknown[] = []) {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>('.rv:not(.in)'))
    if (!('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('in'))
      return
    }
    const instant = navState.type === 'pop'
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((x) => {
          if (x.isIntersecting) {
            x.target.classList.add('in')
            io.unobserve(x.target)
          }
        }),
      { threshold: 0.12 },
    )
    let n = 0
    els.forEach((el) => {
      if (instant && el.getBoundingClientRect().top < window.innerHeight) {
        el.style.transition = 'none'
        el.classList.add('in')
        requestAnimationFrame(() => requestAnimationFrame(() => (el.style.transition = '')))
        return
      }
      el.style.transitionDelay = (n++ % 4) * 70 + 'ms'
      io.observe(el)
    })
    return () => io.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}
