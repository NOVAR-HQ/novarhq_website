"use client";
import { useEffect, useState } from "react";
import { auth } from "@/firebase/firebaseConfig";
import { GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged, User } from "firebase/auth";
import { useRouter } from "next/navigation";

export default function AdminPage() {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user && user.email?.endsWith("@novarhq.com")) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      if (!result.user.email?.endsWith("@novarhq.com")) {
        alert("Only @novarhq.com emails are allowed.");
        await signOut(auth);
      }
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      {user ? (
        <div className="text-center">
          <h1 className="text-4xl font-bold text-[var(--novar-yellow)]">Welcome, {user.displayName}</h1>
          <p className="mt-2 text-lg">Admin Dashboard</p>

          {/* Admin Navigasjon */}
          <div className="mt-6 flex flex-col gap-4">
            <a href="/admin/posts" className="btn-primary">Manage Posts</a>
            <a href="/admin/forms" className="btn-primary">View Forms</a>
          </div>

          {/* Logout Knapp */}
          <button onClick={handleLogout} className="mt-6 btn-inactive">
            Logout
          </button>
        </div>
      ) : (
        <div className="text-center">
          <h1 className="text-4xl font-bold text-[var(--novar-yellow)]">Admin Login</h1>
          <p className="mt-2 text-lg">Sign in with your @novarhq.com email.</p>
          <button onClick={handleLogin} className="mt-4 btn-primary">
            Sign in with Google
          </button>
        </div>
      )}
    </div>
  );
}
