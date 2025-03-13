"use client";
import { useState, useEffect } from "react";
import { FaInstagram, FaYoutube, FaTiktok, FaDiscord, FaGithub, FaArrowDown } from "react-icons/fa";
import Image from "next/image";

export default function Home() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
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
        {/* ✅ Always Render the Same Image */}
        <a href="/admin-landing" className="flex justify-center">
          <Image 
            src="/novar-banner.png" // ✅ Ensure this is always the same
            alt="Novar Banner" 
            width={600} 
            height={150} 
            priority
            className="max-w-[80vw] md:max-w-[500px] lg:max-w-[600px] h-auto"
          />
        </a>

        <p className="text-2xl mt-4">Creativity meets Technology</p>

        {/* Social Media Icons */}
        <div className="mt-6 flex space-x-6">
          <a href="https://instagram.com/novarhq" target="_blank" rel="noopener noreferrer">
            <FaInstagram className="text-white hover:text-[var(--novar-yellow)] text-3xl" />
          </a>
          <a href="https://youtube.com/@novarhq" target="_blank" rel="noopener noreferrer">
            <FaYoutube className="text-white hover:text-[var(--novar-yellow)] text-3xl" />
          </a>
          <a href="https://tiktok.com/@novarhq" target="_blank" rel="noopener noreferrer">
            <FaTiktok className="text-white hover:text-[var(--novar-yellow)] text-3xl" />
          </a>
          <a href="https://discord.gg/gGufQ9p7Ak" target="_blank" rel="noopener noreferrer">
            <FaDiscord className="text-white hover:text-[var(--novar-yellow)] text-3xl" />
          </a>
          <a href="https://github.com/NOVAR-HQ" target="_blank" rel="noopener noreferrer">
            <FaGithub className="text-white hover:text-[var(--novar-yellow)] text-3xl" />
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
    </div>
  );
}
