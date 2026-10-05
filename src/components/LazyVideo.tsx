import { useEffect, useRef } from 'react'

// A looping, muted clip that only downloads when it is about to scroll into view
// and pauses again when it leaves, so pages stay light on slow connections.
export default function LazyVideo({
  src,
  poster,
  className,
  label,
}: {
  src: string
  poster?: string
  className?: string
  label?: string
}) {
  const ref = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (!('IntersectionObserver' in window)) {
      el.src = src
      el.play().catch(() => {})
      return
    }
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            if (!el.getAttribute('src')) el.src = src
            el.play().catch(() => {})
          } else if (!el.paused) {
            el.pause()
          }
        }),
      { rootMargin: '200px 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [src])

  return <video ref={ref} className={className} poster={poster} muted loop playsInline preload="none" aria-label={label} />
}
