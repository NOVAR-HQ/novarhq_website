"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gray-800 px-4 py-2 fixed w-full top-0 shadow-md z-50 flex justify-between items-center">
      <Link href="/">
        <Image src="/novar-banner.png" alt="Novar Banner" width={120} height={40} priority />
      </Link>

      <div className="hidden md:flex space-x-6">
        <Link href="/" className="text-white hover:text-yellow-500">Home</Link>
        <Link href="/portfolio" className="text-white hover:text-yellow-500">Portfolio</Link>
        <Link href="/collab" className="text-white hover:text-yellow-500">Collab & Commission</Link>
        <Link href="/about" className="text-white hover:text-yellow-500">About</Link>
        <Link href="/community" className="text-white hover:text-yellow-500">Community</Link>
      </div>

      {/* Mobile Menu Button */}
      <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
        ☰
      </button>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-gray-700 p-4 absolute w-full left-0">
          <Link href="/" className="block py-2 text-white hover:text-yellow-500" onClick={() => setIsOpen(false)}>Home</Link>
          <Link href="/portfolio" className="block py-2 text-white hover:text-yellow-500" onClick={() => setIsOpen(false)}>Portfolio</Link>
          <Link href="/collab" className="block py-2 text-white hover:text-yellow-500" onClick={() => setIsOpen(false)}>Collab & Commission</Link>
          <Link href="/about" className="block py-2 text-white hover:text-yellow-500" onClick={() => setIsOpen(false)}>About</Link>
          <Link href="/community" className="block py-2 text-white hover:text-yellow-500" onClick={() => setIsOpen(false)}>Community</Link>
        </div>
      )}
    </nav>
  );
}
