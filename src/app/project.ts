export type Project = {
    title: string
    description: string
    tags: string[]
    href: string
}

export const projects: Project[] = [
    {
        title: "Building Output Analyzer (UPS)",
        description: "An internal analytics dashboard built for UPS to visualize outbound volume. I used D3.js and React to map data and show the distribution of packages across the country with interactive maps, line charts, and anomaly surfacing.",
        tags: ["React", "D3", "Node", "MySQL"],
        href: "https://docs.google.com/presentation/d/1U0gAiyFit29W713CHxUmyj0MLZzQ3jQR/edit?usp=sharing&ouid=114224006013548134712&rtpof=true&sd=true"
    },
    {
        title: "Smart City Traffic Optimization",
        description: "A machine learning simulation that uses PPO (Proximal Policy Optimization) to coordinate traffic lights and actively reduce gridlock in a virtual city.",
        tags: ["Python", "RL", "SB3"],
        href: "https://github.com/YOUR_GITHUB_USERNAME/YOUR_TRAFFIC_REPO"
    },
    {
        title: "Interactive Portfolio",
        description: "The very site you are on right now believe it or not! I built it with Next.js, Framer Motion, and a custom interactive 3D particle physics engine.",
        tags: ["Next.js", "TypeScript", "Tailwind CSS"],
        href: "https://github.com/AngelTUribe/my-portfolio"
    }
]