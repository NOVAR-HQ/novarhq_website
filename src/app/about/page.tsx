"use client";
import { motion } from "framer-motion";
import Image from "next/image";

export default function AboutPage() {
  return (
    <motion.div
      className="min-h-screen py-20 px-6 bg-primary text-primary"
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <motion.div
        className="max-w-4xl mx-auto"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-5xl font-bold text-center mb-6">About Novar</h2>
        <p className="text-lg text-secondary text-left">
          Hi, I&apos;m Yousef, the founder of Novar. Ever since I was a kid, I&apos;ve been passionate about creating—whether it was drawing, origami, building props, or making short films. 
          What started as a personal hobby evolved into something much bigger. 
        </p>
      </motion.div>

      {/* Team Image */}
      <motion.div
        className="flex justify-center mt-10"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <Image src="/novar-team.jpg" alt="Novar Team" width={700} height={400} className="rounded-lg shadow-box" />
      </motion.div>

      {/* Core Values Section */}
      <motion.div
        className="mt-16 max-w-4xl mx-auto text-center"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <h2 className="text-4xl font-semibold mb-6">Our Core Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-secondary">
          <div className="p-6 box">
            <h2 className="text-xl font-bold text-accent">Education</h2>
            <p className="mt-2">Sharing knowledge fuels the next generation of creators.</p>
          </div>
          <div className="p-6 box">
            <h2 className="text-xl font-bold text-accent">Innovation</h2>
            <p className="mt-2">We push creative and technological boundaries.</p>
          </div>
          <div className="p-6 box">
            <h2 className="text-xl font-bold text-accent">Collaboration</h2>
            <p className="mt-2">Great things happen when minds work together.</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
