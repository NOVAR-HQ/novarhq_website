"use client";
import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gray-800 p-4 fixed w-full top-0 shadow-md z-50">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link href="/">
          <span className="text-xl font-bold text-white">Novar HQ</span>
        </Link>
        <div className="hidden md:flex space-x-6">
          <Link href="/portfolio" className="hover:text-gray-300">Portfolio</Link>
          <Link href="/collab" className="hover:text-gray-300">Collab & Commission</Link>
          <Link href="/about" className="hover:text-gray-300">About</Link>
          <Link href="/community" className="hover:text-gray-300">Community</Link>
        </div>
        {/* Mobile Menu Button */}
        <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
          ☰
        </button>
      </div>
      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-gray-700 p-4 absolute w-full left-0">
          <Link href="/portfolio" className="block py-2" onClick={() => setIsOpen(false)}>Portfolio</Link>
          <Link href="/collab" className="block py-2" onClick={() => setIsOpen(false)}>Collab & Commission</Link>
          <Link href="/about" className="block py-2" onClick={() => setIsOpen(false)}>About</Link>
          <Link href="/community" className="block py-2" onClick={() => setIsOpen(false)}>Community</Link>
        </div>
      )}
    </nav>
  );
}
