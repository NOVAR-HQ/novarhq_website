"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaInstagram, FaYoutube, FaGithub, FaArrowDown } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import { db } from "@/firebase/firebaseConfig"; // Firestore
import { collection, query, where, orderBy, limit, getDocs, DocumentData } from "firebase/firestore";

// Updated interface to support multiple images
interface Post {
  id: string;
  title: string;
  description: string;
  images: string[]; // Fixed to use an array of images
  link: string;
}

export default function Home() {
  const [isVisible, setIsVisible] = useState(true);
  const [latestCommunityPost, setLatestCommunityPost] = useState<Post | null>(null);
  const [latestPortfolioPost, setLatestPortfolioPost] = useState<Post | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsVisible(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const fetchLatestPosts = async () => {
      try {
        console.log("Fetching latest portfolio and community posts...");

        // Fetch latest Portfolio Post (includes community posts too)
        const portfolioQuery = query(
          collection(db, "posts"),
          where("category", "array-contains", "portfolio"),
          orderBy("timestamp", "desc"),
          limit(1)
        );
        const portfolioSnapshot = await getDocs(portfolioQuery);
        if (!portfolioSnapshot.empty) {
          const doc = portfolioSnapshot.docs[0];
          const data = doc.data() as DocumentData;
          setLatestPortfolioPost({
            id: doc.id,
            title: data.title,
            description: data.description,
            images: Array.isArray(data.images) && data.images.length > 0 
              ? data.images 
              : data.imageUrl 
                ? [data.imageUrl] 
                : ["/placeholder.png"], // 🔥 Ensures correct image handling
            link: "/portfolio",
          });
        }

        // Fetch latest Community Post
        const communityQuery = query(
          collection(db, "posts"),
          where("category", "array-contains", "community"),
          orderBy("timestamp", "desc"),
          limit(1)
        );
        const communitySnapshot = await getDocs(communityQuery);
        if (!communitySnapshot.empty) {
          const doc = communitySnapshot.docs[0];
          const data = doc.data() as DocumentData;
          setLatestCommunityPost({
            id: doc.id,
            title: data.title,
            description: data.description,
            images: Array.isArray(data.images) && data.images.length > 0 
              ? data.images 
              : data.imageUrl 
                ? [data.imageUrl] 
                : ["/placeholder.png"], // 🔥 Ensures correct image handling
            link: "/community",
          });
        }

        console.log("Fetched latest posts successfully.");
      } catch (error) {
        console.error("Error fetching latest posts:", error);
      }
    };

    fetchLatestPosts();
  }, []);

  const handleScrollDown = () => {
    window.scrollBy({
      top: window.innerHeight * 0.8, // Scrolls further down to reveal next section
      behavior: "smooth",
    });
  };

  return (
    <motion.div 
      className="bg-[var(--novar-blue)] text-white" 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      transition={{ duration: 1 }}
    >
      {/* Hero Section */}
      <motion.section className="h-screen flex flex-col items-center justify-center text-center relative">
        <Link href="/" className="flex justify-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8, y: -50 }} 
            animate={{ opacity: 1, scale: 1, y: 0 }} 
            transition={{ duration: 1.2, delay: 1 }}
          >
            <Image 
              src="/novar-icon.png"
              alt="Novar Icon"
              width={100}
              height={100}
              priority
              className="h-auto max-w-[50vw] md:max-w-[100px]"
            />
          </motion.div>
        </Link>
        <motion.p className="text-2xl mt-4">Creativity meets Technology</motion.p>

        {/* Social Media Icons */}
        <motion.div className="mt-6 flex space-x-6">
          <a href="https://github.com/NOVAR-HQ" target="_blank">
            <FaGithub className="text-white hover:text-[var(--novar-yellow)] text-3xl" />
          </a>
          <a href="https://instagram.com/novarhq" target="_blank">
            <FaInstagram className="text-white hover:text-[var(--novar-yellow)] text-3xl" />
          </a>
          <a href="https://youtube.com/@novarhq" target="_blank">
            <FaYoutube className="text-white hover:text-[var(--novar-yellow)] text-3xl" />
          </a>
        </motion.div>

        {/* Scroll Button */}
        {isVisible && (
          <motion.button
            onClick={handleScrollDown}
            className="fixed bottom-10 left-1/2 transform -translate-x-1/2 bg-[var(--novar-yellow)] text-white p-3 rounded-full shadow-md animate-bounce"
            aria-label="Scroll Down"
          >
            <FaArrowDown className="text-xl" />
          </motion.button>
        )}
      </motion.section>

      {/* Sections */}
      {[
        { title: "About Novar", link: "/about", text: "Learn more about Novar's mission." },
        { title: "Portfolio", link: "/portfolio", text: "Explore Novar's past, present, and future projects.", post: latestPortfolioPost },
        { title: "Community", link: "/community", text: "Join Novar's creative community and share your projects.", post: latestCommunityPost },
        { title: "Collab & Commission", link: "/collab", text: "Want to work with Novar or need Novar's help? Let's create together!" },
      ].map(({ title, link, text, post }, idx) => (
        <motion.section key={idx} className="py-20 px-6 text-center">
          <h1 className="text-5xl font-bold text-[var(--novar-yellow)]">{title}</h1>
          <p className="text-lg text-secondary">{text}</p>

          {post && (
            <div className="box has-link block mx-auto mt-6 max-w-3xl">
              <Image 
                src={post.images[0]}
                alt={post.title}
                width={600}
                height={400}
                className="w-full aspect-[16/9] object-cover rounded-lg mb-4" // 🔥 Fixed cropping issue
              />
              <h3 className="text-2xl font-bold text-accent">{post.title}</h3>
              <p className="mt-2 text-ellipsis overflow-hidden whitespace-nowrap">
                {post.description.length > 100
                  ? `${post.description.substring(0, 100)}...`
                  : post.description}
              </p>
              <Link href={link} className="mt-4 inline-block btn-primary">View More</Link>
            </div>
          )}

          {!post && <Link href={link} className="mt-6 inline-block btn-primary">Learn More</Link>}
        </motion.section>
      ))}
    </motion.div>
  );
}
