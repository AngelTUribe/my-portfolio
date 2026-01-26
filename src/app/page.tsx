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
    id: "1",
    title: "Building Output Analyzer (UPS)",
    description:
        "Internal UPS visualization tool mapping outbound volume with interactive maps, line charts, and anomaly surfacing.",
    tags: ["React", "TypeScript", "D3.js", "Node.js", "MySQL"],
    link: "https://github.com/your-bmo-link-or-demo",
  },
  {
    id: "2",
    title: "Smart City Traffic Optimization",
    description:
        "Reinforcement learning system using PPO to coordinate intersections and reduce congestion in a simulated network.",
    tags: ["Python", "Reinforcement Learning", "PPO"],
    link: "https://github.com/your-traffic-link",
  },
  {
    id: "3",
    title: "Interactive Portfolio",
    description:
        "This site: motion-heavy, 3D background, and focused storytelling aimed at hiring managers and engineers.",
    tags: ["Next.js", "TypeScript", "Tailwind CSS"],
    link: "https://github.com/your-portfolio-repo",
  },
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

              <motion.p
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto"
              >
                I’ve worked on data-heavy tools like UPS analytics dashboards and
                interactive platforms that combine clean engineering, strong UX,
                and real-world impact.
              </motion.p>

              <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35, duration: 0.45 }}
                  className="flex flex-wrap justify-center gap-3"
              >
                <Link
                    href="/resume.pdf"
                    className="inline-flex items-center gap-2 rounded-full bg-slate-50 text-slate-900 px-6 py-2 text-xs sm:text-sm font-medium hover:bg-slate-200 transition"
                >
                  <FileText size={16} />
                  View Resume
                </Link>
                <Link
                    href="https://github.com/your-github"
                    target="_blank"
                    className="inline-flex items-center gap-2 rounded-full border border-slate-500/70 text-slate-100 px-5 py-2 text-xs sm:text-sm hover:border-slate-100 hover:bg-slate-900/40 transition"
                >
                  <GitHub size={16} />
                  GitHub
                </Link>
                <Link
                    href="https://www.linkedin.com/in/your-linkedin"
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
