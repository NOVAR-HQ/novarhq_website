import { FaInstagram, FaYoutube, FaTiktok, FaDiscord, FaGithub } from "react-icons/fa";
import Image from "next/image";

export default function Home() {
  return (
    <div className="bg-[var(--novar-blue)] text-white">
      {/* Hero Section */}
      <section className="h-screen flex flex-col items-center justify-center text-center">
        {/* Link Novar Icon to Admin Landing Page */}
        <a href="/admin-landing">
          <Image src="/novar-icon.png" alt="Novar Icon" width={96} height={96} className="mb-4 cursor-pointer" />
        </a>
        <h2 className="text-5xl font-bold">Novar</h2>
        <p className="text-2xl mt-4">Creativity meets Technology</p>

        {/* Social Media Icons */}
        <div className="mt-6 flex space-x-6">
          <a href="https://instagram.com/novarhq" target="_blank" rel="noopener noreferrer">
            <FaInstagram className="text-white hover:text-[var(--novar-yellow)] text-3xl" />
          </a>
          <a href="https://youtube.com/@novarhq" target="_blank" rel="noopener noreferrer">
            <FaYoutube className="text-white hover:text-[var(--novar-yellow)] text-3xl" />
          </a>
          <a href="https://tiktok.com/@novarhq" target="_blank" rel="noopener noreferrer">
            <FaTiktok className="text-white hover:text-[var(--novar-yellow)] text-3xl" />
          </a>
          <a href="https://discord.gg/gGufQ9p7Ak" target="_blank" rel="noopener noreferrer">
            <FaDiscord className="text-white hover:text-[var(--novar-yellow)] text-3xl" />
          </a>
          <a href="https://github.com/NOVAR-HQ" target="_blank" rel="noopener noreferrer">
            <FaGithub className="text-white hover:text-[var(--novar-yellow)] text-3xl" />
          </a>
        </div>
      </section>
    </div>
  );
}
