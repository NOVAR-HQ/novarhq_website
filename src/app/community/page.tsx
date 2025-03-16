"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { db } from "@/firebase/firebaseConfig";
import { collection, query, orderBy, getDocs } from "firebase/firestore";
import Image from "next/image";

interface CommunityPost {
  id: string;
  title: string;
  description: string;
  creator?: string; // Added creator field
  imageUrl?: string;
}

export default function CommunityPage() {
  const [firebasePosts, setFirebasePosts] = useState<CommunityPost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Hardcoded projects (keep these)
  const hardcodedProjects = [
    { 
      id: "1", 
      title: "The Last Hope | A The Last of Us Inspired Short Film", 
      creator: "Yousef Mirza", 
      description: "An original short film based on the hit game series The Last of Us. Written by Yousef Mirza, Produced by Yousef Mirza and GFF. Made by fans, for fans.", 
      image: "/projecttlh1.jpg",
      link: "https://www.youtube.com/watch?v=H1lN3PLcokQ"
    },
    { 
      id: "2", 
      title: "Katroa - A Star Wars Fan Film", 
      creator: "Sam Kesch and Yousef Mirza", 
      description: "A collaboration between actors, cosplayers, and Star Wars fans.", 
      image: "/projectkatroa1.jpg",
      link: "https://www.youtube.com/watch?v=yOVVl54MuhM"
    }
  ];

  // Fetch posts from Firestore, ordered from newest to oldest
  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const querySnapshot = await getDocs(
          query(collection(db, "community_posts"), orderBy("timestamp", "desc"))
        );
        const fetchedPosts: CommunityPost[] = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data() as Omit<CommunityPost, "id">, // Fetching all fields, including `creator`
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
    <motion.div
      className="min-h-screen py-20 px-6 bg-primary text-primary"
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <motion.div
        className="max-w-4xl mx-auto text-center"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-5xl font-bold mb-6 text-[var(--novar-yellow)]">Novar Community</h1>
        <p className="text-lg text-secondary">
          Join our Discord community to share your projects, collaborate, inspire others, and get inspired by others!
        </p>

        {/* Discord Button (Animated separately) */}
        <motion.div
          className="mt-6 flex justify-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <a 
            href="https://discord.gg/gGufQ9p7Ak"
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-[var(--discord-blue)] hover:brightness-110 px-4 py-2 rounded-lg text-white font-bold flex items-center space-x-2 w-fit"
          >
            <Image src="/discord-icon.png" alt="Discord" width={20} height={20} />
            <span>Join Our Discord</span>
          </a>
        </motion.div>
      </motion.div>

      {/* Community Posts Section */}
      <motion.div
        className="mt-16 max-w-5xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <h1 className="text-4xl font-semibold mb-6 text-center text-accent"> Featured Projects:</h1>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0, y: 10 },
            visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.2 } }
          }}
        >
          {/* Hardcoded Projects */}
          {hardcodedProjects.map((project) => (
            <motion.a 
              key={project.id}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="box has-link block"
              variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
            >
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
            </motion.a>
          ))}

          {/* Firebase Projects - Sorted from latest to oldest */}
          {loading ? (
            <motion.p className="text-center col-span-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
              Loading posts...
            </motion.p>
          ) : firebasePosts.length === 0 ? (
            <motion.p className="text-center col-span-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
              No posts yet.
            </motion.p>
          ) : (
            firebasePosts.map((post) => (
              <motion.div
                key={post.id}
                className="box has-link p-4"
                variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
              >
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
                {post.creator && <p className="text-secondary">By {post.creator}</p>} {/* Display creator's name */}
                <p className="mt-2">{post.description}</p>
              </motion.div>
            ))
          )}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
