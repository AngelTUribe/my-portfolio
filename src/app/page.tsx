"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import Link from "next/link"
import { Github as GitHub, Linkedin, FileText } from "lucide-react"
import Navbar from "@/components/navbar"
import ProjectsGrid from "@/components/projects-grid"
import AboutSection from "@/components/about-section"
import ContactSection from "@/components/contact-section"
import NameParticles from "@/components/name-particles"

const projects = [
  {
      title: "Building Output Analyzer (UPS)",
      description: "An internal analytics dashboard built for UPS to visualize outbound volume. I used D3.js and React to map data and show the distribution of packages across the country with interactive maps, line charts, and anomaly surfacing.",
      tags: ["React", "D3", "Node", "MySQL"],
      href: "https://docs.google.com/presentation/d/1U0gAiyFit29W713CHxUmyj0MLZzQ3jQR/edit?usp=sharing&ouid=114224006013548134712&rtpof=true&sd=true"
  },
  {
      title: "Spacial Hand Environment",
      description: "A real-time hand tracking and gesture recognition system built with TensorFlow.js and MediaPipe. It detects hand landmarks and recognizes gestures to control a 3D environment!",
      tags: ["TensorFlow.js", "MediaPipe", "Three.js", "React"],
      href: "https://angelturibe.github.io/swarm-body/" 
  },
  {
      title: "Interactive Portfolio",
      description: "The very site you are on right now believe it or not! I built it with Next.js, Framer Motion, and a custom interactive 3D particle physics engine.",
      tags: ["Next.js", "TypeScript", "Tailwind CSS"],
      href: "https://github.com/AngelTUribe/my-portfolio"
  }
]

export default function Home() {
  const { scrollYProgress } = useScroll()
  const heroOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0.25])
  const heroScale = useTransform(scrollYProgress, [0, 0.25], [1, 0.96])

  return (
      <>
        <Navbar />

        <main
            id="top"
            className="px-4 sm:px-6 lg:px-8 pt-28 pb-16 space-y-24"
        >
          <motion.section
              style={{ opacity: heroOpacity, scale: heroScale }}
              className="flex items-center justify-center min-h-[70vh]"
          >
            <div className="w-full max-w-4xl mx-auto text-center space-y-8">
              <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-[10px] uppercase tracking-[0.26em] text-slate-400"
              >
                Software Engineer • Data Visualization • Systems
              </motion.p>

              <NameParticles />

              {/* Mobile-only notice */}
              <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                  className="text-[10px] sm:hidden text-indigo-300/70 tracking-wider mb-6 -mt-2"
              >
                (View on desktop for interactive particle physics)
              </motion.p>

              <motion.p
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto"
              >
                Hi, I'm Angel! I'm a senior at The University of Georgia studying computer science. I have a passion for building fun react applications and visualizing data. Welcome to my portfolio!
              </motion.p>

              <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35, duration: 0.45 }}
                  className="flex flex-wrap justify-center gap-3"
              >
                <Link
                href="/resume.pdf"
                target="_blank"
                className="inline-flex items-center gap-2 rounded-full bg-slate-50 text-slate-900 px-6 py-2 text-xs sm:text-sm font-medium hover:bg-slate-200 transition"
              >
              <FileText size={16} />
               View Resume
              </Link>
              <Link
               href="https://github.com/AngelTUribe" 
               target="_blank"
                className="inline-flex items-center gap-2 rounded-full border border-slate-500/70 text-slate-100 px-5 py-2 text-xs sm:text-sm hover:border-slate-100 hover:bg-slate-900/40 transition"
              >
               <GitHub size={16} />
               GitHub
              </Link>
              <Link
               href="https://www.linkedin.com/in/angel-uribe-777066267" 
              target="_blank"
              className="inline-flex items-center gap-2 rounded-full border border-slate-500/70 text-slate-100 px-5 py-2 text-xs sm:text-sm hover:border-slate-100 hover:bg-slate-900/40 transition"
              >
              <Linkedin size={16} />
             LinkedIn
              </Link>
              </motion.div>
            </div>
          </motion.section>

          <section id="projects">
            <ProjectsGrid projects={projects} />
          </section>

          <section id="about">
            <AboutSection />
          </section>

          <section id="contact">
            <ContactSection />
          </section>
        </main>
      </>
  )
}