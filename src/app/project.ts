export type Project = {
    title: string
    description: string
    tags: string[]
    href: string
}

export const projects: Project[] = [
    {
        title: "Building Output Analyzer (UPS)",
        description: "React + D3 dashboard with US map, graphs; Node/Express + MySQL.",
        tags: ["React", "D3", "Node", "MySQL"],
        href: "https://github.com/youruser/bmo"
    },
    {
        title: "Smart City Traffic Optimization",
        description: "Reinforcement learning with PPO to reduce congestion on a grid.",
        tags: ["Python", "RL", "SB3"],
        href: "https://github.com/youruser/traffic-rl"
    }
]
