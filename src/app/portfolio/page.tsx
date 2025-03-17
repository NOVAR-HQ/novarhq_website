"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { db } from "@/firebase/firebaseConfig";
import { collection, query, where, orderBy, getDocs } from "firebase/firestore";

interface PortfolioPost {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  link?: string;
}

export default function PortfolioPage() {
  const [projects, setProjects] = useState<PortfolioPost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        console.log("Fetching portfolio posts...");
        const querySnapshot = await getDocs(
          query(
            collection(db, "posts"),
            where("category", "array-contains", "portfolio"), // ✅ Correct filtering
            orderBy("timestamp", "desc")
          )
        );
        const fetchedProjects: PortfolioPost[] = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<PortfolioPost, "id">),
        }));
        console.log("Fetched portfolio posts:", fetchedProjects);
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

      <div className="mt-16 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {loading ? (
          <p className="text-center text-lg">Loading projects...</p>
        ) : projects.length === 0 ? (
          <p className="text-center text-lg">No projects available.</p>
        ) : (
          projects.map((project) => (
            <a
              key={project.id}
              href={project.link ?? "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="box has-link block"
            >
              <Image
                src={project.imageUrl && project.imageUrl.trim() !== "" ? project.imageUrl : "/placeholder.png"}
                alt={project.title}
                width={600}
                height={400}
                className="w-full h-48 object-cover mb-4"
              />
              <h3 className="text-2xl font-bold text-accent">{project.title}</h3>
              <p className="mt-2">{project.description}</p>
            </a>
          ))
        )}
      </div>
    </div>
  );
}
