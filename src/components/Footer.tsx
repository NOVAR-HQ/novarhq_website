import { FaInstagram, FaTiktok, FaYoutube, FaDiscord, FaFacebook, FaLinkedin } from "react-icons/fa";
import Link from "next/link";

export default function Footer() { 
  return (
    <footer className="bg-[var(--navbar-bg)] text-white text-center py-4 mt-10">
      <p className="text-sm opacity-70">© {new Date().getFullYear()} Novar HQ. All rights reserved.</p>

      {/* Clickable Menu Links */}
      <div className="mt-2 text-sm opacity-70">
        <Link href="/portfolio" className="hover:text-[var(--novar-yellow)]">Portfolio</Link> |
        <Link href="/community" className="hover:text-[var(--novar-yellow)]"> Community</Link> |
        <Link href="/collab" className="hover:text-[var(--novar-yellow)]"> Collab & Commission</Link> |
        <Link href="/about" className="hover:text-[var(--novar-yellow)]"> About</Link>
      </div>

      {/* Clickable Legal & Dashboard Links */}
      <div className="mt-1 text-xs opacity-50">
        <Link href="/terms" className="hover:text-[var(--novar-yellow)]">Terms of Service</Link> |
        <Link href="/privacy" className="hover:text-[var(--novar-yellow)]"> Privacy Policy</Link> |
        <Link href="/admin-landing" className="hover:text-[var(--novar-yellow)]"> Dashboard</Link>
      </div>

      {/* Clickable Social Media Icons */}
      <div className="mt-2 flex justify-center space-x-4 text-lg">
        <a href="https://instagram.com/novarhq" target="_blank" rel="noopener noreferrer">
          <FaInstagram className="hover:text-[var(--novar-yellow)]" />
        </a>
        <a href="https://tiktok.com/@novarhq" target="_blank" rel="noopener noreferrer">
          <FaTiktok className="hover:text-[var(--novar-yellow)]" />
        </a>
        <a href="https://youtube.com/@novarhq" target="_blank" rel="noopener noreferrer">
          <FaYoutube className="hover:text-[var(--novar-yellow)]" />
        </a>
        <a href="https://discord.gg/gGufQ9p7Ak" target="_blank" rel="noopener noreferrer">
          <FaDiscord className="hover:text-[var(--novar-yellow)]" />
        </a>
        <a href="https://www.facebook.com/profile.php?id=61572770470991" target="_blank" rel="noopener noreferrer">
          <FaFacebook className="hover:text-[var(--novar-yellow)]" />
        </a>
        <a href="https://www.linkedin.com/company/106260386" target="_blank" rel="noopener noreferrer">
          <FaLinkedin className="hover:text-[var(--novar-yellow)]" />
        </a>
      </div>
    </footer>
  );
}
