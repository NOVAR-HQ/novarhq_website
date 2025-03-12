import "./globals.css";
import Footer from "@/components/Footer";
import NavbarSwitcher from "@/components/NavbarSwitcher"; // Import the new component

export const metadata = {
  title: "Novar HQ",
  description: "Innovasjon møter kreativitet – NovarHQ",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-[var(--novar-blue)] text-white">
        <NavbarSwitcher /> {/* Automatically switches navbar */}
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
