"use client";
import { useState, useEffect } from "react";
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

  // Fetch Latest Community & Portfolio Posts
  useEffect(() => {
    const fetchLatestPosts = async () => {
      try {
        // Fetch latest Community post
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
              link: "/community" // Always link to the community page
            });
          }
        }

        // Fetch latest Portfolio post
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
              link: "/portfolio" // Always link to the portfolio page
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
    <div className="bg-[var(--novar-blue)] text-white">
      {/* Hero Section */}
      <section className="h-screen flex flex-col items-center justify-center text-center relative">
        <Link href="/" className="flex justify-center">
          <Image 
            src="/novar-banner.png"
            alt="Novar Banner"
            width={600}
            height={150}
            priority
            className="max-w-[80vw] md:max-w-[500px] lg:max-w-[600px] h-auto"
          />
        </Link>
        <p className="text-2xl mt-4">Creativity meets Technology</p>

        {/* Social Media Icons */}
        <div className="mt-6 flex space-x-6">
          <a href="https://github.com/NOVAR-HQ" target="_blank" rel="noopener noreferrer">
            <FaGithub className="text-white hover:text-[var(--novar-yellow)] text-3xl" />
          </a>
          <a href="https://instagram.com/novarhq" target="_blank" rel="noopener noreferrer">
            <FaInstagram className="text-white hover:text-[var(--novar-yellow)] text-3xl" />
          </a>
          <a href="https://youtube.com/@novarhq" target="_blank" rel="noopener noreferrer">
            <FaYoutube className="text-white hover:text-[var(--novar-yellow)] text-3xl" />
          </a>
        </div>

        {/* Clickable Scroll Button */}
        {isVisible && (
          <button
            onClick={handleScrollDown}
            className="fixed bottom-10 left-1/2 transform -translate-x-1/2 bg-[var(--novar-yellow)] text-white p-3 rounded-full shadow-md animate-bounce"
            aria-label="Scroll Down"
          >
            <FaArrowDown className="text-xl" />
          </button>
        )}
      </section>

      {/* Portfolio Section */}
      <section className="py-20 px-6 text-center">
        <h1 className="text-5xl font-bold text-[var(--novar-yellow)]">Portfolio</h1>
        <p className="text-lg text-secondary">Explore Novar&apos;s past, present, and future projects.</p>

        {latestPortfolioPost ? (
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

            <Link href="/portfolio" className="mt-4 inline-block btn-primary">
              View More
            </Link>
          </div>
        ) : (
          <p className="mt-6 text-lg">Loading latest portfolio post...</p>
        )}
      </section>

      {/* Community Section */}
      <section className="py-20 px-6 text-center">
        <h1 className="text-5xl font-bold text-[var(--novar-yellow)]">Community</h1>
        <p className="text-lg text-secondary">Join Novar&apos;s creative community and share your projects.</p>

        {latestCommunityPost ? (
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

            <Link href="/community" className="mt-4 inline-block btn-primary">
              View More
            </Link>
          </div>
        ) : (
          <p className="mt-6 text-lg">Loading latest community post...</p>
        )}
      </section>
    </div>
  );
}
