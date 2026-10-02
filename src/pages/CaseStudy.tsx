import type { CSSProperties } from 'react'
import { projects, type Project } from '../data'
import { Link, backOr } from '../router'
import Visual from '../components/Visual'
import { Footer } from '../components/Sections'
import { useReveal } from '../useReveal'

export default function CaseStudy({ project: p }: { project: Project }) {
  useReveal([p.slug])
  const idx = projects.findIndex((x) => x.slug === p.slug)
  const next = projects[(idx + 1) % projects.length]
  const c = p.caseStudy

  return (
    <article className="wrap case" style={{ '--h': p.accent } as CSSProperties}>
      <a href="/#work" className="back mono" onClick={(e) => { e.preventDefault(); backOr('/#work') }}>← All projects</a>
      <div className="kind mono rv">{p.kind}</div>
      <h1 className="rv">{p.title}</h1>
      <p className="cs-tagline rv">{p.tagline}</p>
      <p className="lead rv">{p.summary}</p>
      <div className="meta rv">
        <div><span>Role</span><b>{c.role}</b></div>
        <div><span>Period</span><b>{c.period}</b></div>
        <div><span>Platform</span><b>{p.tags.slice(0, 3).join(' · ')}</b></div>
      </div>
      {p.links && p.links.length > 0 && (
        <div className="cta rv" style={{ marginTop: 0, marginBottom: 24 }}>
          {p.links.map((l) => (
            <a key={l.url} className="btn" href={l.url} target="_blank" rel="noreferrer">{l.label} ↗</a>
          ))}
        </div>
      )}
      <div className="rv hero-viz">
        <Visual type={p.visual} image={p.image} video={p.video} alt={p.title} />
      </div>

      <section className="cs-block rv">
        <h2>Overview</h2>
        <p>{c.overview}</p>
      </section>
      <section className="cs-block rv">
        <h2>What I built</h2>
        <div className="surfaces">
          {c.surfaces.map((sf) => (
            <div className="surface" key={sf.name}>
              <div className="sf-head">
                <h3>{sf.name}</h3>
                <span className="sf-role mono">{sf.role}</span>
              </div>
              <ul>{sf.points.map((b) => <li key={b}>{b}</li>)}</ul>
            </div>
          ))}
        </div>
      </section>
      {c.challenges && c.challenges.length > 0 && (
        <section className="cs-block rv">
          <h2>Hard problems I solved</h2>
          <div className="challenges">
            {c.challenges.map((ch) => (
              <div className="challenge" key={ch.title}>
                <h3>{ch.title}</h3>
                <p>{ch.text}</p>
              </div>
            ))}
          </div>
        </section>
      )}
      <section className="cs-block rv">
        <h2>Outcomes</h2>
        <ul>{c.outcomes.map((b) => <li key={b}>{b}</li>)}</ul>
      </section>
      {p.gallery && p.gallery.length > 0 && (
        <section className="cs-block rv">
          <h2>In action</h2>
          <div className="gallery">
            {p.gallery.map((g) => (
              <figure key={g.src}>
                {/\.(mp4|webm)$/.test(g.src) ? (
                  <video src={g.src} autoPlay muted loop playsInline preload="metadata" />
                ) : (
                  <img src={g.src} alt={g.caption} loading="lazy" />
                )}
                <figcaption>{g.caption}</figcaption>
              </figure>
            ))}
          </div>
        </section>
      )}
      <section className="cs-block rv">
        <h2>Stack</h2>
        <div className="tags big">{c.stack.map((t) => <i key={t}>{t}</i>)}</div>
      </section>

      <Link to={`/projects/${next.slug}`} className="next rv">
        <span className="mono">Next project</span>
        <b>{next.title} — {next.tagline} →</b>
      </Link>
      <p className="nda mono">Source code is private to each client; screens use demo data.</p>
      <Footer />
    </article>
  )
}
