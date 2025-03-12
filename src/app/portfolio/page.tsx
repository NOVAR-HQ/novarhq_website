"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { db } from "@/firebase/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

export default function PortfolioPage() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "portfolio_posts"));
        const fetchedProjects = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
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
    <div className="min-h-screen py-20 px-6 bg-primary text-primary">
      <div className="max-w-5xl mx-auto text-center">
        <h1 className="text-5xl font-bold mb-6 text-[var(--novar-yellow)]">Portfolio</h1>
        <p className="text-lg text-secondary">
          Explore Novar&apos;s projects across cosplay, filmmaking, coding, and more.
        </p>
      </div>

      {/* Portfolio Projects */}
      <div className="mt-16 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {loading ? (
          <p className="text-center text-lg">Loading projects...</p>
        ) : projects.length === 0 ? (
          <p className="text-center text-lg">No projects available.</p>
        ) : (
          projects.map((project) => (
            <a
              key={project.id}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="box has-link block"
            >
              {/* Render Image ONLY if there is a valid URL */}
              {project.imageUrl ? (
                <Image
                  src={project.imageUrl}
                  alt={project.title}
                  width={600}
                  height={400}
                  className="w-full h-48 object-cover mb-4"
                />
              ) : (
                // Use a placeholder image if none is available
                <Image
                  src="/placeholder.png"
                  alt="Placeholder Image"
                  width={600}
                  height={400}
                  className="w-full h-48 object-cover mb-4"
                />
              )}
              <h3 className="text-2xl font-bold text-accent">{project.title}</h3>
              <p className="mt-2">{project.description}</p>
            </a>
          ))
        )}
      </div>
    </div>
  );
}
