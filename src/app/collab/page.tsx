"use client";
import { useState } from "react";

export default function CollabPage() {
  const [formType, setFormType] = useState("collaboration");
  const [commissionType, setCommissionType] = useState("Advertisement"); // Default verdi

  return (
    <div className="min-h-screen py-20 px-6">      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-5xl font-bold mb-6">Collab & Commission</h1>
        <p className="text-lg text-gray-300">
          Want to work with Novar? Choose whether you want to collaborate or request a commission.
        </p>

        {/* Toggle buttons */}
        <div className="mt-6 flex justify-center space-x-4">
          <button
            onClick={() => setFormType("collaboration")}
            className={`px-6 py-3 rounded-lg font-bold text-white ${
              formType === "collaboration"
                ? "bg-[var(--novar-yellow)]"
                : "bg-gray-700 hover:bg-gray-600"
            }`}
          >
            Collaboration Form
          </button>
          <button
            onClick={() => setFormType("commission")}
            className={`px-6 py-3 rounded-lg font-bold text-white ${
              formType === "commission"
                ? "bg-[var(--novar-yellow)]"
                : "bg-gray-700 hover:bg-gray-600"
            }`}
          >
            Commission Form
          </button>
        </div>
      </div>

      {/* Forms */}
      <div className="max-w-3xl mx-auto mt-10 bg-gray-800 p-6 rounded-lg shadow-lg">
        {formType === "collaboration" ? (
          <form>
            <h2 className="text-3xl font-semibold mb-4 text-[var(--novar-yellow)]">Collaboration Form</h2>
            <label className="block mb-2 text-lg">Your Name</label>
            <input type="text" className="w-full p-2 rounded-md bg-gray-700 text-white mb-4" placeholder="Enter your name" />
            
            <label className="block mb-2 text-lg">Your Email</label>
            <input type="email" className="w-full p-2 rounded-md bg-gray-700 text-white mb-4" placeholder="Enter your email" />
            
            <label className="block mb-2 text-lg">Project Description</label>
            <textarea className="w-full p-2 rounded-md bg-gray-700 text-white mb-4" rows={4} placeholder="Describe your project"></textarea>
            
            <button type="submit" className="w-full mt-4 bg-[var(--novar-yellow)] hover:brightness-110 px-6 py-3 rounded-lg text-white font-bold">
              Submit
            </button>
          </form>
        ) : (
          <form>
            <h2 className="text-3xl font-semibold mb-4 text-[var(--novar-yellow)]">Commission Form</h2>
            <label className="block mb-2 text-lg">Your Name</label>
            <input type="text" className="w-full p-2 rounded-md bg-gray-700 text-white mb-4" placeholder="Enter your name" />
            
            <label className="block mb-2 text-lg">Your Email</label>
            <input type="email" className="w-full p-2 rounded-md bg-gray-700 text-white mb-4" placeholder="Enter your email" />
            
            <label className="block mb-2 text-lg">Type of Commission</label>
            <select 
              className="w-full p-2 rounded-md bg-gray-700 text-white mb-4"
              value={commissionType} 
              onChange={(e) => setCommissionType(e.target.value)}
            >
              <option value="Advertisement">Advertisement</option>
              <option value="Photoshoot">Photoshoot</option>
              <option value="Short Film">Short Film</option>
              <option value="3D Printing">3D Printing</option>
              <option value="Prop Making">Prop Making</option>
            </select>
            
            <label className="block mb-2 text-lg">Details</label>
            <textarea className="w-full p-2 rounded-md bg-gray-700 text-white mb-4" rows={4} placeholder="Describe what you need"></textarea>
            
            <button type="submit" className="w-full mt-4 bg-[var(--novar-yellow)] hover:brightness-110 px-6 py-3 rounded-lg text-white font-bold">
              Submit
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
