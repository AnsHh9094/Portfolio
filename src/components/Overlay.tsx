"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface TextSectionProps {
    children: React.ReactNode;
    scrollStart: number;
    scrollEnd: number;
    alignment?: "left" | "center" | "right";
    parallaxOffset?: number;
}

function TextSection({
    children,
    scrollStart,
    scrollEnd,
    alignment = "center",
    parallaxOffset = 100,
}: TextSectionProps) {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll();

    const opacity = useTransform(
        scrollYProgress,
        [scrollStart - 0.05, scrollStart, scrollStart + 0.1, scrollEnd - 0.05, scrollEnd],
        [0, 1, 1, 1, 0]
    );

    const y = useTransform(
        scrollYProgress,
        [scrollStart - 0.1, scrollStart, scrollEnd],
        [parallaxOffset, 0, -parallaxOffset * 0.5]
    );

    const scale = useTransform(
        scrollYProgress,
        [scrollStart - 0.05, scrollStart, scrollEnd - 0.05, scrollEnd],
        [0.9, 1, 1, 0.95]
    );

    const alignmentClasses = {
        left: "items-start text-left pl-8 md:pl-16 lg:pl-24",
        center: "items-center text-center",
        right: "items-end text-right pr-8 md:pr-16 lg:pr-24",
    };

    return (
        <motion.div
            ref={ref}
            style={{ opacity, y, scale }}
            className={`fixed inset-0 z-10 flex flex-col justify-center pointer-events-none ${alignmentClasses[alignment]}`}
        >
            {children}
        </motion.div>
    );
}

export default function Overlay() {
    const { scrollYProgress } = useScroll();

    // Scroll indicator fades out after user starts scrolling
    const scrollIndicatorOpacity = useTransform(
        scrollYProgress,
        [0, 0.02],
        [1, 0]
    );

    return (
        <div className="fixed inset-0 z-10 pointer-events-none">
            {/* Section 1: Hero - 0% to 20% scroll */}
            <TextSection scrollStart={0} scrollEnd={0.18} alignment="center" parallaxOffset={80}>
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="px-4"
                >
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-4 tracking-tight">
                        <span className="gradient-text">Ansh.</span>
                    </h1>
                    <p className="text-xl md:text-2xl lg:text-3xl text-zinc-400 font-light">
                        Full Stack Web Developer
                    </p>
                </motion.div>
            </TextSection>

            {/* Scroll Indicator - only visible at very top */}
            <motion.div
                style={{ opacity: scrollIndicatorOpacity }}
                className="fixed bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
            >
                <span className="text-xs text-zinc-600 uppercase tracking-widest">Scroll</span>
                <motion.div
                    animate={{ y: [0, 6, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    className="w-5 h-8 border border-zinc-700 rounded-full flex justify-center pt-1.5"
                >
                    <motion.div className="w-1 h-1 bg-zinc-500 rounded-full" />
                </motion.div>
            </motion.div>

            {/* Section 2: Statement - 25% to 40% scroll */}
            <TextSection scrollStart={0.22} scrollEnd={0.38} alignment="left" parallaxOffset={120}>
                <div className="max-w-2xl">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
                        I build{" "}
                        <span className="gradient-text">digital experiences</span>
                        <span className="text-zinc-600">.</span>
                    </h2>
                    <p className="text-base md:text-lg text-zinc-500 font-light leading-relaxed">
                        From responsive UIs to scalable full-stack applications.
                    </p>
                </div>
            </TextSection>

            {/* Section 3: Skills - 45% to 60% scroll */}
            <TextSection scrollStart={0.42} scrollEnd={0.58} alignment="right" parallaxOffset={100}>
                <div className="max-w-2xl">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
                        Bridging{" "}
                        <span className="text-lime-400">design</span>
                        <br />
                        and <span className="text-white">code</span>
                        <span className="text-lime-500">.</span>
                    </h2>
                    <p className="text-base md:text-lg text-zinc-500 font-light leading-relaxed">
                        React • Next.js • TypeScript • Node.js
                    </p>
                </div>
            </TextSection>

            {/* Section 4: Call to action - 65% to 82% scroll */}
            <TextSection scrollStart={0.62} scrollEnd={0.8} alignment="center" parallaxOffset={60}>
                <div className="text-center px-4">
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3">
                        <span className="gradient-text">See my work</span>
                    </h2>
                    <motion.div
                        animate={{ y: [0, 8, 0] }}
                        transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
                        className="mt-4"
                    >
                        <svg
                            className="w-6 h-6 mx-auto text-zinc-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 14l-7 7m0 0l-7-7m7 7V3"
                            />
                        </svg>
                    </motion.div>
                </div>
            </TextSection>
        </div>
    );
}
