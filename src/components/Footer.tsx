'use client';

import { motion } from "framer-motion";
import React from "react";

export default function Footer() {
    const [email, setEmail] = React.useState("");

    const handleEmailSubmit = () => {
        if (!email) return;
        window.location.href = `mailto:anshanand904@gmail.com?subject=Project Inquiry&body=Hi Ansh,%0D%0A%0D%0AI'm interested in working with you. You can reach me at: ${email}`;
    };

    return (
        <footer className="w-full bg-[#0a0a0a] pt-20 pb-10 px-4 overflow-hidden relative">

            {/* CTA Section */}
            <div className="max-w-7xl mx-auto mb-32 relative">
                {/* Green ambient glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#A8E524]/20 blur-[120px] rounded-full pointer-events-none" />

                <div className="flex flex-col items-center text-center relative z-10">
                    <h2 className="text-5xl md:text-8xl font-bold text-white tracking-tight mb-8">
                        Let's create <br />
                        <span className="text-[#A8E524]">great things</span> <br />
                        together
                    </h2>

                    {/* Email Input */}
                    <div className="w-full max-w-md relative mt-8">
                        <input
                            type="email"
                            placeholder="Enter your email address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleEmailSubmit()}
                            className="w-full bg-white/5 border border-white/10 rounded-full py-4 px-8 text-white placeholder-gray-500 focus:outline-none focus:border-[#A8E524] backdrop-blur-sm transition-colors"
                        />
                        <button
                            onClick={handleEmailSubmit}
                            className="absolute right-2 top-2 bg-[#A8E524] p-2 rounded-full hover:scale-110 transition-transform"
                        >
                            <svg className="w-5 h-5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Contact & Links Section */}
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-end justify-between border-t border-white/10 pt-10">

                {/* Contact Circles */}
                <div className="flex gap-4 mb-10 md:mb-0">
                    <motion.a
                        href="mailto:anshanand904@gmail.com"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-[#A8E524] flex items-center justify-center flex-col text-black font-bold text-lg leading-tight group cursor-pointer"
                    >
                        <span>Message</span>
                        <span>Me</span>
                        <svg className="w-5 h-5 mt-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </motion.a>

                    <motion.a
                        href="tel:9643263344"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-white flex items-center justify-center flex-col text-black font-bold text-lg leading-tight group cursor-pointer"
                    >
                        <span>Book a</span>
                        <span>Meeting</span>
                        <svg className="w-5 h-5 mt-2 group-hover:-rotate-45 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </motion.a>
                </div>

                {/* Links */}
                <div className="flex flex-col md:flex-row gap-8 md:gap-16 text-zinc-400">
                    <div className="flex flex-col gap-4">
                        <span className="text-white font-bold uppercase tracking-wider mb-2">Socials</span>
                        <a href="https://www.linkedin.com/in/anand-ansh-411073293/" target="_blank" rel="noopener noreferrer" className="hover:text-[#A8E524] transition-colors">LinkedIn</a>
                        <a href="https://github.com/AnsHh9094" target="_blank" rel="noopener noreferrer" className="hover:text-[#A8E524] transition-colors">GitHub</a>
                        <a href="https://www.instagram.com/the_anshanand/" target="_blank" rel="noopener noreferrer" className="hover:text-[#A8E524] transition-colors">Instagram</a>
                    </div>
                    <div className="flex flex-col gap-4">
                        <span className="text-white font-bold uppercase tracking-wider mb-2">Sitemap</span>
                        <a href="#" className="hover:text-[#A8E524] transition-colors">Home</a>
                        <a href="#" className="hover:text-[#A8E524] transition-colors">About</a>
                        <a href="#" className="hover:text-[#A8E524] transition-colors">Projects</a>
                        <div className="flex flex-col gap-1">
                            <span className="text-white">Contact</span>
                            <a href="mailto:anshanand904@gmail.com" className="hover:text-[#A8E524] transition-colors text-sm">anshanand904@gmail.com</a>
                            <a href="tel:9643263344" className="hover:text-[#A8E524] transition-colors text-sm">+91 9643263344</a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Copyright */}
            <div className="max-w-7xl mx-auto mt-20 text-center md:text-left text-zinc-600 text-sm">
                © 2024 Ansh. All rights reserved.
            </div>

        </footer>
    );
}
