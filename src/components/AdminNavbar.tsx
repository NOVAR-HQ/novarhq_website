"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function AdminNavbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed w-full top-0 shadow-md z-50 flex justify-between items-center px-4 py-2 bg-[var(--navbar-bg)]">
      {/* Novar Banner */}
      <Link href="/" className="flex items-center">
        <Image src="/novar-banner.png" alt="Novar Banner" width={150} height={40} />
      </Link>

      {/* Desktop Menu */}
      <div className="hidden md:flex space-x-6">
        <Link href="/admin" className={`hover:text-[var(--novar-yellow)]`}>Dashboard</Link>
        <Link href="/admin/posts" className={`hover:text-[var(--novar-yellow)]`}>Manage Posts</Link>
        <Link href="/admin/forms" className={`hover:text-[var(--novar-yellow)]`}>Manage Forms</Link>
        <Link href="/admin/createpost" className={`hover:text-[var(--novar-yellow)]`}>Create Post</Link>
      </div>

      {/* Mobile Menu Button */}
      <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
        ☰
      </button>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-[var(--navbar-bg)] p-4 shadow-md">
          <Link href="/admin" className="block py-2 hover:text-[var(--novar-yellow)]" onClick={() => setIsOpen(false)}>Dashboard</Link>
          <Link href="/admin/posts" className="block py-2 hover:text-[var(--novar-yellow)]" onClick={() => setIsOpen(false)}>Manage Posts</Link>
          <Link href="/admin/forms" className="block py-2 hover:text-[var(--novar-yellow)]" onClick={() => setIsOpen(false)}>Manage Forms</Link>
          <Link href="/admin/createpost" className="block py-2 hover:text-[var(--novar-yellow)]" onClick={() => setIsOpen(false)}>Create Post</Link>
        </div>
      )}
    </nav>
  );
}
