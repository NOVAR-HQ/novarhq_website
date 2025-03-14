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
          Hi, I&apos;m Yousef, the founder of Novar. Ever since I was a kid, I&apos;ve been passionate about creating—whether it was drawing, origami, building props, or making short films. 
          What started as a personal hobby evolved into something much bigger. I&apos;ve always believed that art and technology go hand in hand, and over the years, I have explored the balance between storytelling, craftsmanship, and innovation. 
          It all began with creating cardboard armor in art class and soon evolved into finding ways to enhance cosplays with technology and showcase them through film, ultimately leading me to create Novar —a space where creativity has no limits.
        </motion.p>

        <motion.p 
          className="text-lg text-secondary text-left mt-4"
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          Novar is more than just a brand to me; it&apos;s a vision. Novar is a place where dreamers come together to push the boundaries of what is possible. 
          Whether it&apos;s a 3D-printed gadget, a new pair of jeans, or a robot, Novar is about pushing boundaries to turn ambitious ideas into reality. 
          I want Novar to be the space I wished I had growing up —a place that encourages experimentation, embraces failure, and celebrates creativity. 
          At its core, Novar is about education, innovation, and collaboration. It&apos;s a hub for learning, a platform for creating, and a community where people with ideas can bring them to life.
        </motion.p>

        <motion.p 
          className="text-lg text-secondary text-left mt-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          Join me as I build a future where creativity and technology fuel each other, shaping new possibilities with every project!
        </motion.p>
      </motion.div>

      {/* Team Image */}
      <motion.div
        className="flex justify-center mt-10"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.8 }}
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
        transition={{ duration: 0.6, delay: 1 }}
      >
        <h2 className="text-4xl font-semibold mb-6">Our Core Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-secondary">
          <motion.div
            className="p-6 box"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 1.2 }}
          >
            <h2 className="text-xl font-bold text-accent">Education</h2>
            <p className="mt-2">Sharing knowledge fuels the next generation of creators.</p>
          </motion.div>
          <motion.div
            className="p-6 box"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 1.4 }}
          >
            <h2 className="text-xl font-bold text-accent">Innovation</h2>
            <p className="mt-2">We push creative and technological boundaries.</p>
          </motion.div>
          <motion.div
            className="p-6 box"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 1.6 }}
          >
            <h2 className="text-xl font-bold text-accent">Collaboration</h2>
            <p className="mt-2">Great things happen when minds work together.</p>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}
