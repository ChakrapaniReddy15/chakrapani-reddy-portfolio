import { journey, next, profile, stack, strengths } from '../data'
import { Link } from '../router'

export function Strengths() {
  return (
    <section id="about" className="tight">
      <div className="wrap">
        <div className="eyebrow mono rv">02 — WHAT I BRING</div>
        <h2 className="rv">Four things teams hire me for</h2>
        <p className="sub rv">Each one is backed by a product you can open above.</p>
        <div className="strengths">
          {strengths.map((s, i) => (
            <div className="strength rv" key={s.title}>
              <span className="pnum mono">0{i + 1}</span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
              <div className="proof">
                <span className="mono">Proof</span>
                {s.proof.map((p) => (
                  <Link key={p.label} to={`/projects/${p.slug}`}>{p.label} →</Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function Journey() {
  return (
    <section id="experience" className="tight">
      <div className="wrap">
        <div className="eyebrow mono rv">03 — MY JOURNEY</div>
        <h2 className="rv">From my first iOS app to owning whole products</h2>
        <p className="sub rv">Where I started, what each step added, and where I am now.</p>
        <ol className="journey">
          {journey.map((j, i) => (
            <li className={`jstep rv${i === journey.length - 2 ? ' now' : ''}`} key={j.title + j.when}>
              <div className="jdot" aria-hidden="true" />
              <div className="jbody">
                <div className="jtop">
                  <span className="when mono">{j.when}</span>
                  <span className="level mono">{j.level}</span>
                </div>
                <h4>{j.title}</h4>
                <div className="at">{j.at}</div>
                <p>{j.text}</p>
                {j.products && <div className="tags jprod">{j.products.map((x) => <i key={x}>{x}</i>)}</div>}
              </div>
            </li>
          ))}
          <li className="jstep next rv">
            <div className="jdot" aria-hidden="true" />
            <div className="jbody">
              <div className="jtop"><span className="when mono">Next</span></div>
              <h4>{next.title}</h4>
              <p>{next.text}</p>
            </div>
          </li>
        </ol>
      </div>
    </section>
  )
}

export function Stack() {
  return (
    <section id="stack" className="tight">
      <div className="wrap">
        <div className="eyebrow mono rv">04 — TOOLKIT</div>
        <h2 className="rv">What I work with</h2>
        <div className="stack">
          {stack.map((g) => (
            <div className="st rv" key={g.group}>
              <h4><span>▸</span> {g.group}</h4>
              <div className="tags">
                {g.items.map((t) => (
                  <i key={t}>{t}</i>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function Contact() {
  const mail = `mailto:${profile.email}`
  return (
    <section id="contact" className="tight">
      <div className="wrap">
        <div className="contact rv">
          <div className="eyebrow mono">05 — CONTACT</div>
          <h2>Have a product to build — or a team to join?</h2>
          <p className="contact-sub">
            I work two ways: as a senior engineer inside your team, or as the person who builds your custom software end
            to end — web platform, mobile app, admin portal and the API behind them.
          </p>
          <div className="ways">
            <div className="way">
              <span className="mono">Hiring</span>
              <h3>Senior / lead full-stack or mobile role</h3>
              <p>Product teams that want someone to own features from idea to production across web and mobile.</p>
              <div className="way-links">
                <a className="btn p" href={profile.resume} target="_blank" rel="noreferrer">Resume ↗</a>
                <a className="btn" href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
              </div>
            </div>
            <div className="way">
              <span className="mono">Building something</span>
              <h3>Custom software, end to end</h3>
              <p>
                Websites, mobile apps, dashboards and full-stack systems — from first requirements to launch and support,
                like <Link to="/projects/student-pass-system">CBS Student Pass</Link>.
              </p>
              <div className="way-links">
                <a className="btn p" href={`${mail}?subject=${encodeURIComponent('Project enquiry')}`}>Tell me about your project</a>
              </div>
            </div>
          </div>
          <a className="mail" href={mail}>{profile.email}</a>
          <div className="cta center small-links">
            <span>{profile.location} · clients in India and the Gulf</span>
            <a href={profile.github} target="_blank" rel="noreferrer">GitHub ↗</a>
          </div>
        </div>
        <Footer />
      </div>
    </section>
  )
}

export function Footer() {
  return (
    <footer className="mono">
      <span>© {new Date().getFullYear()} {profile.name}</span>
      <span>Built with React · Deployed on Netlify</span>
    </footer>
  )
}
