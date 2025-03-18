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
      {/* About Section */}
      <motion.div
        className="max-w-4xl mx-auto"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-5xl font-bold text-center mb-6">About Novar</h2>

        <motion.p 
          className="text-lg text-secondary text-left"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Novar bridges the gap between art and technology, providing curious minds with tools, knowledge, and collaboration to turn their ideas into reality. Whether it&apos;s film, cosplay, engineering, or design, Novar is a space where creativity has no limits and where learning happens through practical projects.
        </motion.p>

        <motion.p 
          className="text-lg text-secondary text-left mt-4"
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          Too often, young creatives are discouraged from pursuing artistic passions because they&apos;re seen as impractical or unprofitable, while those in tech often face rigid, theory-heavy learning that lacks creative freedom. But art and technology aren&apos;t opposites—they fuel each other. The most groundbreaking ideas come from the intersection of these fields. That&apos;s why Novar exists: to provide a space for experimentation, collaboration, and skill-building, where learning is both engaging and accessible.
        </motion.p>
      </motion.div>

      {/* Why Novar? */}
      <motion.div
        className="max-w-4xl mx-auto mt-12"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <h2 className="text-4xl font-semibold text-center mb-6">Why Novar?</h2>

        <motion.p 
          className="text-lg text-secondary text-left"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          Novar comes from a personal dream—to create the space I needed growing up. Like many, I was told my hobbies weren&apos;t “worth it,” and I lacked access to the tools that could push my skills further. We couldn&apos;t afford expensive equipment, and there wasn&apos;t a community where I could experiment freely. But I kept going, exploring both fields, and discovered how powerful their combination can be—not just for creating things, but for shaping perspectives, solving problems, and pushing boundaries.
        </motion.p>

        <motion.p 
          className="text-lg text-secondary text-left mt-4"
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
        >
          Novar is my way of building that missing space—a community where artists and innovators can develop their skills, explore new possibilities, and bring their ideas to life.
        </motion.p>
      </motion.div>

      {/* Team Image */}
      <motion.div
        className="flex justify-center mt-10"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 1.2 }}
      >
        <Image 
          src="/novar-team.jpg" 
          alt="Novar Team" 
          width={700} 
          height={400} 
          className="rounded-lg shadow-box" 
        />
      </motion.div>

      {/* Core Values Section */}
      <motion.div
        className="mt-16 max-w-4xl mx-auto text-center"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.4 }}
      >
        <h2 className="text-4xl font-semibold mb-6">Novar&apos;s Core Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-secondary">
        <motion.div
            className="p-6 box"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 2 }}
          >
            <h2 className="text-xl font-bold text-accent">Accessible Learning</h2>
            <p className="mt-2">Knowledge and tools should be available to everyone, not just those who can afford expensive resources. Novar is about sharing skills, making education engaging, and breaking down barriers to entry.</p>
          </motion.div>

          <motion.div
            className="p-6 box"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 1.8 }}
          >
            <h2 className="text-xl font-bold text-accent">Innovation Through Collaboration</h2>
            <p className="mt-2">The best ideas happen when artists, engineers, and makers work together. Novar fosters a space where different perspectives meet to create something bigger than any one person.</p>
          </motion.div>

          <motion.div
            className="p-6 box"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 2.2 }}
          >
            <h2 className="text-xl font-bold text-accent">Building a Supportive Community</h2>
            <p className="mt-2">Novar isn&apos;t just about projects; it&apos;s about people. It&apos;s a space where creators uplift each other, share ideas, and push each other forward.</p>
          </motion.div>

          <motion.div
            className="p-6 box"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 1.6 }}
          >
            <h2 className="text-xl font-bold text-accent">Creativity Without Limits</h2>
            <p className="mt-2">Whether through film, cosplay, technology, or design, Novar is a place to experiment, take risks, and explore new ideas.</p>
          </motion.div>
        </div>
      </motion.div>

      {/* Future Section */}
      <motion.div
        className="max-w-4xl mx-auto mt-12 text-center"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 2.4 }}
      >
        <h2 className="text-4xl font-semibold mb-6">The Future of Novar</h2>
        <p className="text-lg text-secondary">
          Novar is more than just a brand—it&apos;s a movement. A space where creativity and technology fuel each other, shaping new possibilities with every project.
          Whether you&apos;re an artist, a maker, or someone with a wild idea, Novar is here to help bring it to life.
        </p>
        <p className="mt-4 italic">Let&apos;s build the future together!</p>
      </motion.div>
    </motion.div>
  );
}
