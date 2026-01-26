import Link from "next/link"
import { ArrowRight } from "lucide-react"

interface Project {
    id: string
    title: string
    description: string
    tags: string[]
    link: string
}

interface ProjectsGridProps {
    projects: Project[]
}

export default function ProjectsGrid({ projects }: ProjectsGridProps) {
    return (
        <section className="w-full px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
            <div className="max-w-6xl mx-auto">
                <div className="mb-12">
                    <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-2">Featured Projects</h2>
                    <p className="text-lg text-muted-foreground">A selection of my recent work</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.map((project) => (
                        <div
                            key={project.id}
                            className="group relative bg-card border border-border rounded-lg overflow-hidden hover:border-primary/50 transition-colors duration-300"
                        >
                            <div className="p-6 flex flex-col h-full">
                                <div className="flex-1">
                                    <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                                        {project.title}
                                    </h3>
                                    <p className="text-muted-foreground text-sm mb-4 leading-relaxed">{project.description}</p>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex flex-wrap gap-2">
                                        {project.tags.map((tag) => (
                                            <span
                                                key={tag}
                                                className="inline-block px-3 py-1 text-xs font-medium bg-secondary text-secondary-foreground rounded-full"
                                            >
                        {tag}
                      </span>
                                        ))}
                                    </div>

                                    <Link
                                        href={project.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 text-primary hover:gap-3 transition-all font-medium text-sm"
                                    >
                                        View <ArrowRight size={16} />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
