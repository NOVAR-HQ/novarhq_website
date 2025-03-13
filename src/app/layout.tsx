import "./globals.css";
import Footer from "@/components/Footer";
import NavbarSwitcher from "@/components/NavbarSwitcher";
import ScrollToTop from "@/components/ScrollToTop"; // Import the new Scroll component

export const metadata = {
  title: "Novar HQ",
  description: "Innovasjon møter kreativitet – NovarHQ",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-[var(--novar-blue)] text-white">
        <ScrollToTop /> {/* Ensure the page always starts at the top */}
        <NavbarSwitcher /> {/* Automatically switches navbar */}
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
