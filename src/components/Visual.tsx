import type { Visual as V } from '../data'
import { InspectionSvg, PlatformSvg, YardSvg } from './Illustrations'

export default function Visual({ type, image, video, alt }: { type: V; image?: string; video?: string; alt: string }) {
  if (video && !video.endsWith('.gif'))
    return <video className="viz img" src={video} poster={image} autoPlay muted loop playsInline preload="metadata" aria-label={alt} />
  if (video) return <img className="viz img" src={video} alt={alt} loading="lazy" />
  if (image) return <img className="viz img" src={image} alt={alt} loading="lazy" />
  if (type === 'ai') return <div className="viz v-svg"><InspectionSvg /></div>
  if (type === 'yard') return <div className="viz v-svg"><YardSvg /></div>
  if (type === 'platform') return <div className="viz v-svg"><PlatformSvg /></div>
  return (
    <div className={`viz v-${type}`} aria-hidden>
      {type === 'pass' && (
        <div className="pass-ui">
          <span>Pass #214 · Library</span>
          <b className="mono">04:32</b>
        </div>
      )}
      {type === 'rental' && (
        <div className="rent-ui">
          <span>Monthly plan</span>
          <b>SUV · CDW+</b>
        </div>
      )}
    </div>
  )
}
