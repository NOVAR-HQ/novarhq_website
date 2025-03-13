import "./globals.css";
import Footer from "@/components/Footer";
import NavbarSwitcher from "@/components/NavbarSwitcher";

export const metadata = {
  title: "Novar HQ",
  description: "Innovasjon møter kreativitet – NovarHQ",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Force Scroll to Top Script */}
        <script dangerouslySetInnerHTML={{
          __html: `
            window.history.scrollRestoration = 'manual';
            window.onload = function() {
              window.scrollTo(0, 0);
            };
          `,
        }} />
      </head>
      <body className="bg-[var(--novar-blue)] text-white">
        <NavbarSwitcher />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
