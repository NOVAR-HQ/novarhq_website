"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { db } from "@/firebase/firebaseConfig";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";

export default function MockAuthPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  const validateInput = () => {
    if (!email.includes("@") || !email.includes(".")) {
      alert("Please enter a valid email address.");
      return false;
    }
    if (phone.length < 8 || isNaN(Number(phone))) {
      alert("Phone number must be at least 8 digits long.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (type: "register" | "login") => {
    if (!validateInput()) return;

    try {
      const usersRef = collection(db, "mock_users");

      if (type === "login") {
        // Check if user exists in Firestore
        const q = query(usersRef, where("email", "==", email));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
          alert("No account found. Please register.");
          return;
        }

        alert("Login successful! Redirecting to Novar HQ...");
        router.push("/"); // Redirect to Novar main page
        return;
      }

      // Register User
      await addDoc(usersRef, {
        email,
        password, // ⚠️ UNHASHED - FOR TESTING ONLY
        phone,
        createdAt: new Date().toISOString(),
      });

      setMessage("Thanks for signing up!");
      setEmail("");
      setPassword("");
      setPhone("");
    } catch (error) {
      console.error("Error saving user data:", error);
      setMessage("Something went wrong. Try again.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6">
      <h1 className="text-4xl font-bold text-[var(--novar-yellow)] text-center">
        Mock Login & Register
      </h1>

      {message && <p className="mt-4 text-green-500">{message}</p>}

      <div className="mt-6 w-full max-w-xs flex flex-col">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input-field p-2 border rounded-md mt-2"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input-field p-2 border rounded-md mt-2"
        />
        <input
          type="tel"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="input-field p-2 border rounded-md mt-2"
        />

        <button
          onClick={() => handleSubmit("register")}
          className="mt-4 btn-primary w-full"
        >
          Register
        </button>
        <button
          onClick={() => handleSubmit("login")}
          className="mt-2 btn-secondary w-full"
        >
          Login
        </button>
      </div>
    </div>
  );
}
