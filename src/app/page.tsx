"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaInstagram, FaYoutube, FaGithub, FaArrowDown } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import { db } from "@/firebase/firebaseConfig";
import { collection, query, orderBy, limit, getDocs, DocumentData } from "firebase/firestore";

interface Post {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
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
        const communityQuery = query(collection(db, "community_posts"), orderBy("timestamp", "desc"), limit(1));
        const communitySnapshot = await getDocs(communityQuery);
        if (!communitySnapshot.empty) {
          const doc = communitySnapshot.docs[0];
          const data = doc.data() as DocumentData;
          if (data.title && data.description) {
            setLatestCommunityPost({
              id: doc.id,
              title: data.title,
              description: data.description,
              imageUrl: data.imageUrl ?? "/placeholder.png",
              link: "/community"
            });
          }
        }
        const portfolioQuery = query(collection(db, "portfolio_posts"), orderBy("timestamp", "desc"), limit(1));
        const portfolioSnapshot = await getDocs(portfolioQuery);
        if (!portfolioSnapshot.empty) {
          const doc = portfolioSnapshot.docs[0];
          const data = doc.data() as DocumentData;
          if (data.title && data.description) {
            setLatestPortfolioPost({
              id: doc.id,
              title: data.title,
              description: data.description,
              imageUrl: data.imageUrl ?? "/placeholder.png",
              link: "/portfolio"
            });
          }
        }
      } catch (error) {
        console.error("Error fetching latest posts:", error);
      }
    };
    fetchLatestPosts();
  }, []);

  const handleScrollDown = () => {
    window.scrollBy({
      top: window.innerHeight * 0.5,
      behavior: "smooth",
    });
  };

  return (
    <motion.div className="bg-[var(--novar-blue)] text-white" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
      <motion.section className="h-screen flex flex-col items-center justify-center text-center relative" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.5 }}>
        <Link href="/" className="flex justify-center">
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.5 }}>
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
        <motion.p className="text-2xl mt-4" initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1.5 }}>Creativity meets Technology</motion.p>
        <motion.div className="mt-6 flex space-x-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.5 }}>
          <a href="https://github.com/NOVAR-HQ" target="_blank" rel="noopener noreferrer">
            <FaGithub className="text-white hover:text-[var(--novar-yellow)] text-3xl" />
          </a>
          <a href="https://instagram.com/novarhq" target="_blank" rel="noopener noreferrer">
            <FaInstagram className="text-white hover:text-[var(--novar-yellow)] text-3xl" />
          </a>
          <a href="https://youtube.com/@novarhq" target="_blank" rel="noopener noreferrer">
            <FaYoutube className="text-white hover:text-[var(--novar-yellow)] text-3xl" />
          </a>
        </motion.div>
        {isVisible && (
          <motion.button
            onClick={handleScrollDown}
            className="fixed bottom-10 left-1/2 transform -translate-x-1/2 bg-[var(--novar-yellow)] text-white p-3 rounded-full shadow-md animate-bounce"
            aria-label="Scroll Down"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2 }}
          >
            <FaArrowDown className="text-xl" />
          </motion.button>
        )}
      </motion.section>
    </motion.div>
  );
}
