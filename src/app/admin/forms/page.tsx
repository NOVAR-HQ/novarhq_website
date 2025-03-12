"use client";
import { useState, useEffect } from "react";
import { db } from "@/firebase/firebaseConfig";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";

export default function AdminFormsPage() {
  const [forms, setForms] = useState<any[]>([]);
  const [filter, setFilter] = useState("all"); // Standard: Vis alle skjemaer
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchForms = async () => {
      setLoading(true);
      try {
        const querySnapshot = await getDocs(collection(db, "forms"));
        const fetchedForms = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setForms(fetchedForms);
      } catch (error) {
        console.error("Error fetching forms:", error);
      }
      setLoading(false);
    };

    fetchForms();
  }, []);

  const handleDelete = async (id: string) => {
    const confirmDelete = confirm("Are you sure you want to delete this form?");
    if (!confirmDelete) return;

    try {
      await deleteDoc(doc(db, "forms", id));
      setForms(forms.filter((form) => form.id !== id));
      alert("Form deleted successfully.");
    } catch (error) {
      console.error("Error deleting form:", error);
    }
  };

  // Filtrer skjemaene basert på type
  const filteredForms = forms.filter(
    (form) => filter === "all" || form.type === filter
  );
  

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold text-[var(--novar-yellow)]">Submitted Forms</h1>

      {/* Filter dropdown */}
      <select value={filter} onChange={(e) => setFilter(e.target.value)} className="input-field mt-4">
        <option value="all">All Forms</option>
        <option value="commission">Commission Requests</option>
        <option value="collaboration">Collaboration Requests</option>
      </select>

      {loading ? (
        <p className="mt-4">Loading forms...</p>
      ) : (
        <div className="mt-6 w-full max-w-3xl">
          {filteredForms.length === 0 ? (
            <p>No forms found.</p>
          ) : (
            filteredForms.map((form) => (
              <div key={form.id} className="box mb-4 p-4">
                <h2 className="text-xl font-bold">{form.name}</h2>
                <p className="text-secondary">{form.email}</p>
                <p className="mt-2">{form.message}</p>
                <p className="mt-2 text-sm text-gray-400">Type: {form.type}</p>
                <button onClick={() => handleDelete(form.id)} className="btn-inactive mt-2">
                  Delete
                </button>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
