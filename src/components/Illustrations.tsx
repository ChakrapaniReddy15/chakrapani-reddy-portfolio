// Hand-drawn SVG illustrations (no client screenshots needed).

/** Side view of a car with AI panel segmentation + damage polygons (Verifai-style viewer). */
export function InspectionSvg({ compact = false }: { compact?: boolean }) {
  return (
    <svg viewBox="0 0 420 220" className="ill" role="img" aria-label="AI damage detection on a car photo">
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="var(--card2)" />
          <stop offset="1" stopColor="var(--card)" />
        </linearGradient>
      </defs>
      <rect width="420" height="220" fill="url(#sky)" />
      <line x1="0" y1="176" x2="420" y2="176" stroke="var(--line2)" strokeWidth="2" />
      {/* car body */}
      <path d="M40 150 L52 118 Q60 104 80 102 L140 98 L178 66 Q186 60 200 60 L282 60 Q296 60 306 70 L338 100 L372 108 Q388 112 390 128 L392 150 Z"
        fill="var(--card)" stroke="var(--ink)" strokeOpacity=".55" strokeWidth="2" />
      {/* windows */}
      <path d="M186 72 L204 68 L246 68 L246 98 L160 99 Z" fill="var(--line)" />
      <path d="M254 68 L286 68 Q296 68 302 76 L322 99 L254 99 Z" fill="var(--line)" />
      {/* panel segmentation */}
      <path className="seg" d="M52 118 L140 99 L150 150 L44 150 Z" style={{ ['--k' as string]: 'var(--b)' }} />
      <path className="seg" d="M150 100 L250 99 L252 150 L152 150 Z" style={{ ['--k' as string]: 'var(--a)' }} />
      <path className="seg" d="M254 99 L338 101 L372 108 L388 124 L390 150 L256 150 Z" style={{ ['--k' as string]: 'var(--c)' }} />
      {/* wheels */}
      <circle cx="104" cy="152" r="24" fill="var(--ink)" /><circle cx="104" cy="152" r="10" fill="var(--card2)" />
      <circle cx="322" cy="152" r="24" fill="var(--ink)" /><circle cx="322" cy="152" r="10" fill="var(--card2)" />
      {/* damage polygon */}
      <path className="dmg" d="M196 112 L222 106 L236 118 L230 138 L204 140 L192 126 Z" />
      <g className="dmg-tag">
        <rect x="236" y="30" width={compact ? 124 : 150} height="24" rx="12" />
        <text x={compact ? 298 : 311} y="46" textAnchor="middle">{compact ? 'dent · 94%' : 'Front door · dent 94%'}</text>
        <line x1="236" y1="54" x2="222" y2="106" />
      </g>
      {!compact && (
        <g className="legend">
          <rect x="14" y="14" width="10" height="10" rx="2" fill="var(--b)" /><text x="30" y="23">Fender</text>
          <rect x="14" y="30" width="10" height="10" rx="2" fill="var(--a)" /><text x="30" y="39">Front door</text>
          <rect x="14" y="46" width="10" height="10" rx="2" fill="var(--c)" /><text x="30" y="55">Rear door</text>
        </g>
      )}
    </svg>
  )
}

/** Top-down multi-level parking yard (Yard Designer). */
export function YardSvg() {
  const slots = Array.from({ length: 9 }, (_, i) => i)
  return (
    <svg viewBox="0 0 420 220" className="ill" role="img" aria-label="Parking yard layout editor">
      <rect width="420" height="220" fill="var(--card2)" />
      <g stroke="var(--line)" strokeWidth="1">
        {Array.from({ length: 22 }, (_, i) => <line key={'v' + i} x1={i * 20} y1="0" x2={i * 20} y2="220" />)}
        {Array.from({ length: 12 }, (_, i) => <line key={'h' + i} x1="0" y1={i * 20} x2="420" y2={i * 20} />)}
      </g>
      <rect x="20" y="92" width="380" height="36" rx="4" fill="var(--line2)" opacity=".7" />
      <g fill="var(--ink)" opacity=".55">
        {[70, 150, 230, 310].map((x) => <path key={x} d={`M${x} 104 l14 6 l-14 6 z`} />)}
      </g>
      {slots.map((i) => (
        <rect key={'t' + i} x={24 + i * 42} y="30" width="34" height="56" rx="4"
          fill={i === 2 || i === 6 ? 'color-mix(in srgb, var(--a) 70%, transparent)' : 'var(--card)'}
          stroke={i === 4 ? 'var(--b)' : 'var(--line2)'} strokeWidth={i === 4 ? 2.5 : 1} />
      ))}
      {slots.map((i) => (
        <rect key={'b' + i} x={24 + i * 42} y="134" width="34" height="56" rx="4"
          fill={i === 1 || i === 7 ? 'color-mix(in srgb, var(--a) 70%, transparent)' : 'var(--card)'} stroke="var(--line2)" />
      ))}
      <rect x="362" y="134" width="34" height="56" rx="4" fill="color-mix(in srgb, var(--c) 35%, transparent)" stroke="var(--c)" />
      <text x="379" y="167" textAnchor="middle" fontSize="10" fill="var(--ink)">RAMP</text>
      <g transform="translate(192 22)">
        <rect x="-6" y="-6" width="46" height="68" rx="6" fill="none" stroke="var(--b)" strokeDasharray="4 3" />
      </g>
      <rect x="12" y="198" width="118" height="16" rx="8" fill="var(--card)" stroke="var(--line)" />
      <text x="71" y="210" textAnchor="middle" fontSize="9" fill="var(--mut)">Level 2 · 18 slots · 4 free</text>
    </svg>
  )
}

/** CheckNShare platform map: who uses what, and how the pieces connect. */
export function PlatformSvg() {
  const box = (x: number, y: number, w: number, title: string, sub: string, hl = false) => (
    <g key={title}>
      <rect x={x} y={y} width={w} height="52" rx="10" fill={hl ? 'color-mix(in srgb, var(--a) 16%, var(--card))' : 'var(--card)'}
        stroke={hl ? 'var(--a)' : 'var(--line2)'} strokeWidth={hl ? 2 : 1} />
      <text x={x + w / 2} y={y + 22} textAnchor="middle" fontSize="12.5" fontWeight="700" fill="var(--ink)">{title}</text>
      <text x={x + w / 2} y={y + 39} textAnchor="middle" fontSize="10" fill="var(--mut)">{sub}</text>
    </g>
  )
  const line = (x1: number, y1: number, x2: number, y2: number, dash = false) => (
    <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="var(--line2)" strokeWidth="1.6" strokeDasharray={dash ? '4 4' : undefined} />
  )
  return (
    <svg viewBox="0 0 420 220" className="ill" role="img" aria-label="CheckNShare platform: apps, web portal, services, car and AI inspection">
      <rect width="420" height="220" fill="var(--card2)" />
      {line(80, 62, 210, 110)}{line(80, 158, 210, 110)}{line(340, 62, 210, 110)}{line(340, 158, 210, 110, true)}
      {box(14, 36, 132, 'Employee app', 'book · unlock · inspect', true)}
      {box(14, 132, 132, 'Driver app', 'shifts · rides', true)}
      {box(150, 86, 120, 'Services', 'bookings · payments')}
      {box(274, 36, 132, 'Admin web portal', 'approvals · reports')}
      {box(274, 132, 132, 'Verifai AI', 'damage inspection')}
      <g transform="translate(150 168)">
        <rect width="120" height="38" rx="10" fill="var(--card)" stroke="var(--b)" strokeDasharray="4 3" />
        <text x="60" y="23" textAnchor="middle" fontSize="11" fill="var(--ink)">🔓 Car · Bluetooth</text>
      </g>
      {line(146, 70, 192, 168, true)}
    </svg>
  )
}
