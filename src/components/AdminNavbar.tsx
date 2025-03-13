"use client";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";

export default function AdminNavbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-[var(--navbar-bg)] text-white py-3 px-6 fixed top-0 w-full z-50 shadow-md flex items-center justify-between">
      {/* Novar Banner */}
      <Link href="/" className="flex items-center">
        <Image src="/novar-banner.png" alt="Novar Banner" width={150} height={40} />
      </Link>

      {/* Hamburger Menu (Visible on Small Screens) */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="md:hidden focus:outline-none"
      >
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M4 6h16M4 12h16m-7 6h7" />
        </svg>
      </button>

      {/* Admin Links (Hidden in Mobile, Shown in Desktop) */}
      <div className="hidden md:flex space-x-6">
        <Link href="/admin" className={`nav-link ${pathname === "/admin" ? "active" : ""}`}>
          Dashboard
        </Link>
        <Link href="/admin/posts" className={`nav-link ${pathname === "/admin/posts" ? "active" : ""}`}>
          Manage Posts
        </Link>
        <Link href="/admin/forms" className={`nav-link ${pathname === "/admin/forms" ? "active" : ""}`}>
          Manage Forms
        </Link>
        <Link href="/admin/createpost" className={`nav-link ${pathname === "/admin/createpost" ? "active" : ""}`}>
          Create Post
        </Link>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="absolute top-16 left-0 w-full bg-[var(--navbar-bg)] flex flex-col items-center md:hidden shadow-md">
          <Link href="/admin" className="nav-link block py-3 w-full text-center" onClick={() => setMenuOpen(false)}>
            Dashboard
          </Link>
          <Link href="/admin/posts" className="nav-link block py-3 w-full text-center" onClick={() => setMenuOpen(false)}>
            Manage Posts
          </Link>
          <Link href="/admin/forms" className="nav-link block py-3 w-full text-center" onClick={() => setMenuOpen(false)}>
            Manage Forms
          </Link>
          <Link href="/admin/createpost" className="nav-link block py-3 w-full text-center" onClick={() => setMenuOpen(false)}>
            Create Post
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
