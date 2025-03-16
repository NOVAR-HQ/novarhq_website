"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { db } from "@/firebase/firebaseConfig";
import { collection, query, orderBy, getDocs } from "firebase/firestore";

interface PortfolioPost {
  id: string;
  title: string;
  description: string;
  creator?: string; // Added creator field
  imageUrl?: string;
  link?: string;
}

export default function PortfolioPage() {
  const [projects, setProjects] = useState<PortfolioPost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const querySnapshot = await getDocs(
          query(collection(db, "portfolio_posts"), orderBy("timestamp", "desc"))
        );
        const fetchedProjects: PortfolioPost[] = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data() as Omit<PortfolioPost, "id">, // Fetching all fields, including `creator`
        }));
        setProjects(fetchedProjects);
      } catch (error) {
        console.error("Error fetching portfolio projects:", error);
      }
      setLoading(false);
    };

    fetchProjects();
  }, []);

  return (
    <motion.div
      className="min-h-screen py-20 px-6 bg-primary text-primary"
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="max-w-5xl mx-auto text-center">
        <motion.h1 
          className="text-5xl font-bold mb-6 text-[var(--novar-yellow)]"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Portfolio
        </motion.h1>
        <motion.p 
          className="text-lg text-secondary"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Explore Novar&apos;s projects across cosplay, filmmaking, coding, and more.
        </motion.p>
      </div>

      <motion.div
        className="mt-16 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        {loading ? (
          <p className="text-center text-lg">Loading projects...</p>
        ) : projects.length === 0 ? (
          <p className="text-center text-lg">No projects available.</p>
        ) : (
          projects.map((project) => (
            <motion.a
              key={project.id}
              href={project.link ?? "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="box has-link block"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              {project.imageUrl ? (
                <Image
                  src={project.imageUrl}
                  alt={project.title}
                  width={600}
                  height={400}
                  className="w-full h-48 object-cover mb-4"
                />
              ) : (
                <Image
                  src="/placeholder.png"
                  alt="Placeholder Image"
                  width={600}
                  height={400}
                  className="w-full h-48 object-cover mb-4"
                />
              )}
              <h3 className="text-2xl font-bold text-accent">{project.title}</h3>
              {project.creator && <p className="text-secondary">By {project.creator}</p>} {/* Display creator's name */}
              <p className="mt-2">{project.description}</p>
            </motion.a>
          ))
        )}
      </motion.div>
    </motion.div>
  );
}
