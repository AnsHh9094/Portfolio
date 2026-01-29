"use client";

import { useEffect, useRef, useState } from "react";
import { useScroll, useTransform, motion, useMotionValueEvent } from "framer-motion";

const TOTAL_FRAMES = 120;

// Generate frame paths
const getFramePath = (index: number): string => {
    const frameNumber = index.toString().padStart(3, "0");
    return `/sequence/frame_${frameNumber}.png`;
};

export default function ScrollyCanvas() {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [loadProgress, setLoadProgress] = useState(0);
    const [isScrollComplete, setIsScrollComplete] = useState(false);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    const frameIndex = useTransform(scrollYProgress, [0, 1], [0, TOTAL_FRAMES - 1]);

    // Track when scroll is complete
    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        setIsScrollComplete(latest >= 0.95);
    });

    // Preload images
    useEffect(() => {
        const loadImages = async () => {
            const loadedImages: HTMLImageElement[] = [];
            let loadedCount = 0;

            const loadPromises = Array.from({ length: TOTAL_FRAMES }, (_, i) => {
                return new Promise<HTMLImageElement>((resolve, reject) => {
                    const img = new Image();
                    img.onload = () => {
                        loadedCount++;
                        setLoadProgress(Math.round((loadedCount / TOTAL_FRAMES) * 100));
                        resolve(img);
                    };
                    img.onerror = reject;
                    img.src = getFramePath(i);
                });
            });

            try {
                const results = await Promise.all(loadPromises);
                loadedImages.push(...results);
                setImages(loadedImages);
                setIsLoaded(true);
            } catch (error) {
                console.error("Failed to load images:", error);
            }
        };

        loadImages();
    }, []);

    // Draw frames on canvas
    useEffect(() => {
        if (!isLoaded || images.length === 0) return;

        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Handle resize
        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            drawFrame(Math.round(frameIndex.get()));
        };

        const drawFrame = (index: number) => {
            const img = images[Math.min(Math.max(index, 0), images.length - 1)];
            if (!img) return;

            const canvas = canvasRef.current;
            if (!canvas) return;

            const ctx = canvas.getContext("2d");
            if (!ctx) return;

            // Clear canvas with background color
            ctx.fillStyle = "#0a0a0a";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Source dimensions (use full image, but crop bottom watermark)
            const watermarkHeight = 40; // Approx height of VEO watermark

            const sourceX = 0;
            const sourceY = 0;
            const sourceWidth = img.width;
            const sourceHeight = img.height - watermarkHeight;

            // Calculate scaling to CONTAIN the image (fit fully visible, head to toe)
            // Using Math.min ensures the entire image fits within the viewport without cropping main content
            const scale = Math.min(canvas.width / sourceWidth, canvas.height / sourceHeight);

            const drawWidth = sourceWidth * scale;
            const drawHeight = sourceHeight * scale;

            // Center horizontally and vertically
            const offsetX = (canvas.width - drawWidth) / 2;
            const offsetY = (canvas.height - drawHeight) / 2;

            // Draw the image with bottom cropped out
            ctx.drawImage(
                img,
                sourceX, sourceY, sourceWidth, sourceHeight,
                offsetX, offsetY, drawWidth, drawHeight
            );
        };

        handleResize();
        window.addEventListener("resize", handleResize);

        const unsubscribe = frameIndex.on("change", (value) => {
            drawFrame(Math.round(value));
        });

        return () => {
            window.removeEventListener("resize", handleResize);
            unsubscribe();
        };
    }, [isLoaded, images, frameIndex]);

    return (
        <div ref={containerRef} className="relative h-[500vh]">
            {/* Loading screen with Logo Animation */}
            <motion.div
                initial={{ opacity: 1 }}
                animate={{ opacity: isLoaded ? 0 : 1 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#050505] ${isLoaded ? "pointer-events-none" : ""}`}
            >
                <div className="relative flex flex-col items-center">
                    {/* Animated Logo - Exact Replica */}
                    <motion.svg
                        width="140"
                        height="140"
                        viewBox="0 0 420 400"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        initial="hidden"
                        animate="visible"
                    >
                        {/* Right side/Main body of the 'A' */}
                        <motion.path
                            d="M420 400L274.787 338.298L154.149 102.128L207.766 0L420 400Z"
                            stroke="#A8E524"
                            strokeWidth="4"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            variants={{
                                hidden: { pathLength: 0, fill: "rgba(168, 229, 36, 0)" },
                                visible: {
                                    pathLength: 1,
                                    fill: "rgba(168, 229, 36, 1)",
                                    transition: {
                                        pathLength: { duration: 1.5, ease: "easeInOut" },
                                        fill: { duration: 0.4, delay: 1.5, ease: "easeOut" }
                                    }
                                }
                            }}
                        />
                        {/* Left side of the 'A' */}
                        <motion.path
                            d="M0 400L75.9573 253.191H187.659L142.978 342.553L0 400Z"
                            stroke="#A8E524"
                            strokeWidth="4"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            variants={{
                                hidden: { pathLength: 0, fill: "rgba(168, 229, 36, 0)" },
                                visible: {
                                    pathLength: 1,
                                    fill: "rgba(168, 229, 36, 1)",
                                    transition: {
                                        pathLength: { duration: 1.5, ease: "easeInOut" },
                                        fill: { duration: 0.4, delay: 1.5, ease: "easeOut" }
                                    }
                                }
                            }}
                        />
                    </motion.svg>

                    {/* Visual Loading Text */}
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 2.0, duration: 0.5 }} // Delay until after drawing finishes
                        className="mt-6 text-[#A8E524] font-medium tracking-widest text-xs uppercase"
                    >
                        Loading Experience
                    </motion.p>
                </div>
            </motion.div>

            {/* Sticky canvas container - fades out when scroll is complete */}
            <motion.div
                className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden"
                animate={{
                    opacity: isScrollComplete ? 0 : 1,
                }}
                transition={{ duration: 0.3 }}
                style={{
                    pointerEvents: isScrollComplete ? "none" : "auto",
                }}
            >
                <canvas
                    ref={canvasRef}
                    className="absolute inset-0 w-full h-full"
                    style={{ background: "#0a0a0a" }}
                />
            </motion.div>
        </div>
    );
}
