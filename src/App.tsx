import { useEffect, useLayoutEffect } from 'react'
import { jumpTo, navState, usePath } from './router'
import Nav from './components/Nav'
import Home from './pages/Home'
import CaseStudy from './pages/CaseStudy'
import NotFound from './pages/NotFound'
import { projects, profile } from './data'
import { trackPageView } from './analytics'

/** Case studies of internal tools: visible by link, but search engines are asked not to list them. */
const NO_INDEX = ['yard-designer', 'ai-vehicle-inspection']

export default function App() {
  const path = usePath()
  const match = path.match(/^\/projects\/([\w-]+)\/?$/)
  const project = match ? projects.find((p) => p.slug === match[1]) : undefined

  // Scroll: new page → top (or #section); Back/Forward → where you were.
  useLayoutEffect(() => {
    if (navState.type === 'pop') {
      jumpTo(window.history.state?.scrollY ?? 0)
    } else if (!window.location.hash) {
      jumpTo(0)
    } else {
      const el = document.getElementById(window.location.hash.slice(1))
      if (el) jumpTo(el.getBoundingClientRect().top + window.scrollY - 80)
    }
  }, [path])

  useEffect(() => {
    const home = path === '/' || path === ''
    document.title = project
      ? `${project.title} — ${profile.name}`
      : home
        ? `${profile.name} — ${profile.role}`
        : `Page not found — ${profile.name}`
  }, [project, path])

  useEffect(() => {
    trackPageView(path)
  }, [path])

  useEffect(() => {
    const hide = !!project && NO_INDEX.includes(project.slug)
    let meta = document.querySelector('meta[name="robots"]')
    if (hide) {
      if (!meta) {
        meta = document.createElement('meta')
        meta.setAttribute('name', 'robots')
        document.head.appendChild(meta)
      }
      meta.setAttribute('content', 'noindex')
    } else {
      meta?.remove()
    }
  }, [project])

  let page
  if (path === '/' || path === '') page = <Home />
  else if (project) page = <CaseStudy key={project.slug} project={project} />
  else page = <NotFound />

  return (
    <>
      <div className="glow" aria-hidden />
      <div className="grid-bg" aria-hidden />
      <Nav />
      <main>{page}</main>
    </>
  )
}
