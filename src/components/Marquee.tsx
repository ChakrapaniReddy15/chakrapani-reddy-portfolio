import { marquee } from '../data'

export default function Marquee() {
  const items = [...marquee, ...marquee]
  return (
    <div className="marq" aria-label="Technologies">
      <div className="track mono">
        {items.map((t, i) => (
          <span key={i} aria-hidden={i >= marquee.length}>{t}</span>
        ))}
      </div>
    </div>
  )
}
