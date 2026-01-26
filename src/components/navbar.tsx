"use client"

import { motion } from "framer-motion"
import Link from "next/link"

const links = [
    { href: "#top", label: "Home" },
    { href: "#projects", label: "Projects" },
    { href: "#about", label: "About" },
    { href: "#contact", label: "Contact" },
]

export default function Navbar() {
    const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, href: string) => {
        if (href.startsWith("#")) {
            e.preventDefault()
            const id = href.slice(1)
            const el = document.getElementById(id)
            if (el) {
                const y = el.getBoundingClientRect().top + window.scrollY - 80
                window.scrollTo({ top: y, behavior: "smooth" })
            }
        }
    }

    return (
        <motion.header
            initial={{ y: -40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-x-0 top-0 z-40 flex justify-center"
        >
            <div className="mt-4 flex items-center gap-6 rounded-full border border-slate-700/60 bg-slate-900/70 px-6 py-2.5 backdrop-blur-xl shadow-[0_18px_70px_rgba(15,23,42,0.7)]">
        <span className="text-xs font-semibold tracking-[0.18em] uppercase text-slate-300">
          Angel Uribe
        </span>
                <nav className="flex items-center gap-4 text-xs text-slate-300">
                    {links.map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            onClick={(e) => handleClick(e, link.href)}
                            className="px-2 py-1 rounded-full hover:bg-slate-800/90 hover:text-slate-50 transition-colors"
                        >
                            {link.label}
                        </a>
                    ))}
                </nav>
            </div>
        </motion.header>
    )
}
