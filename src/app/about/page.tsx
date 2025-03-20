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
          Novar is where art meets technology —where curious minds gain the tools, knowledge, and community to transform ideas into reality. Whether it&apos;s film, cosplay, engineering, or design, Novar is a space where creativity has no limits and learning happens through hands-on projects.
        </motion.p>
      </motion.div>

      {/* What Novar Offers */}
      <motion.div
        className="max-w-4xl mx-auto mt-12 text-center"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1 }}
      >
        <h2 className="text-4xl font-semibold text-center mb-6">
          What Novar Offers
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-secondary">
          <motion.div
            className="p-6 box"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 1.2 }}
          >
            <h2 className="text-xl font-bold text-accent">
            Community & Collaboration
            </h2>
            <p className="mt-2">
            A space where thinkers and creators alike connect, share ideas, and collaborate on innovative projects.
            </p>
          </motion.div>

          <motion.div
            className="p-6 box"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 1.4 }}
          >
            <h2 className="text-xl font-bold text-accent">
            Prop-Making & Cosplay
            </h2>
            <p className="mt-2">
            High-quality custom props, costumes, and wearable tech that blend craftsmanship with innovation.
            </p>
          </motion.div>

          <motion.div
            className="p-6 box"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 1.6 }}
          >
            <h2 className="text-xl font-bold text-accent">
            Filmmaking & Visual Arts
            </h2>
            <p className="mt-2">
            Film production, photoshoot and post-production to bring ideas to life through film.
            </p>
          </motion.div>

          <motion.div
            className="p-6 box"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 1.8 }}
          >
            <h2 className="text-xl font-bold text-accent">
              Workshops & Tutorials
            </h2>
            <p className="mt-2">
            Hands-on workshops, tutorials, and guides that teach cosplay, filmmaking, prop-making, and tech integration.
            </p>
          </motion.div>
        </div>
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
          Too often, young creatives are discouraged from pursuing artistic passions because they&apos;re seen as impractical, sometimes forcing them into theory-heavy learning that stifles creativity. But art and technology aren&apos;t opposites —they fuel each other. The most groundbreaking innovations emerge from their intersection.
        </motion.p>
      </motion.div>

      {/* Core Values Section */}
      <motion.div
        className="mt-16 max-w-4xl mx-auto text-center"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.4 }}
      >
        <h2 className="text-4xl font-semibold mb-6">Novar&apos;s Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-secondary">
          
        <motion.div className="p-6 box" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
            <h2 className="text-xl font-bold text-accent">Collaborate</h2>
            <p className="mt-2">The best ideas come from diverse minds working together. Novar fosters a space where artists, engineers, and makers combine skills to create something bigger than any one person.</p>
          </motion.div>

          <motion.div className="p-6 box" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
            <h2 className="text-xl font-bold text-accent">Create</h2>
            <p className="mt-2">Novar isn&apos;t just about making projects —it&apos;s about building a movement. A space where creators inspire each other, push boundaries, and evolve into their best selves.</p>
          </motion.div>

          <motion.div className="p-6 box" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
            <h2 className="text-xl font-bold text-accent">Innovate</h2>
            <p className="mt-2">Exploration is at the heart of progress. Whether in film, cosplay, tech, or design, Novar encourages risk-taking, experimentation, and bold new ideas.</p>
          </motion.div>
          
          <motion.div className="p-6 box" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
            <h2 className="text-xl font-bold text-accent">Empower</h2>
            <p className="mt-2">Creativity shouldn&apos;t be limited by resources. Novar provides knowledge, tools, and opportunities to help artists and innovators bring their ideas to life.</p>
          </motion.div>
      
        </div>
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

      {/* Future Section */}
      <motion.div
        className="max-w-4xl mx-auto mt-12 text-center"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 2.4 }}
      >
        <h2 className="text-4xl font-semibold mb-6">Join the Movement</h2>
        <p className="text-lg text-secondary">
          Novar is more than just a brand—it&apos;s a movement. A space where art and technology fuel each other, shaping new possibilities with every project. Whether you&apos;re an artist, a maker, or someone with a bold idea, Novar is here to help bring YOUR vision to life.
        </p>
        <p className="mt-4 italic">Let&apos;s build the future together!</p>
      </motion.div>
    </motion.div>
  );
}
