"use client";
import { useState } from "react";
import { db } from "@/firebase/firebaseConfig";
import { collection, addDoc } from "firebase/firestore";

export default function CollabPage() {
  const [formType, setFormType] = useState("collaboration");
  const [commissionType, setCommissionType] = useState("Advertisement");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [details, setDetails] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const formData = {
      name,
      email,
      details,
      type: formType, // Sørger for at type = "collaboration" eller "commission"
      commissionType: formType === "commission" ? commissionType : null, // Kun for commissions
      timestamp: new Date(),
    };

    try {
      await addDoc(collection(db, "forms"), formData);
      alert("Form submitted successfully!");
      setName("");
      setEmail("");
      setDetails("");
      setCommissionType("Advertisement");
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to submit form.");
    }
  };

  return (
    <div className="min-h-screen py-20 px-6 bg-primary text-primary">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-5xl font-bold mb-6">Collab & Commission</h2>
        <p className="text-lg text-secondary">
          Want to work with Novar? Choose whether you want to collaborate or request a commission.
        </p>

        {/* Toggle Buttons */}
        <div className="mt-6 flex justify-center space-x-4">
          <button
            onClick={() => setFormType("collaboration")}
            className={`px-6 py-3 rounded-lg font-bold text-white transition-all ${
              formType === "collaboration" ? "btn-primary" : "btn-inactive"
            }`}
          >
            Collaboration Form
          </button>
          <button
            onClick={() => setFormType("commission")}
            className={`px-6 py-3 rounded-lg font-bold text-white transition-all ${
              formType === "commission" ? "btn-primary" : "btn-inactive"
            }`}
          >
            Commission Form
          </button>
        </div>
      </div>

      {/* Forms */}
      <div className="max-w-3xl mx-auto mt-10 box">
        <form onSubmit={handleSubmit}>
          <h2 className="text-3xl font-semibold mb-4 text-accent">
            {formType === "collaboration" ? "Collaboration Form" : "Commission Form"}
          </h2>

          <label className="block mb-2 text-lg">Your Name</label>
          <input type="text" className="input-field mb-4" placeholder="Enter your name" value={name} onChange={(e) => setName(e.target.value)} required />

          <label className="block mb-2 text-lg">Your E-mail</label>
          <input type="email" className="input-field mb-4" placeholder="Enter your e-mail" value={email} onChange={(e) => setEmail(e.target.value)} required />

          {formType === "commission" && (
            <>
              <label className="block mb-2 text-lg">Type of Commission</label>
              <select className="input-field mb-4" value={commissionType} onChange={(e) => setCommissionType(e.target.value)} required>
                <option value="Advertisement">Advertisement</option>
                <option value="Photoshoot">Photoshoot</option>
                <option value="Short Film">Short Film</option>
                <option value="3D Printing">3D Printing</option>
                <option value="Prop Making">Prop Making</option>
              </select>
            </>
          )}

          <label className="block mb-2 text-lg">Details</label>
          <textarea className="input-field mb-4" rows={4} placeholder="Describe what you need" value={details} onChange={(e) => setDetails(e.target.value)} required></textarea>

          <button type="submit" className="w-full mt-4 btn-primary">Submit</button>
        </form>
      </div>
    </div>
  );
}
