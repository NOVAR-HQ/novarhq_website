export default function Footer() {
  return (
    <footer className="bg-[var(--navbar-bg)] text-white text-center py-4 mt-10">
      <p className="text-sm opacity-70">© {new Date().getFullYear()} Novar HQ. All rights reserved.</p>

      {/* Menu Links (Text Only, Not Clickable) */}
      <div className="mt-2 text-sm opacity-70">
        Portfolio | Community | Collab & Commission | About
      </div>

      {/* Legal & Contact Info (Text Only, Not Clickable) */}
      <div className="mt-1 text-xs opacity-50">
        Terms of Service | Privacy Policy | Dashboard
      </div>

      {/* Social Media Icons */}
      <div className="mt-2 flex justify-center space-x-4 text-lg">
        <a href="https://instagram.com/novarhq" target="_blank" rel="noopener noreferrer">
          
        </a>
        <a href="https://tiktok.com/@novarhq" target="_blank" rel="noopener noreferrer">
          
        </a>
        <a href="https://youtube.com/@novarhq" target="_blank" rel="noopener noreferrer">
          
        </a>
        <a href="https://discord.gg/gGufQ9p7Ak" target="_blank" rel="noopener noreferrer">
          
        </a>
        <a href="https://www.facebook.com/profile.php?id=61572770470991" target="_blank" rel="noopener noreferrer">
          
        </a>
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
          
        </a>
      </div>
    </footer>
  );
}
