/**
 * Privacy-friendly visit counting with GoatCounter (no cookies, no personal data).
 * Set SITE_CODE to the code chosen at goatcounter.com; while it is empty nothing loads.
 * A shared link such as /?ref=linkedin shows "linkedin" as the visit's source.
 */
const SITE_CODE = 'chakrapani'

type GoatCounter = { no_onload?: boolean; count?: (vars: { path: string }) => void }
declare global {
  interface Window {
    goatcounter?: GoatCounter
  }
}

let requested = false
let pending: string | null = null

export function trackPageView(path: string) {
  if (!SITE_CODE || typeof window === 'undefined') return
  if (/^(localhost|127\.|\[::1\])/.test(window.location.hostname)) return

  if (window.goatcounter?.count) {
    window.goatcounter.count({ path })
    return
  }

  pending = path
  if (requested) return
  requested = true
  window.goatcounter = { no_onload: true }
  const script = document.createElement('script')
  script.async = true
  script.src = 'https://gc.zgo.at/count.js'
  script.dataset.goatcounter = `https://${SITE_CODE}.goatcounter.com/count`
  script.onload = () => {
    if (pending !== null) window.goatcounter?.count?.({ path: pending })
    pending = null
  }
  document.head.appendChild(script)
}
