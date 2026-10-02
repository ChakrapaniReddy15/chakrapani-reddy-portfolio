import { profile, stats, trust } from '../data'
import { Link } from '../router'
import PhoneMockup from './PhoneMockup'

export default function Hero() {
  return (
    <header className="wrap hero">
      <div>
        <span className="badge">
          <span className="dot" />
          {profile.status}
        </span>
        <p className="hello mono">Hi, I'm</p>
        <h1 className="fullname">{profile.name}</h1>
        <p className="tagline">
          I build <span className="grad">websites, apps &amp; custom software.</span>
        </p>
        <p className="lead">
          <b>8+ years</b> from my first Swift iOS app to the engineer teams trust with <b>whole products</b>. Today I lead
          mobile on a multi-brand car-sharing platform, build AI and 2D/3D web tools, and deliver complete systems on my
          own — <b>mobile app, web portals, API and deployment</b> — for clients in India and the Gulf.
        </p>
        <div className="cta">
          <Link className="btn p" to="/#work">
            See my work →
          </Link>
          <a className="btn" href={profile.resume} target="_blank" rel="noreferrer">
            View resume ↗
          </a>
          <a className="btn ghost" href={`mailto:${profile.email}`}>
            Email me
          </a>
        </div>
        <div className="hstats">
          {stats.map((s) => (
            <div key={s.label} title={s.hint}>
              <b>{s.value}</b>
              <span>{s.label}</span>
              {s.hint && <small className="mono">{s.hint}</small>}
            </div>
          ))}
        </div>
        <div className="socials mono">
          <a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a>
          <a href={profile.github} target="_blank" rel="noreferrer">GitHub ↗</a>
          <a href={`mailto:${profile.email}`}>{profile.email}</a>
          <span>📍 {profile.location}</span>
        </div>
      </div>
      <PhoneMockup />
      <div className="trust mono">
        <span>Ships to</span>
        {trust.map((t) => (
          <i key={t}>{t}</i>
        ))}
      </div>
    </header>
  )
}
