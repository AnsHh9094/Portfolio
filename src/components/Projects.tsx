"use client";

import { motion } from "framer-motion";

interface Project {
    id: number;
    title: string;
    category: string;
    description: string;
    tags: string[];
    link: string;
    color: string;
    image: string;
}

const projects: Project[] = [
    {
        id: 1,
        title: "Ghost Type",
        category: "Productivity • Tool",
        description: "A clean and minimalist typing speed test application. Improve your wpm with style.",
        tags: ["React", "Vite", "Tailwind", "Framer Motion"],
        link: "https://github.com/AnsHh9094/ghost-type",
        color: "#A8E524",
        image: "/projects/ghost_type.png"
    },
    {
        id: 2,
        title: "Eve AI",
        category: "AI • Assistant",
        description: "Your personal AI assistant built for efficiency and intelligence. Powered by advanced LLMs.",
        tags: ["Next.js", "AI", "OpenAI", "Tailwind"],
        link: "https://github.com/AnsHh9094/eve.ai",
        color: "#A8E524",
        image: "/projects/eve_ai.png"
    },
    {
        id: 3,
        title: "Animex",
        category: "Entertainment",
        description: "Anime streaming and discovery platform. Explore your favorite series in one place.",
        tags: ["React", "API", "CSS Modules"],
        link: "https://github.com/AnsHh9094/Animex",
        color: "#A8E524",
        image: "/projects/animex.png"
    },
    {
        id: 4,
        title: "Foocuss AI",
        category: "Productivity",
        description: "Master your focus with AI-driven Pomodoro timer and task management.",
        tags: ["React", "AI", "Productivity"],
        link: "https://github.com/AnsHh9094/foocuss-ai",
        color: "#A8E524",
        image: "/projects/foocuss.png"
    },
    {
        id: 5,
        title: "CertifiGen",
        category: "Utility • Design",
        description: "Generate professional certificates instantly with customizable templates.",
        tags: ["React", "Canvas", "PDF Generation"],
        link: "https://github.com/AnsHh9094/certificate-gen",
        color: "#A8E524",
        image: "/projects/cert_gen.png"
    },
    {
        id: 6,
        title: "TubeGrab",
        category: "Utility • Media",
        description: "Fast and simple YouTube video downloader with multiple format support.",
        tags: ["Python", "Flask", "FFmpeg"],
        link: "https://github.com/AnsHh9094/youTubeDownloader",
        color: "#A8E524",
        image: "/projects/tubegrab.png"
    }
];

function ProjectCard({ project, index }: { project: Project; index: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group relative w-full aspect-[4/3] bg-[#111] overflow-hidden cursor-pointer"
            style={{
                clipPath: "polygon(0% 0%, 100% 0%, 100% 85%, 85% 100%, 0% 100%)", // Custom shape from reference
            }}
        >
            {/* Project Image */}
            <div className="absolute inset-0 bg-zinc-900 group-hover:scale-110 transition-transform duration-700 ease-out">
                <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-60 transition-opacity duration-500"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
            </div>

            {/* Initial Bottom Label (Green Box) */}
            <div className="absolute bottom-8 left-8 bg-[#A8E524] px-4 py-2 text-black font-bold uppercase tracking-wider text-sm transition-all duration-500 transform group-hover:translate-y-20 group-hover:opacity-0 clip-path-polygon">
                {project.title}
            </div>

            {/* Hover Overlay Content */}
            <div className="absolute inset-0 bg-black/80 backdrop-blur-md flex flex-col justify-end p-8 opacity-0 translate-y-10 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-out">
                <h3 className="text-3xl font-bold text-white mb-2">{project.title}</h3>
                <span className="text-[#A8E524] text-sm uppercase tracking-widest mb-4 font-semibold">{project.category}</span>
                <p className="text-gray-400 mb-6 line-clamp-2">{project.description}</p>

                <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.slice(0, 4).map(tag => (
                        <span key={tag} className="text-xs px-2 py-1 border border-white/20 rounded-full text-white/70">
                            {tag}
                        </span>
                    ))}
                </div>

                <a
                    href={project.link}
                    className="inline-flex items-center gap-2 text-[#A8E524] font-bold uppercase tracking-wider hover:gap-4 transition-all"
                >
                    View Project
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                </a>
            </div>
        </motion.div>
    );
}

export default function Projects() {
    return (
        <section id="projects" className="bg-[#0a0a0a] py-24 px-4 w-full flex flex-col items-center">
            {/* Title Section */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center mb-20"
            >
                <h2 className="text-6xl md:text-8xl font-bold text-white tracking-tight opacity-90 font-mono">
                    Projects
                </h2>
            </motion.div>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-7xl px-4">
                {projects.map((project, index) => (
                    <ProjectCard key={project.id} project={project} index={index} />
                ))}
            </div>
        </section>
    );
}
