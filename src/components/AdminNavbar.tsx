"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

export default function AdminNavbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false); // State for hamburger menu

  return (
    <nav className="bg-[var(--navbar-bg)] text-white py-3 px-6 fixed top-0 w-full z-40 shadow-md flex items-center justify-between">
      {/* Novar Banner - Links to Admin Page */}
      <Link href="/admin" className="flex items-center">
        <Image src="/novar-banner.png" alt="Novar Banner" width={150} height={40} />
      </Link>

      {/* Desktop Menu */}
      <div className="hidden md:flex space-x-6">
        <Link href="/admin" className={`nav-link ${pathname === "/admin" ? "active" : ""}`}>
          Dashboard
        </Link>
        <Link href="/admin/createpost" className={`nav-link ${pathname === "/admin/createpost" ? "active" : ""}`}>
          Create Post
        </Link>
        <Link href="/admin/posts" className={`nav-link ${pathname === "/admin/posts" ? "active" : ""}`}>
          Manage Posts
        </Link>
        <Link href="/admin/forms" className={`nav-link ${pathname === "/admin/forms" ? "active" : ""}`}>
          Manage Forms
        </Link>
        <Link href="/" className={`nav-link ${pathname === "/" ? "active" : ""}`}>
          Novar HQ
        </Link>
      </div>

      {/* Mobile Menu Button */}
      <button className="md:hidden text-white text-2xl" onClick={() => setIsOpen(!isOpen)}>
        ☰
      </button>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-[var(--navbar-bg)] p-4 shadow-md flex flex-col items-center">
          <Link href="/admin" className="block py-2 nav-link" onClick={() => setIsOpen(false)}>
            Dashboard
          </Link>
          <Link href="/admin/createpost" className="block py-2 nav-link" onClick={() => setIsOpen(false)}>
            Create Post
          </Link>
          <Link href="/admin/posts" className="block py-2 nav-link" onClick={() => setIsOpen(false)}>
            Manage Posts
          </Link>
          <Link href="/admin/forms" className="block py-2 nav-link" onClick={() => setIsOpen(false)}>
            Manage Forms
          </Link>
          <Link href="/" className="block py-2 nav-link" onClick={() => setIsOpen(false)}>
            Novar HQ
          </Link>
        </div>
      )}

      {/* Admin Navbar Styles */}
      <style jsx>{`
        .nav-link {
          font-weight: bold;
          padding: 8px 16px;
          transition: 0.2s;
        }
        .nav-link:hover, .nav-link.active {
          color: var(--novar-yellow);
        }
      `}</style>
    </nav>
  );
}
