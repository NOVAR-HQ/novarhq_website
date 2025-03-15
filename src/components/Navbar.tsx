"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion"; // Import Framer Motion for animations

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  return (
    <motion.nav 
      className="fixed w-full top-0 shadow-md z-50 flex justify-between items-center px-6 py-3 bg-[var(--navbar-bg)]"
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      transition={{ duration: 0.8, delay: 0.8 }} // Slightly faster transition
    >
      {/* Novar Banner Always in Navbar */}
      <Link href="/">
        <Image 
          src="/novar-banner.png" 
          alt="Novar Banner" 
          width={150} 
          height={40} 
          priority 
          className="h-auto max-w-[50vw] md:max-w-[150px]" 
        />
      </Link>

      {/* Desktop Menu */}
      <div className="hidden md:flex space-x-6">
        {!isHomePage && (
          <Link href="/" className="hover:text-[var(--novar-yellow)]">Home</Link>
        )}
        <Link href="/portfolio" className="hover:text-[var(--novar-yellow)]">Portfolio</Link>
        <Link href="/community" className="hover:text-[var(--novar-yellow)]">Community</Link>
        <Link href="/collab" className="hover:text-[var(--novar-yellow)]">Collab & Commission</Link>
        <Link href="/about" className="hover:text-[var(--novar-yellow)]">About</Link>
      </div>

      {/* Mobile Menu Button */}
      <button className="md:hidden text-white text-2xl" onClick={() => setIsOpen(!isOpen)}>
        ☰
      </button>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div 
          className="absolute top-full left-0 w-full bg-[var(--navbar-bg)] p-4 shadow-md"
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ duration: 0.5 }} // Also slightly faster for better feel
        >
          {!isHomePage && (
            <Link href="/" className="block py-2 hover:text-[var(--novar-yellow)]" onClick={() => setIsOpen(false)}>
              Home
            </Link>
          )}
          <Link href="/portfolio" className="block py-2 hover:text-[var(--novar-yellow)]" onClick={() => setIsOpen(false)}>Portfolio</Link>
          <Link href="/community" className="block py-2 hover:text-[var(--novar-yellow)]" onClick={() => setIsOpen(false)}>Community</Link>
          <Link href="/collab" className="block py-2 hover:text-[var(--novar-yellow)]" onClick={() => setIsOpen(false)}>Collab & Commission</Link>
          <Link href="/about" className="block py-2 hover:text-[var(--novar-yellow)]" onClick={() => setIsOpen(false)}>About</Link>
        </motion.div>
      )}
    </motion.nav>
  );
}
