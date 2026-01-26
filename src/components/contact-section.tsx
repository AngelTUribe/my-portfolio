import { Mail, Github, Linkedin, Twitter } from "lucide-react"

export default function ContactSection() {
  const socialLinks = [
    { icon: Mail, href: "mailto:angel@example.com", label: "Email" },
    { icon: Github, href: "https://github.com/your-github", label: "GitHub" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/your-linkedin", label: "LinkedIn" },
    { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
  ]

  return (
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-slate-800/70">
        <div className="max-w-2xl mx-auto text-center space-y-12">
          <div className="space-y-4">
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-slate-50">
              Let&apos;s Connect
            </h2>
            <p className="text-lg text-slate-300">
              Have a project in mind or want to talk systems and visualization? Reach out.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-6">
            {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                    key={label}
                    href={href}
                    target={href.startsWith("mailto:") ? undefined : "_blank"}
                    rel={href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                    className="inline-flex flex-col items-center gap-2 p-4 rounded-2xl bg-slate-900/70 border border-slate-700/80 hover:border-indigo-400/70 hover:bg-slate-900/90 transition-all backdrop-blur-xl shadow-[0_18px_70px_rgba(2,6,23,0.9)] group"
                >
                  <Icon
                      size={28}
                      className="text-slate-300 group-hover:text-indigo-300 transition-colors"
                  />
                  <span className="text-sm font-medium text-slate-300 group-hover:text-slate-50 transition-colors">
                {label}
              </span>
                </a>
            ))}
          </div>

          <div className="pt-8 border-t border-slate-800/70">
            <p className="text-sm text-slate-500">
              © {new Date().getFullYear()} Angel Uribe.
            </p>
          </div>
        </div>
      </section>
  )
}
