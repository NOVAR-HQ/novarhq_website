import { FaInstagram, FaYoutube, FaTiktok, FaFacebook, FaLinkedin, FaDiscord } from "react-icons/fa";
import Image from "next/image";

export default function Home() {
  return (
<div className="bg-[#03405f] text-white">
{/* Hero Section */}
      <section className="h-screen flex flex-col items-center justify-center text-center">
      <Image src="/novar-icon.png" alt="Novar Icon" width={96} height={96} className="mb-4" />
      <h1 className="text-5xl font-bold">Novar</h1>
        <p className="text-2xl mt-4"> Creativity meets technology</p>

        {/* Sosiale medier ikoner */}
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
          <a href="https://www.facebook.com/profile.php?id=61572770470991" target="_blank" rel="noopener noreferrer">
            <FaFacebook className="text-white hover:text-[var(--novar-yellow)] text-3xl" />
          </a>
          <a href="https://www.linkedin.com/company/novar-hq" target="_blank" rel="noopener noreferrer">
            <FaLinkedin className="text-white hover:text-[var(--novar-yellow)] text-3xl" />
          </a>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 px-6 text-center">
        <h2 className="text-4xl font-semibold">About Novar</h2>
        <p className="mt-4 max-w-3xl mx-auto">
        Novar is a place where dreamers come together to push the boundaries of what is possible.         </p>
        <a href="/about" className="mt-6 inline-block bg-[var(--novar-yellow)] hover:brightness-110 px-6 py-3 text-lg rounded-lg text-white font-bold">
          Learn More
        </a>
      </section>

      {/* Portfolio Preview */}
      <section className="py-20 px-6 text-center">
        <h2 className="text-4xl font-semibold">Portfolio</h2>
        <p className="mt-4 max-w-3xl mx-auto">
          Explore our past, present, and future projects.</p>
        <a href="/portfolio" className="mt-6 inline-block bg-[var(--novar-yellow)] hover:brightness-110 px-6 py-3 text-lg rounded-lg text-white font-bold">
          View More
        </a>
      </section>

      {/* Collaboration & Mentoring */}
      <section className="py-20 px-6 text-center">
        <h2 className="text-4xl font-semibold">Collab & Mentoring</h2>
        <p className="mt-4 max-w-3xl mx-auto">Want to work with us or learn from our experience? Let’s create together!</p>
        <a href="/collab" className="mt-6 inline-block bg-[var(--novar-yellow)] hover:brightness-110 px-6 py-3 text-lg rounded-lg text-white font-bold">
          Get Involved
        </a>
      </section>

      {/* Community Section */}
      <section className="py-20 px-6 text-center">
        <h2 className="text-4xl font-semibold">Join the Community</h2>
        <p className="mt-4 max-w-3xl mx-auto">Share your projects and connect with other creators.</p>
        <a href="/community" className="mt-6 inline-block bg-[var(--novar-yellow)] hover:brightness-110 px-6 py-3 text-lg rounded-lg text-white font-bold">
          Join Now
        </a>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-6 text-center">
        <h2 className="text-4xl font-semibold">Contact Us</h2>
        <p className="mt-4 max-w-3xl mx-auto">Have questions or ideas? Let’s talk!</p>
        <a href="mailto:contact@novarhq.com" className="mt-6 inline-block bg-[var(--novar-yellow)] hover:brightness-110 px-6 py-3 text-lg rounded-lg text-white font-bold">
          Email Us
        </a>
      </section>
    </div>
  );
}
