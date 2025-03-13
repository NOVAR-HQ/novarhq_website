"use client";
import { useState, useEffect } from "react";
import { FaChevronDown } from "react-icons/fa";

export default function ScrollIndicator() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`fixed bottom-6 left-1/2 transform -translate-x-1/2 transition-opacity duration-500 ${
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div className="flex flex-col items-center animate-bounce text-white text-lg">
        <span className="bg-[var(--novar-yellow)] text-black px-4 py-2 rounded-lg shadow-md">
          See more
        </span>
        <FaChevronDown className="text-[var(--novar-yellow)] mt-2 text-2xl" />
      </div>
    </div>
  );
}
