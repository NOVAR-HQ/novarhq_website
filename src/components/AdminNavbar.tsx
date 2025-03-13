"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

export default function AdminNavbar() {
  const pathname = usePathname();

  return (
    <nav className="bg-[var(--navbar-bg)] text-white py-3 px-6 fixed top-0 w-full z-50 shadow-md flex items-center justify-between">
      {/* Novar Banner */}
      <Link href="/" className="flex items-center">
        <Image src="/novar-banner.png" alt="Novar Banner" width={150} height={40} />
      </Link>

      {/* Admin Links */}
      <div className="flex space-x-6">
        <Link href="/admin" className={`nav-link ${pathname === "/admin" ? "active" : ""}`}>
          Dashboard
        </Link>
        <Link href="/admin/posts" className={`nav-link ${pathname === "/admin/posts" ? "active" : ""}`}>
          Manage Posts
        </Link>
        <Link href="/admin/forms" className={`nav-link ${pathname === "/admin/forms" ? "active" : ""}`}>
          Manage Forms
        </Link>
      </div>

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
