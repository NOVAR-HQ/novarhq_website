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
  const [selectedPost, setSelectedPost] = useState<PortfolioPost | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      try {
        console.log("Fetching portfolio posts...");
        const querySnapshot = await getDocs(
          query(
            collection(db, "posts"),
            where("category", "array-contains", "portfolio"),
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

      {/* Grid Layout */}
      <div className="mt-16 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {loading ? (
          <p className="text-center text-lg">Loading projects...</p>
        ) : projects.length === 0 ? (
          <p className="text-center text-lg">No projects available.</p>
        ) : (
          projects.map((project) => (
            <div
              key={project.id}
              className="box cursor-pointer rounded-lg overflow-hidden bg-[#03405f] p-4 text-white"
              onClick={() => setSelectedPost(project)}
            >
              <Image
                src={project.imageUrl && project.imageUrl.trim() !== "" ? project.imageUrl : "/placeholder.png"}
                alt={project.title}
                width={600}
                height={400}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="text-2xl font-bold text-[var(--novar-yellow)]">{project.title}</h3>
              <p className="mt-2 text-ellipsis overflow-hidden whitespace-nowrap">{project.description}</p>
              <p className="text-blue-400 font-semibold mt-2">View More</p>
            </div>
          ))
        )}
      </div>

      {/* MODAL */}
      {selectedPost && (
        <div 
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[100] px-4 py-10"
          onClick={() => setSelectedPost(null)} // Closes modal when clicking outside
        >
          <div 
            className="bg-[#03405f] text-white p-6 rounded-lg w-full max-w-md sm:max-w-lg max-h-[80vh] overflow-y-auto relative shadow-lg"
            onClick={(e) => e.stopPropagation()} // Prevents modal from closing when clicking inside
          >
            <button
              className="absolute top-3 right-3 text-2xl font-bold text-gray-300 hover:text-white"
              onClick={() => setSelectedPost(null)}
            >
              ✖
            </button>
            <Image
              src={selectedPost.imageUrl ? selectedPost.imageUrl : "/placeholder.png"}
              alt={selectedPost.title}
              width={600}
              height={400}
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <h2 className="text-3xl font-bold mb-2 text-[var(--novar-yellow)]">{selectedPost.title}</h2>
            <p className="text-lg mb-4">{selectedPost.description}</p>
            {selectedPost.link && (
              <a
                href={selectedPost.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 underline font-semibold"
              >
                View More
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
