'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Preloader() {
    const [complete, setComplete] = useState(false);

    useEffect(() => {
        // Prevent scrolling during animation
        document.body.style.overflow = 'hidden';

        const timer = setTimeout(() => {
            setComplete(true);
            document.body.style.overflow = '';
        }, 3500); // Extended time to fully appreciate the animation

        return () => {
            document.body.style.overflow = '';
            clearTimeout(timer);
        };
    }, []);

    return (
        <AnimatePresence mode="wait">
            {!complete && (
                <>
                    {/* Green Layer (Background Reveal) */}
                    <motion.div
                        key="green-layer"
                        initial={{ y: 0 }}
                        exit={{
                            y: "-100%",
                            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.2 }
                        }}
                        className="fixed inset-0 z-[90] bg-[#A8E524]"
                    />

                    {/* Black Layer (Top) */}
                    <motion.div
                        key="black-layer"
                        initial={{ y: 0 }}
                        exit={{
                            y: "-100%",
                            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
                        }}
                        className="fixed inset-0 z-[100] bg-[#0a0a0a] flex items-center justify-center"
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5 }}
                        >
                            {/* SVG A Logo */}
                            <svg
                                viewBox="0 0 420 400"
                                className="w-[300px] h-[285px] md:w-[480px] md:h-[456px]"
                                style={{
                                    filter: 'drop-shadow(0 0 30px rgba(168, 229, 36, 0.4))'
                                }}
                            >
                                {/* Main Right/Top Part of A */}
                                <motion.path
                                    d="M420 400L274.787 338.298L154.149 102.128L207.766 0L420 400Z"
                                    stroke="#A8E524"
                                    strokeWidth="5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    initial={{
                                        pathLength: 0,
                                        fill: "rgba(168, 229, 36, 0)"
                                    }}
                                    animate={{
                                        pathLength: 1,
                                        fill: "rgba(168, 229, 36, 1)"
                                    }}
                                    transition={{
                                        pathLength: { duration: 2.5, ease: "easeInOut" },
                                        fill: { duration: 0.5, delay: 2.5 }
                                    }}
                                />
                                {/* Bottom Left Part of A */}
                                <motion.path
                                    d="M0 400L75.9573 253.191H187.659L142.978 342.553L0 400Z"
                                    stroke="#A8E524"
                                    strokeWidth="5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    initial={{
                                        pathLength: 0,
                                        fill: "rgba(168, 229, 36, 0)"
                                    }}
                                    animate={{
                                        pathLength: 1,
                                        fill: "rgba(168, 229, 36, 1)"
                                    }}
                                    transition={{
                                        pathLength: { duration: 2.5, ease: "easeInOut" },
                                        fill: { duration: 0.5, delay: 2.5 }
                                    }}
                                />
                            </svg>
                        </motion.div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
