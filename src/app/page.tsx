"use client";
import { useState, useEffect } from "react";
import { FaInstagram, FaYoutube, FaGithub, FaArrowDown } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";

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
        {/* Fixed: Use <Link> instead of <a> */}
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

      {/* Sections */}
      {[
        { title: "About Novar", text: "Novar is a place where dreamers come together to push the boundaries of what is possible.", link: "/about", button: "Learn More" },
        { title: "Portfolio", text: "Explore our past, present, and future projects.", link: "/portfolio", button: "View More" },
        { title: "Collab & Commission", text: "Want to work with us or learn from our experience? Let’s create together!", link: "/collab", button: "Get Involved" },
        { title: "Join the Community", text: "Share your projects and connect with other creators.", link: "/community", button: "Join Now" },
        { title: "Contact Us", text: "Have questions or ideas? Let’s talk!", link: "mailto:contact@novarhq.com", button: "Email Us" }
      ].map((section, index) => (
        <section key={index} className="py-20 px-6 text-center">
          <h1 className="text-4xl font-semibold text-accent">{section.title}</h1>
          <p className="mt-4 max-w-3xl mx-auto text-secondary">{section.text}</p>
          <Link href={section.link} className="mt-6 inline-block btn-primary">
            {section.button}
          </Link>
        </section>
      ))}
    </div>
  );
}
