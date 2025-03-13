"use client";
import { useRouter } from "next/navigation";

export default function AdminLanding() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-6">
      <h1 className="text-4xl font-bold text-[var(--novar-yellow)]">Restricted Area</h1>
      <p className="mt-4 text-lg text-secondary">
        You are about to enter the Novar admin panel. If you are not an admin, please return to the main site.
      </p>

      <div className="mt-6 flex space-x-4">
        <button onClick={() => router.push("/")} className="btn-primary">
          Return to Novar HQ
        </button>
        <button onClick={() => router.push("/admin")} className="btn-primary">
          Proceed to Admin
        </button>
      </div>
    </div>
  );
}
