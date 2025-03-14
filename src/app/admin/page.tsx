"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Import Next.js router
import { auth } from "@/firebase/firebaseConfig";
import { GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged, User } from "firebase/auth";
import AdminNavbar from "@/components/AdminNavbar";

export default function AdminPage() {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter(); // Initialize router

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user && user.email?.endsWith("@novarhq.com")) {
        setUser(user);
        setIsAdmin(true);
      } else {
        setUser(null);
        setIsAdmin(false);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      if (!result.user.email?.endsWith("@novarhq.com")) {
        alert("Only authorized emails are allowed, please contact Admin.");
        await signOut(auth);
      }
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
    setIsAdmin(false);
  };

  const handleBack = () => {
    router.push("/"); // Redirects to main page
  };

  // Show loading message while checking authentication state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-center text-lg">Loading...</p>
      </div>
    );
  }

  // If not logged in or not an admin, show login screen
  if (!user || !isAdmin) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6">
        <h1 className="text-4xl font-bold text-[var(--novar-yellow)] text-center">Admin Login</h1>
        <p className="mt-2 text-lg text-center">Sign in with your authorized Novar account.</p>
        
        <div className="flex flex-col mt-4 space-y-3">
          <button onClick={handleLogin} className="btn-primary">
            Sign in
          </button>
          <button onClick={handleBack} className="btn-inactive">
            Back
          </button>
        </div>
      </div>
    );
  }

  // If logged in as an admin, show the full admin panel
  return (
    <div>
      <AdminNavbar />
      <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
        <h1 className="text-4xl font-bold text-[var(--novar-yellow)]">Welcome, {user.displayName}</h1>
        <p className="mt-2 text-lg">You are logged in as an admin.</p>
        <button onClick={handleLogout} className="mt-4 btn-primary">
          Logout
        </button>
      </div>
    </div>
  );
}
