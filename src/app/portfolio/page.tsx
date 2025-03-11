"use client";
import { useState } from "react";
import Image from "next/image";

export default function PortfolioPage() {
  // Portfolio project data
  const [projects] = useState([
    { 
      id: 1, 
      title: "Spider-Man Suit", 
      description: "A photorealistic Spider-Man costume created from scratch.", 
      image: "/projectspidey1.jpg",
      link: "https://www.instagram.com/p/C38WfTTL7UA/"
    },
    { 
      id: 2, 
      title: "Katroa - A Star Wars Fan Film", 
      description: "A collaboration between actors, cosplayers, and Star Wars fans.", 
      image: "/projectkatroa1.jpg",
      link: "https://www.youtube.com/watch?v=yOVVl54MuhM"
    },
    { 
      id: 3, 
      title: "3D-Printed Iron Man Helmet", 
      description: "A 3D-printed Iron Man helmet.", 
      image: "/projectironmanhelmet.jpg",
      link: "https://www.instagram.com/p/DEIb-MioS6y/?img_index=7"
    }
  ]);

  return (
    <div className="bg-gray-900 text-white min-h-screen py-20 px-6">
      <div className="max-w-5xl mx-auto text-center">
        <h1 className="text-5xl font-bold mb-6">Portfolio</h1>
        <p className="text-lg text-gray-300">
          Explore our projects across cosplay, filmmaking, 3D printing, and more.
        </p>
      </div>

      {/* Portfolio Projects */}
      <div className="mt-16 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project) => (
          <div key={project.id} className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <a href={project.link} target="_blank" rel="noopener noreferrer">
              <Image 
                src={project.image} 
                alt={project.title} 
                width={600} 
                height={400} 
                className="w-full h-48 object-cover rounded-lg mb-4 hover:opacity-80 transition-opacity"
              />
            </a>
            <h3 className="text-2xl font-bold text-[var(--novar-yellow)]">{project.title}</h3>
            <p className="mt-2">{project.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
