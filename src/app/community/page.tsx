"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { db } from "@/firebase/firebaseConfig";
import { collection, query, where, orderBy, getDocs } from "firebase/firestore";

interface PortfolioPost {
  id: string;
  title: string;
  description: string;
  creator: string;
  images: string[]; // Change from imageUrl to images array
  link?: string;
}

export default function PortfolioPage() {
  const [projects, setProjects] = useState<PortfolioPost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedPost, setSelectedPost] = useState<PortfolioPost | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
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
        const fetchedProjects: PortfolioPost[] = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            title: data.title,
            description: data.description,
            creator: data.creator || "Unknown",
            images: data.images ? data.images : data.imageUrl ? [data.imageUrl] : [], // Ensure images are handled as array
            link: data.link || "",
          };
        });
        setProjects(fetchedProjects);
      } catch (error) {
        console.error("Error fetching portfolio projects:", error);
      }
      setLoading(false);
    };

    fetchProjects();
  }, []);

  const handleNextImage = () => {
    if (selectedPost) {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === selectedPost.images.length - 1 ? 0 : prevIndex + 1
      );
    }
  };

  const handlePrevImage = () => {
    if (selectedPost) {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === 0 ? selectedPost.images.length - 1 : prevIndex - 1
      );
    }
  };
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
          placeholder="Search projects..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full max-w-lg p-3 mt-6 rounded-md bg-white text-black border border-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--novar-yellow)]"
        />
      </div>

      {/* Grid Layout */}
            <div className="mt-8 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {loading ? (
                <p className="text-center text-lg">Loading projects...</p>
              ) : projects.length === 0 ? (
                <p className="text-center text-lg">No matching projects found.</p>
              ) : (
                projects
                  .filter((project) =>
                    project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    project.description.toLowerCase().includes(searchQuery.toLowerCase())
                  )
                  .map((project) => (
                    <div
                      key={project.id}
                      className="box cursor-pointer rounded-lg overflow-hidden bg-[#03405f] p-4 text-white"
                      onClick={() => {
                        setSelectedPost(project);
                        setCurrentImageIndex(0); // Reset image index when opening a new modal
                      }}
                    >
                      <Image
                        src={project.images.length > 0 ? project.images[0] : "/placeholder.png"}
                        alt={project.title}
                        width={600}
                        height={400}
                        className="w-full h-48 object-cover rounded-lg mb-4"
                      />
                      <h3 className="text-2xl font-bold text-[var(--novar-yellow)]">{project.title}</h3>
                      <p className="text-sm text-gray-300">By {project.creator}</p>
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
    onClick={() => setSelectedPost(null)} // Close modal when clicking outside
  >
    <div
      className="bg-[#03405f] text-white p-6 rounded-lg w-full max-w-md sm:max-w-lg max-h-[90vh] overflow-y-auto relative shadow-lg"
      onClick={(e) => e.stopPropagation()} // Prevents modal from closing when clicking inside
    >
      {/* Close Button (Now Stays Above Everything) */}
      <button
        className="absolute top-3 right-3 text-2xl font-bold text-gray-300 hover:text-white z-[500] px-3 py-1 rounded-full"
        onClick={() => setSelectedPost(null)}>
        ✖
      </button>

      {/* Image Carousel */}
      {selectedPost.images.length > 1 ? (
        <div className="relative w-full mb-4">
          <Image
            src={selectedPost.images[currentImageIndex]}
            alt={selectedPost.title}
            width={600}
            height={400}
            className="w-full max-h-[60vh] object-contain rounded-md"
          />
          {/* Previous Button */}
          <button
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-bg-[var(--novar-yellow)] text-white px-3 py-1 rounded-full"
            onClick={handlePrevImage}
          >
            ◀
          </button>
          {/* Next Button */}
          <button
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-bg-[var(--novar-yellow)] text-white px-3 py-1 rounded-full"
            onClick={handleNextImage}
          >
            ▶
          </button>
        </div>
      ) : (
        <Image
          src={selectedPost.images.length > 0 ? selectedPost.images[0] : "/placeholder.png"}
          alt={selectedPost.title}
          width={600}
          height={400}
          className="w-full max-h-[60vh] object-contain rounded-md mb-4"
        />
      )}

      <h2 className="text-3xl font-bold mb-2 text-[var(--novar-yellow)]">{selectedPost.title}</h2>
      <p className="text-sm text-gray-300 mb-1">By {selectedPost.creator}</p>
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
