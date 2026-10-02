import { alsoBuilt, projects, sites } from '../data'
import { Link } from '../router'
import Visual from './Visual'
import type { CSSProperties } from 'react'

export default function Projects() {
  return (
    <section id="work">
      <div className="wrap">
        <div className="eyebrow mono rv">01 — SELECTED WORK</div>
        <h2 className="rv">Products I've built</h2>
        <p className="sub rv">Five products running in production. Each card opens the full story — the problem, what I built, the hard parts and the outcome.</p>
        <div className="bento">
          {projects.map((p, i) => (
            <Link key={p.slug} to={`/projects/${p.slug}`} className={`tile t${i + 1} rv`} style={{ '--h': p.accent } as CSSProperties}>
              <div className="kind mono">{p.kind}</div>
              <h3>{p.title}</h3>
              <div className="tagline-s">{p.tagline}</div>
              <Visual type={p.visual} image={p.image} video={p.video} alt={p.title} />
              <p>{p.summary}</p>
              {p.highlights && i < 2 && (
                <div className="feat">
                  {p.highlights.map((h) => (
                    <div key={h}>{h}</div>
                  ))}
                </div>
              )}
              <div className="tags">
                {p.tags.map((t) => (
                  <i key={t}>{t}</i>
                ))}
              </div>
              <span className="open mono">
                Read case study →{p.links && p.links.length > 0 && <em className="live"> · Live on {p.links.map((l) => l.label).join(' & ')}</em>}
              </span>
            </Link>
          ))}
          <a className="tile t6 more rv" href="https://github.com/ChakrapaniReddy15" target="_blank" rel="noreferrer">
            <h3>More on GitHub →</h3>
            <p>Side projects &amp; experiments</p>
          </a>
        </div>
        <h3 className="sites-h rv">Also delivered</h3>
        <div className="also">
          {alsoBuilt.map((a) => (
            <div className="also-row rv" key={a.name}>
              <div className="also-meta">
                <span className="mono">{a.client}</span>
                <span className="also-role mono">{a.role}</span>
              </div>
              <div className="also-main">
                <h4>{a.name}</h4>
                <p>{a.text}</p>
                <div className="tags">{a.stack.map((t) => <i key={t}>{t}</i>)}</div>
              </div>
              <div className="also-rel">
                <span className="mono">Related</span>
                {a.related.map((r) => (
                  <Link key={r.slug} to={`/projects/${r.slug}`}>{r.label} →</Link>
                ))}
              </div>
            </div>
          ))}
        </div>
        <h3 className="sites-h rv">Websites</h3>
        <div className="sites">
          {sites.map((w) => (
            <div className="site rv" key={w.name}>
              <h4>{w.name}</h4>
              <p>{w.text}</p>
              <div className="tags">{w.stack.map((t) => <i key={t}>{t}</i>)}</div>
              <div className="site-links mono">
                {w.links.map((l) => (
                  <a key={l.url} href={l.url} target="_blank" rel="noreferrer">{l.label} ↗</a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
