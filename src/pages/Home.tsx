import Hero from '../components/Hero'
import Marquee from '../components/Marquee'
import Projects from '../components/Projects'
import { Contact, Journey, Stack, Strengths } from '../components/Sections'
import { useReveal } from '../useReveal'

export default function Home() {
  useReveal()
  return (
    <>
      <Hero />
      <Marquee />
      <Projects />
      <Strengths />
      <Journey />
      <Stack />
      <Contact />
    </>
  )
}
