"use client";
import { Button } from "@heroui/react";
import Link from "next/link";
import { FaRobot } from "react-icons/fa";
import { motion } from "motion/react";

const Hero = () => {
    return (
        <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden px-6">
            {/* Background Image Layer */}
            {/* <div 
                className="absolute inset-0 bg-cover bg-center -z-20" 
                style={{ backgroundImage: "url('/bg2.jpg')" }} 
            /> */}
            {/* Dark Overlay for 'dark type' theme */}
            <div className="absolute inset-0 bg-gradient-to-r from-pink-900/10 via-brand-secondary/10 to-transparent -z-10" />
            
            <div className="max-w-5xl text-center space-y-8">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white text-black text-xs font-semibold uppercase tracking-wider"
                >
                    <FaRobot /> The Future of Prompt Engineering
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-5xl md:text-7xl font-extrabold tracking-tight text-black leading-tight"
                >
                    Unlock the Power of AI with {" "}
                    <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
                        Mastered Prompts
                    </span>{" "}
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-black text-lg md:text-xl max-w-3xl mx-auto leading-relaxed"
                >
                    Access thousands of expert-crafted prompts for ChatGPT, Midjourney, and Claude. Elevate your workflow, generate stunning visuals, and achieve professional results instantly.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="flex flex-col sm:flex-row justify-center items-center gap-4"
                >
                    <Link href="/events">
                        <Button
                            className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold h-14 px-8 text-md shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-105 transition-all w-full sm:w-auto"
                            radius="full"
                        >
                            Browse Prompts
                        </Button>
                    </Link>
                    {/* <Link href="/sell-your-prompts">
                        <Button
                            variant="bordered"
                            className="border-white/20 hover:bg-white/10 hover:border-white/30 text-white font-semibold h-14 px-8 text-md w-full sm:w-auto border-2"
                            radius="full"
                        >
                            Become a Creator
                        </Button>
                    </Link> */}
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;