"use client";
import { useState } from "react";

export default function CollabPage() {
  const [formType, setFormType] = useState("collaboration");
  const [commissionType, setCommissionType] = useState("Advertisement");

  return (
    <div className="min-h-screen py-20 px-6 bg-primary text-primary">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-5xl font-bold mb-6">Collab & Commission</h1>
        <p className="text-lg text-secondary">
          Want to work with Novar? Choose whether you want to collaborate or request a commission.
        </p>

        {/* Toggle Buttons */}
        <div className="mt-6 flex justify-center space-x-4">
          <button
            onClick={() => setFormType("collaboration")}
            className={`px-6 py-3 rounded-lg font-bold text-white transition-all ${
              formType === "collaboration"
                ? "btn-primary"
                : "btn-inactive"
            }`}
          >
            Collaboration Form
          </button>
          <button
            onClick={() => setFormType("commission")}
            className={`px-6 py-3 rounded-lg font-bold text-white transition-all ${
              formType === "commission"
                ? "btn-primary"
                : "btn-inactive"
            }`}
          >
            Commission Form
          </button>
        </div>
      </div>

      {/* Forms */}
      <div className="max-w-3xl mx-auto mt-10 box">
        {formType === "collaboration" ? (
          <form>
            <h2 className="text-3xl font-semibold mb-4 text-accent">Collaboration Form</h2>

            <label className="block mb-2 text-lg">Your Name</label>
            <input type="text" className="input-field mb-4" placeholder="Enter your name" />

            <label className="block mb-2 text-lg">Your Email</label>
            <input type="email" className="input-field mb-4" placeholder="Enter your email" />

            <label className="block mb-2 text-lg">Project Description</label>
            <textarea className="input-field mb-4" rows={4} placeholder="Describe your project"></textarea>

            <button type="submit" className="w-full mt-4 btn-primary">
              Submit
            </button>
          </form>
        ) : (
          <form>
            <h2 className="text-3xl font-semibold mb-4 text-accent">Commission Form</h2>

            <label className="block mb-2 text-lg">Your Name</label>
            <input type="text" className="input-field mb-4" placeholder="Enter your name" />

            <label className="block mb-2 text-lg">Your Email</label>
            <input type="email" className="input-field mb-4" placeholder="Enter your email" />

            <label className="block mb-2 text-lg">Type of Commission</label>
            <select className="input-field mb-4" value={commissionType} onChange={(e) => setCommissionType(e.target.value)}>
              <option value="Advertisement">Advertisement</option>
              <option value="Photoshoot">Photoshoot</option>
              <option value="Short Film">Short Film</option>
              <option value="3D Printing">3D Printing</option>
              <option value="Prop Making">Prop Making</option>
            </select>

            <label className="block mb-2 text-lg">Details</label>
            <textarea className="input-field mb-4" rows={4} placeholder="Describe what you need"></textarea>

            <button type="submit" className="w-full mt-4 btn-primary">
              Submit
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
