import { useEffect, useState } from 'react'
import { Link } from '../router'

// Hero visual: real product screens — a browser (web work) and a phone (mobile work) —
// rotating together. Clicking a device opens that project's case study.
const SLIDES = [
  {
    url: 'verifai · assessments / left-front-fender',
    web: { src: '/hero/web-verifai.jpg', slug: 'ai-vehicle-inspection', alt: 'Verifai AI — damage detected on a car photo, with the damage table' },
    webChip: <>🤖 <b>AI</b> damage detection · web</>,
    phone: { src: '/hero/phone-cns.jpg', slug: 'corporate-car-sharing', alt: 'CheckNShare app — vehicle unlocked over Bluetooth' },
    phoneChip: <>🔓 <b>Bluetooth</b> unlock · mobile</>,
  },
  {
    url: 'yard · 3D editor / multi-level parking',
    web: { src: '/hero/web-yard.jpg', slug: 'yard-designer', alt: 'Yard Management — 3D yard editor' },
    webChip: <>🧭 <b>2D/3D</b> yard designer · solo</>,
    phone: { src: '/hero/phone-alfaris.jpg', slug: 'car-rental', alt: 'Alfaris Rent-A-Car app — monthly subscription' },
    phoneChip: <>🚗 <b>Rental app</b> · live in stores</>,
  },
  {
    url: 'cbs · admin / hall passes',
    web: { src: '/hero/web-cbs.jpg', slug: 'student-pass-system', alt: 'CBS admin portal — hall pass history' },
    webChip: <>🏫 <b>School system</b> · built solo</>,
    phone: { src: '/hero/phone-cbs.jpg', slug: 'student-pass-system', alt: 'CBS teacher app — create a hall pass' },
    phoneChip: <>📱 <b>Teacher app</b> · Expo</>,
  },
]

export default function PhoneMockup() {
  const [i, setI] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce || paused) return
    const t = window.setInterval(() => setI((n) => (n + 1) % SLIDES.length), 4500)
    return () => window.clearInterval(t)
  }, [paused])

  const s = SLIDES[i]
  return (
    <div className="stage" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <Link to={`/projects/${s.web.slug}`} className="browser" aria-label={`Open case study: ${s.web.alt}`}>
        <div className="bbar"><i /><i /><i /><span className="mono">{s.url}</span></div>
        <div className="shot">
          {SLIDES.map((x, n) => (
            <img key={x.web.src} src={x.web.src} alt={n === i ? x.web.alt : ''} className={n === i ? 'on' : ''} loading={n === 0 ? 'eager' : 'lazy'} />
          ))}
        </div>
      </Link>
      <Link to={`/projects/${s.phone.slug}`} className="phone" aria-label={`Open case study: ${s.phone.alt}`}>
        {SLIDES.map((x, n) => (
          <img key={x.phone.src} src={x.phone.src} alt={n === i ? x.phone.alt : ''} className={n === i ? 'on' : ''} loading={n === 0 ? 'eager' : 'lazy'} />
        ))}
      </Link>
      <div className="chip c1" key={'w' + i}>{s.webChip}</div>
      <div className="chip c3" key={'p' + i}>{s.phoneChip}</div>
      <div className="chip c2">⚛️ <b>React Native</b> 0.67 → 0.84</div>
      <div className="dots" role="tablist" aria-label="Product screens">
        {SLIDES.map((x, n) => (
          <button key={n} role="tab" aria-selected={n === i} aria-label={`Show ${x.url.split(' ·')[0]}`} className={n === i ? 'on' : ''} onClick={() => setI(n)} />
        ))}
      </div>
    </div>
  )
}
