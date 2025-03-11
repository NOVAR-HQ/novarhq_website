"use client";
import { useState } from "react";
import Image from "next/image";

export default function CommunityPage() {
  // Prosjekt-data
  const [projects] = useState([
    { 
      id: 1, 
      title: "The Last Hope| A The Last of Us inspired short film", 
      creator: "Yousef Mirza", 
      description: "An original short film based on the hit game series The Last of Us. Written by Yousef Mirza, Produced by Yousef Mirza and GFF. Made by fans, for fans", 
      image: "/projecttlh1.jpg",
      link: "https://www.youtube.com/watch?v=H1lN3PLcokQ"
    },
    { 
      id: 2, 
      title: "Katroa - A Star Wars Fan Film", 
      creator: "Sam Kesch and Yousef Mirza", 
      description: "A collaboration between actors, cosplayers, and Star Wars fans.", 
      image: "/projectkatroa1.jpg",
      link: "https://www.youtube.com/watch?v=yOVVl54MuhM"
    }
  ]);

  return (
    <div className="min-h-screen py-20 px-6">      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-5xl font-bold mb-6">Novar Community</h1>
        <p className="text-lg text-gray-300">
          Join our Discord community to share your projects, collaborate, inspire others, and get inspired by others!
        </p>

        {/* Discord Link */}
        <div className="mt-6">
          <a 
            href="https://discord.gg/gGufQ9p7Ak"
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-[var(--novar-yellow)] hover:brightness-110 px-6 py-3 rounded-lg text-white font-bold"
          >
            Join Our Discord
          </a>
        </div>
      </div>

      {/* Prosjektseksjon */}
      <div className="mt-16 max-w-5xl mx-auto">
        <h2 className="text-4xl font-semibold mb-6 text-center">Your Featured Projects:</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
              <p className="text-gray-300">By {project.creator}</p>
              <p className="mt-2">{project.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
