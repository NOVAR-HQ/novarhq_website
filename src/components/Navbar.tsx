"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed w-full top-0 shadow-md z-50 flex justify-between items-center px-4 py-2 bg-[var(--navbar-bg)]">
      {/* Novar Banner */}
      <Link href="/">
        <Image src="/novar-banner.png" alt="Novar Banner" width={100} height={30} priority />
      </Link>

      {/* Desktop Menu */}
      <div className="hidden md:flex space-x-6">
        <Link href="/" className="hover:text-[var(--novar-yellow)]">Home</Link>
        <Link href="/portfolio" className="hover:text-[var(--novar-yellow)]">Portfolio</Link>
        <Link href="/collab" className="hover:text-[var(--novar-yellow)]">Collab & Commission</Link>
        <Link href="/about" className="hover:text-[var(--novar-yellow)]">About</Link>
        <Link href="/community" className="hover:text-[var(--novar-yellow)]">Community</Link>
      </div>

      {/* Mobile Menu Button */}
      <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
        ☰
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-[var(--navbar-bg)] p-4 shadow-md">
          <Link href="/" className="block py-2 hover:text-[var(--novar-yellow)]" onClick={() => setIsOpen(false)}>Home</Link>
          <Link href="/portfolio" className="block py-2 hover:text-[var(--novar-yellow)]" onClick={() => setIsOpen(false)}>Portfolio</Link>
          <Link href="/collab" className="block py-2 hover:text-[var(--novar-yellow)]" onClick={() => setIsOpen(false)}>Collab & Commission</Link>
          <Link href="/about" className="block py-2 hover:text-[var(--novar-yellow)]" onClick={() => setIsOpen(false)}>About</Link>
          <Link href="/community" className="block py-2 hover:text-[var(--novar-yellow)]" onClick={() => setIsOpen(false)}>Community</Link>
        </div>
      )}
    </nav>
  );
}
