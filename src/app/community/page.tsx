"use client";
import { useState, useEffect } from "react";
import { db } from "@/firebase/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import Image from "next/image";

export default function CommunityPage() {
  const [firebasePosts, setFirebasePosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Hardcoded projects (keep these)
  const hardcodedProjects = [
    { 
      id: 1, 
      title: "The Last Hope | A The Last of Us Inspired Short Film", 
      creator: "Yousef Mirza", 
      description: "An original short film based on the hit game series The Last of Us. Written by Yousef Mirza, Produced by Yousef Mirza and GFF. Made by fans, for fans.", 
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
  ];

  // Fetch posts from Firestore
  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const querySnapshot = await getDocs(collection(db, "community_posts"));
        const fetchedPosts = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setFirebasePosts(fetchedPosts);
      } catch (error) {
        console.error("Error fetching community posts:", error);
      }
      setLoading(false);
    };

    fetchPosts();
  }, []);

  return (
    <div className="min-h-screen py-20 px-6 bg-primary text-primary">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-5xl font-bold mb-6 text-[var(--novar-yellow)]">Novar Community</h1>
        <p className="text-lg text-secondary">
          Join our Discord community to share your projects, collaborate, inspire others, and get inspired by others!
        </p>

        {/* Discord Button (Unchanged) */}
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
      </div>

      {/* Community Posts Section */}
      <div className="mt-16 max-w-5xl mx-auto">
        <h1 className="text-4xl font-semibold mb-6 text-center text-accent"> Your Featured Projects: </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Hardcoded Projects */}
          {hardcodedProjects.map((project) => (
            <a key={project.id} href={project.link} target="_blank" rel="noopener noreferrer" className="box has-link block">
              <Image 
                src={project.image} 
                alt={project.title} 
                width={600} 
                height={400} 
                className="w-full h-48 object-cover mb-4"
              />
              <h3 className="text-2xl font-bold text-accent">{project.title}</h3>
              <p className="text-secondary">By {project.creator}</p>
              <p className="mt-2">{project.description}</p>
            </a>
          ))}

          {/* Firebase Projects */}
          {loading ? (
            <p className="text-center col-span-2">Loading posts...</p>
          ) : firebasePosts.length === 0 ? (
            <p className="text-center col-span-2">No posts yet.</p>
          ) : (
            firebasePosts.map((post) => (
              <div key={post.id} className="box has-link p-4">
                {post.imageUrl && (
                  <Image
                    src={post.imageUrl}
                    alt={post.title}
                    width={600}
                    height={400}
                    className="w-full h-48 object-cover mb-4"
                  />
                )}
                <h3 className="text-2xl font-bold">{post.title}</h3>
                <p className="mt-2">{post.description}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
