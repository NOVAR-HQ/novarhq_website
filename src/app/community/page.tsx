"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { db } from "@/firebase/firebaseConfig";
import { collection, query, where, orderBy, getDocs } from "firebase/firestore";

interface CommunityPost {
  id: string;
  title: string;
  description: string;
  creator?: string;
  imageUrl?: string;
  link?: string;
}

export default function CommunityPage() {
  const [projects, setProjects] = useState<CommunityPost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedPost, setSelectedPost] = useState<CommunityPost | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      try {
        const querySnapshot = await getDocs(
          query(
            collection(db, "posts"),
            where("category", "array-contains", "community"),
            orderBy("timestamp", "desc")
          )
        );
        const fetchedProjects: CommunityPost[] = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<CommunityPost, "id">),
          creator: doc.data().creator || "Unknown", // Ensure creator is displayed
        }));
        setProjects(fetchedProjects);
      } catch (error) {
        console.error("Error fetching community posts:", error);
      }
      setLoading(false);
    };

    fetchProjects();
  }, []);

  // Filter posts based on search input
  const filteredProjects = projects.filter((project) =>
    project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen py-20 px-6 bg-primary text-primary">
      <div className="max-w-5xl mx-auto text-center">
        <h1 className="text-5xl font-bold mb-6 text-[var(--novar-yellow)]">Novar Community</h1>
        <p className="text-lg text-secondary">
          Join our Discord community to share your projects, collaborate, inspire others, and get inspired by others!
        </p>
{/* Discord Link - Now Styled with Discord Blue */}
<div className="mt-6 flex justify-center">
         <a 
         href="https://discord.gg/gGufQ9p7Ak"
         target="_blank" 
         rel="noopener noreferrer"

          className="bg-[var(--discord-blue)] hover:brightness-110 px-4 py-2 rounded-lg text-white font-bold flex items-center space-x-2 w-fit">
          <Image src="/discord-icon.png" alt="Discord" width={20} height={20} />
          <span>Join Our Discord</span>
      </a>
    </div>
        {/* Search Input */}
        <input
          type="text"
          placeholder="Search community projects..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full max-w-lg p-3 mt-6 rounded-md bg-white text-black border border-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--novar-yellow)]"
        />
      </div>

      {/* Grid Layout */}
      <div className="mt-8 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {loading ? (
          <p className="text-center text-lg">Loading projects...</p>
        ) : filteredProjects.length === 0 ? (
          <p className="text-center text-lg">No matching projects found.</p>
        ) : (
          filteredProjects.map((project) => (
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
              <p className="text-sm text-gray-300">By {project.creator}</p> {/* Display Creator */}
              <p className="mt-2 text-ellipsis overflow-hidden whitespace-nowrap">{project.description}</p>
              <p className="text-blue-400 font-semibold mt-2">Read More</p>
            </div>
          ))
        )}
      </div>

      {/* MODAL */}
      {selectedPost && (
        <div 
        className="fixed inset-0 flex items-center justify-center blurred-overlay z-[200] px-4 py-10"
        onClick={() => setSelectedPost(null)} // Closes modal when clicking outside
        >
          <div 
            className="bg-[#03405f] text-white p-6 rounded-lg w-full max-w-md sm:max-w-lg max-h-[80vh] overflow-y-auto relative"
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
            <p className="text-sm text-gray-300 mb-1">By {selectedPost.creator}</p> {/* Display Creator */}
            <p className="text-lg mb-4">{selectedPost.description}</p>
            {selectedPost.link && (
              <a
                href={selectedPost.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 underline font-semibold"
              >
                Learn More
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
