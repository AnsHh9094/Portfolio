'use client';

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    return (
        <>
            <nav className="fixed top-0 left-0 w-full z-[90] pointer-events-none">
                <div className="absolute top-4 left-8 pointer-events-auto">
                    <motion.button
                        onClick={() => {
                            window.location.href = "/";
                        }}
                        whileTap={{ scale: 0.95, rotate: -12 }}
                        className="p-2 bg-black/50 backdrop-blur-md rounded-full shadow-md border border-white/5 group hover:border-[#A8E524]/50 transition-colors duration-300"
                    >
                        <svg
                            viewBox="0 0 420 400"
                            className="w-8 h-8 md:w-10 md:h-10 text-[#A8E524]"
                        >
                            <path d="M420 400L274.787 338.298L154.149 102.128L207.766 0L420 400Z" fill="currentColor" />
                            <path d="M0 400L75.9573 253.191H187.659L142.978 342.553L0 400Z" fill="currentColor" />
                        </svg>
                    </motion.button>
                </div>
            </nav>

            {/* Floating Navigation Rail */}
            <div className="fixed right-8 top-8 z-[100] flex flex-col items-end gap-6">

                {/* Toggle Button */}
                <motion.button
                    onClick={toggleMenu}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-14 h-14 bg-[#3B82F6] rounded-full text-white shadow-xl shadow-blue-500/20 flex items-center justify-center z-50 relative"
                >
                    <motion.div
                        animate={isMenuOpen ? "open" : "closed"}
                        variants={{
                            open: { rotate: 180 },
                            closed: { rotate: 0 }
                        }}
                    >
                        {isMenuOpen ? (
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                        ) : (
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" /></svg>
                        )}
                    </motion.div>
                </motion.button>

                {/* Menu Items */}
                <motion.div
                    initial="closed"
                    animate={isMenuOpen ? "open" : "closed"}
                    variants={{
                        open: {
                            visibility: "visible",
                            transition: { staggerChildren: 0.1, delayChildren: 0.2 }
                        },
                        closed: {
                            visibility: "hidden",
                            transition: { staggerChildren: 0.05, staggerDirection: -1, when: "afterChildren" }
                        }
                    }}
                    className="flex flex-col gap-4 absolute top-20 right-1"
                >
                    {[
                        {
                            id: "home",
                            icon: <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />,
                            href: "/",
                            label: "Home"
                        },
                        {
                            id: "projects",
                            icon: <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />,
                            href: "#projects",
                            label: "Projects"
                        },
                        {
                            id: "github",
                            icon: <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />,
                            href: "https://github.com/AnsHh9094",
                            target: "_blank",
                            label: "GitHub"
                        },
                        {
                            id: "contact",
                            icon: <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />,
                            href: "mailto:anshanand904@gmail.com",
                            label: "Contact"
                        },
                    ].map((item) => (
                        <motion.div
                            key={item.id}
                            variants={{
                                open: { opacity: 1, y: 0, scale: 1 },
                                closed: { opacity: 0, y: -20, scale: 0.5 }
                            }}
                            className="flex items-center justify-end gap-4 group"
                        >
                            <span className="bg-black/80 backdrop-blur-md text-white/90 text-sm font-medium px-3 py-1 rounded-lg border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity -mr-2 shadow-xl pointer-events-none">
                                {item.label}
                            </span>
                            <a
                                href={item.href}
                                target={item.target}
                                className="w-12 h-12 bg-[#3B82F6] rounded-full text-white shadow-lg flex items-center justify-center hover:bg-white hover:text-[#3B82F6] transition-colors relative z-50 border-2 border-transparent hover:border-[#3B82F6]"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                                    {item.icon}
                                </svg>
                            </a>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </>
    );
}
