"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

interface Project {
  title: string
  description: string
  tags: string[]
  href: string
}

interface ProjectsGridProps {
  projects: Project[]
}

export default function ProjectsGrid({ projects }: ProjectsGridProps) {
  return (
      <section className="w-full py-16 sm:py-20">
        <div className="max-w-6xl mx-auto">
          <div className="mb-10 flex items-end justify-between gap-4">
            <div>
              <h2 className="text-3xl sm:text-4xl font-semibold text-slate-50">
                Featured Work
              </h2>
              <p className="text-sm sm:text-base text-slate-400">
                A snapshot of projects that match what I’d bring to your team.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {projects.map((project, index) => (
                <motion.div
                    key={project.title}
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.06, duration: 0.35, ease: "easeOut" }}
                    className="group relative overflow-hidden rounded-2xl border border-slate-800/80 bg-slate-950/60 px-4 py-4 sm:px-5 sm:py-5 backdrop-blur-xl shadow-[0_14px_60px_rgba(2,6,23,0.9)] hover:border-indigo-400/60 hover:-translate-y-1 hover:shadow-[0_22px_80px_rgba(15,23,42,0.95)] transition-all"
                >
                  <div className="flex flex-col h-full gap-3">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="text-base sm:text-lg font-semibold text-slate-50 group-hover:text-indigo-300 transition-colors">
                        {project.title}
                      </h3>
                      <span className="text-[9px] px-2 py-0.5 rounded-full bg-slate-900/90 text-slate-400 border border-slate-700/80">
                    Selected
                  </span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5 mt-1">
                      {project.tags.map((tag) => (
                          <span
                              key={tag}
                              className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-slate-900/90 border border-slate-700/70 text-[9px] text-slate-300"
                          >
                      {tag}
                    </span>
                      ))}
                    </div>
                    <div className="mt-2">
                      <Link
                          href={project.href}
                          target="_blank"
                          className="inline-flex items-center gap-1.5 text-[10px] font-medium text-indigo-400 group-hover:text-indigo-300 transition-all"
                      >
                        View details
                        <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
                      </Link>
                    </div>
                  </div>
                  <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-[radial-gradient(circle_at_top,_rgba(79,70,229,0.12),_transparent)]" />
                </motion.div>
            ))}
          </div>
        </div>
      </section>
  )
}