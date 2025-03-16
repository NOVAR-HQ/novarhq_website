"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Next.js router
import { auth, db } from "@/firebase/firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
  signOut,
  onAuthStateChanged,
  User,
} from "firebase/auth";
import { collection, doc, setDoc } from "firebase/firestore";

export default function AuthPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter(); // Initialize router

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleRegister = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const newUser = userCredential.user;

      // Store email & password in Firestore (⚠️ plaintext for testing only)
      await setDoc(doc(collection(db, "users"), newUser.uid), {
        email,
        password, // ⚠️ Unhashed for testing! Don't use in production.
        createdAt: new Date().toISOString(),
      });

      // Send email verification
      await sendEmailVerification(newUser);
      alert("Verification email sent! Please check your inbox.");

      setUser(newUser);
    } catch (error: any) {
      console.error("Registration failed", error);
      alert("Error registering: " + (error.message || "Unknown error."));
    }
  };

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const loggedInUser = userCredential.user;

      // Check if the email is verified
      if (!loggedInUser.emailVerified) {
        alert("Your email is not verified. Please check your inbox.");
        return;
      }

      router.push("/dashboard"); // Redirect to a dashboard or main page after login
    } catch (error: any) {
      console.error("Login failed", error);

      switch (error.code) {
        case "auth/invalid-credential":
          alert("Invalid email or password. Please try again.");
          break;
        case "auth/user-not-found":
          alert("No user found with this email.");
          break;
        case "auth/wrong-password":
          alert("Incorrect password.");
          break;
        case "auth/too-many-requests":
          alert("Too many failed login attempts. Try again later.");
          break;
        default:
          alert("Login failed: " + (error.message || "Unknown error."));
      }
    }
  };

  const handlePasswordReset = async () => {
    if (!email) {
      alert("Please enter your email first.");
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      alert("Password reset email sent! Check your inbox.");
    } catch (error: any) {
      console.error("Password reset failed", error);
      alert("Error resetting password: " + (error.message || "Unknown error."));
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-center text-lg">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6">
      <h1 className="text-4xl font-bold text-[var(--novar-yellow)] text-center">
        {user ? `Welcome, ${user.email}` : "Login or Register"}
      </h1>

      {!user ? (
        <>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input-field mt-4"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-field mt-2"
          />
          <div className="flex flex-col mt-4 space-y-3 w-full max-w-xs">
            <button onClick={handleLogin} className="btn-primary w-full">
              Login
            </button>
            <button onClick={handleRegister} className="btn-primary w-full">
              Register
            </button>
            <button onClick={handlePasswordReset} className="btn-secondary w-full">
              Forgot Password?
            </button>
          </div>
        </>
      ) : (
        <button onClick={handleLogout} className="mt-6 btn-primary">
          Logout
        </button>
      )}
    </div>
  );
}
