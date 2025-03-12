"use client"; // This must be here to allow hooks

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import AdminNavbar from "@/components/AdminNavbar";

export default function NavbarSwitcher() {
  const pathname = usePathname();
  const isAdminPage = pathname.startsWith("/admin"); // Check if it's an admin page

  return isAdminPage ? <AdminNavbar /> : <Navbar />;
}
