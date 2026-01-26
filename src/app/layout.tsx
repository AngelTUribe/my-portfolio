import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import InteractiveBackground from "@/components/interactive-background"

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
})

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
})

export const metadata: Metadata = {
    title: "Angel Uribe – Portfolio",
    description: "Software engineer and data visualization.",
}

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" className="h-full">
        <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#020817] text-slate-100 relative min-h-screen`}
        >
        <InteractiveBackground />
        <div className="relative z-10">
            {children}
        </div>
        </body>
        </html>
    )
}
