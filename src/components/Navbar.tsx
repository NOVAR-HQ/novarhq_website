"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation"; //  Import pathname to check the current page

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname(); // Get current path
  const isHomePage = pathname === "/"; // Check if it's the homepage

  return (
    <nav className="fixed w-full top-0 shadow-md z-50 flex justify-between items-center px-6 py-3 bg-[var(--navbar-bg)]">
      {/* Novar Icon Always in Navbar */}
      <Link href="/">
        <Image 
          src="/novar-icon.png"
          alt="Novar Icon" 
          width={50} 
          height={50} 
          priority 
        />
      </Link>

      {/* Desktop Menu */}
      <div className="hidden md:flex space-x-6">
        {!isHomePage && ( // Show "Home" only if NOT on the homepage
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
        <div className="absolute top-full left-0 w-full bg-[var(--navbar-bg)] p-4 shadow-md">
          {!isHomePage && ( // Show "Home" in mobile menu too if NOT on the homepage
            <Link href="/" className="block py-2 hover:text-[var(--novar-yellow)]" onClick={() => setIsOpen(false)}>
              Home
            </Link>
          )}
          <Link href="/portfolio" className="block py-2 hover:text-[var(--novar-yellow)]" onClick={() => setIsOpen(false)}>Portfolio</Link>
          <Link href="/community" className="block py-2 hover:text-[var(--novar-yellow)]" onClick={() => setIsOpen(false)}>Community</Link>
          <Link href="/collab" className="block py-2 hover:text-[var(--novar-yellow)]" onClick={() => setIsOpen(false)}>Collab & Commission</Link>
          <Link href="/about" className="block py-2 hover:text-[var(--novar-yellow)]" onClick={() => setIsOpen(false)}>About</Link>
        </div>
      )}
    </nav>
  );
}
