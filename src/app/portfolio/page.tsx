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
    <div className="min-h-screen py-20 px-6 bg-primary text-primary">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-5xl font-bold mb-6">Portfolio</h2>
        <p className="text-lg text-secondary">
          Explore Novar&apos;s projects across cosplay, filmmaking, coding, and more.
        </p>
      </div>

      {/* Portfolio Projects */}
      <div className="mt-16 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project) => (
          <a key={project.id} href={project.link} target="_blank" rel="noopener noreferrer" className="box has-link block">
            <Image 
              src={project.image} 
              alt={project.title} 
              width={600} 
              height={400} 
              className="w-full h-48 object-cover mb-4"
            />
            <h3 className="text-2xl font-bold text-accent">{project.title}</h3>
            <p className="mt-2">{project.description}</p>
          </a>
        ))}
      </div>
    </div>
  );
}
