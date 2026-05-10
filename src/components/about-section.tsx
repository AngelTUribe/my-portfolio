export default function AboutSection() {
  return (
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="flex justify-center md:justify-start">
              <img
                  src="./headshot.jpg"
                  alt="Profile headshot"
                  className="w-full max-w-sm rounded-lg object-cover border border-slate-700/70 bg-slate-900/70 backdrop-blur-xl shadow-[0_18px_70px_rgba(2,6,23,0.95)]"
              />
            </div>

            <div className="space-y-6">
              <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-slate-50">
                About Me
              </h2>
              <p className="text-lg text-slate-300 leading-relaxed">
               I’m currently studying Computer Science at UGA, where I spend a lot of my time bridging the gap between low-level systems and high-end visualization.
              </p>
              <p className="text-lg text-slate-300 leading-relaxed">
                When I'm not writing React or D3 for analytics dashboards, you can probably find me debugging C projects on the odin server or using everything I learned in computer architecture.
              </p>
              <div className="pt-4">
                <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wide mb-4">
                  Tech Stack
                </h3>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Next.js",
                    "TypeScript",
                    "React",
                    "Tailwind CSS",
                    "Node.js",
                    "PostgreSQL",
                    "D3.js",
                  ].map((tech) => (
                      <span
                          key={tech}
                          className="px-4 py-2 rounded-full bg-slate-900/70 border border-slate-700/70 text-slate-200 text-sm font-medium backdrop-blur-xl"
                      >
                    {tech}
                  </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
  )
}
