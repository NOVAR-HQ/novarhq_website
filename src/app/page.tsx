"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaInstagram, FaYoutube, FaGithub, FaArrowDown } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import { db } from "@/firebase/firebaseConfig"; // Firestore
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
      <motion.section 
        className="h-screen flex flex-col items-center justify-center text-center relative" 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ duration: 1.5 }}
      >
        <Link href="/" className="flex justify-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8, y: -50 }} 
            animate={{ opacity: 1, scale: 1, y: 0 }} 
            transition={{ duration: 1.5 }}
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
        <motion.p 
          className="text-2xl mt-4" 
          initial={{ y: 30, opacity: 0 }} 
          animate={{ y: 0, opacity: 1 }} 
          transition={{ duration: 1.5 }}
        >
          Creativity meets Technology
        </motion.p>
        
        {/* Social Media Icons */}
        <motion.div 
          className="mt-6 flex space-x-6" 
          initial={{ opacity: 0, y: 30 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 1.5, delay: 0.5 }}
        >
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

        {/* Scroll Button */}
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

      {/* Portfolio Section */}
      <motion.section 
        className="py-20 px-6 text-center"
        initial={{ opacity: 0, y: 50 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 1, delay: 0.5 }}
      >
        <h1 className="text-5xl font-bold text-[var(--novar-yellow)]">Portfolio</h1>
        <p className="text-lg text-secondary">Explore Novar's past, present, and future projects.</p>

        {latestPortfolioPost && (
          <div className="box has-link block mx-auto mt-6 max-w-3xl">
            <Image 
              src={latestPortfolioPost.imageUrl}
              alt={latestPortfolioPost.title}
              width={600}
              height={400}
              className="w-full h-48 object-cover mb-4"
            />
            <h3 className="text-2xl font-bold text-accent">{latestPortfolioPost.title}</h3>
            <p className="mt-2">{latestPortfolioPost.description}</p>
            <Link href="/portfolio" className="mt-4 inline-block btn-primary">View More</Link>
          </div>
        )}
      </motion.section>

      {/* Community Section */}
      <motion.section 
        className="py-20 px-6 text-center"
        initial={{ opacity: 0, y: 50 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 1, delay: 0.7 }}
      >
        <h1 className="text-5xl font-bold text-[var(--novar-yellow)]">Community</h1>
        <p className="text-lg text-secondary">Join Novar's creative community and share your projects.</p>

        {latestCommunityPost && (
          <div className="box has-link block mx-auto mt-6 max-w-3xl">
            <Image 
              src={latestCommunityPost.imageUrl}
              alt={latestCommunityPost.title}
              width={600}
              height={400}
              className="w-full h-48 object-cover mb-4"
            />
            <h3 className="text-2xl font-bold text-accent">{latestCommunityPost.title}</h3>
            <p className="mt-2">{latestCommunityPost.description}</p>
            <Link href="/community" className="mt-4 inline-block btn-primary">View More</Link>
          </div>
        )}
      </motion.section>

    {/* Collab & Commission Section */}
<motion.section
      className="py-20 px-6 text-center"
        initial={{ opacity: 0, y: 50 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 1, delay: 0.7 }}
      >
        <h1 className="text-5xl font-bold text-[var(--novar-yellow)]">Collab & Commission</h1>
        <p className="mt-4 max-w-3xl mx-auto text-secondary">
          Want to work with Novar or need Novar&apos;s help? Let’s create together!
        </p>
        <Link href="/collab" className="mt-6 inline-block btn-primary">
          Get Involved
        </Link>
      </motion.section>


{/* About Section */}
	<motion.section 
        className="py-20 px-6 text-center"
        initial={{ opacity: 0, y: 50 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 1, delay: 0.7 }}
      >

        <h1 className="text-5xl font-bold text-[var(--novar-yellow)]">About Novar</h1>
        <p className="mt-4 max-w-3xl mx-auto text-secondary">
          Learn more about Novar and our mission.
        </p>
        <Link href="/about" className="mt-6 inline-block btn-primary">
          Learn More
        </Link>
</motion.section>
    </motion.div>
  );
}
