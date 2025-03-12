import { FaInstagram, FaYoutube, FaTiktok, FaFacebook, FaDiscord } from "react-icons/fa";
import Image from "next/image";

export default function Home() {
  return (
    <div className="bg-[var(--novar-blue)] text-white">
      {/* Hero Section */}
      <section className="h-screen flex flex-col items-center justify-center text-center">
        <Image src="/novar-icon.png" alt="Novar Icon" width={96} height={96} className="mb-4" />
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
          <a href="https://www.facebook.com/profile.php?id=61572770470991" target="_blank" rel="noopener noreferrer">
            <FaFacebook className="text-white hover:text-[var(--novar-yellow)] text-3xl" />
          </a>
        </div>
      </section>

{/* Sections */}
{[
  { title: "About Novar", text: "Novar is a place where dreamers come together to push the boundaries of what is possible.", link: "/about", button: "Learn More" },
  { title: "Portfolio", text: "Explore our past, present, and future projects.", link: "/portfolio", button: "View More" },
  { title: "Collab & Commission", text: "Want to work with us or learn from our experience? Let’s create together!", link: "/collab", button: "Get Involved" },
  { title: "Join the Community", text: "Share your projects and connect with other creators.", link: "/community", button: "Join Now" },
  { title: "Contact Us", text: "Have questions or ideas? Let’s talk!", link: "mailto:contact@novarhq.com", button: "Email Us" }
].map((section, index) => (
  <section key={index} className="py-20 px-6 text-center">
    <h1 className="text-4xl font-semibold text-accent">{section.title}</h1>
    <p className="mt-4 max-w-3xl mx-auto text-secondary">{section.text}</p>
    <a href={section.link} className="mt-6 inline-block btn-primary">
      {section.button}
    </a>
  </section>
))}

    </div>
  );
}
