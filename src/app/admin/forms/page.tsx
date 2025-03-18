"use client";
import { useState, useEffect } from "react";
import { db } from "@/firebase/firebaseConfig";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";

interface FormData {
  id: string;
  name: string;
  email: string;
  details: string;
  type: string;
}

export default function AdminFormsPage() {
  const [forms, setForms] = useState<FormData[]>([]);
  const [filter, setFilter] = useState<string>("all");
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedForm, setSelectedForm] = useState<FormData | null>(null);

  useEffect(() => {
    const fetchForms = async () => {
      setLoading(true);
      try {
        const querySnapshot = await getDocs(collection(db, "forms"));
        const fetchedForms: FormData[] = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<FormData, "id">),
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
    if (!confirm("Are you sure you want to delete this form?")) return;
    try {
      await deleteDoc(doc(db, "forms", id));
      setForms(forms.filter((form) => form.id !== id));
      alert("Form deleted successfully.");
    } catch (error) {
      console.error("Error deleting form:", error);
    }
  };

  const filteredForms = forms.filter((form) => filter === "all" || form.type === filter);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-20">
      <h1 className="text-4xl font-bold text-[var(--novar-yellow)]">Submitted Forms</h1>
      <div className="w-full max-w-3xl mt-4 flex">
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="input-field px-3 py-2 border rounded-md w-40"
        >
          <option value="all">All Forms</option>
          <option value="commission">Commission Requests</option>
          <option value="collaboration">Collaboration Requests</option>
        </select>
      </div>

      {loading ? (
        <p className="mt-4">Loading forms...</p>
      ) : (
        <div className="mt-6 w-full max-w-3xl">
          {filteredForms.length === 0 ? (
            <p>No forms found.</p>
          ) : (
            filteredForms.map((form) => (
              <div 
                key={form.id} 
                className="box mb-4 p-4 cursor-pointer bg-[#03405f] text-white rounded-lg"
                onClick={() => setSelectedForm(form)}
              >
                <h2 className="text-xl font-bold text-[var(--novar-yellow)]">{form.name}</h2>
                <p className="text-secondary">{form.email}</p>
                <p className="mt-2 text-ellipsis overflow-hidden whitespace-nowrap">{form.details}</p>
                <p className="mt-2 text-sm text-gray-400">Type: {form.type}</p>
                <p className="text-blue-400 font-semibold mt-2">View More</p>
              </div>
            ))
          )}
        </div>
      )}

      {/* MODAL */}
      {selectedForm && (
        <div 
          className="fixed inset-0 flex items-center justify-center backdrop-blur-md bg-black bg-opacity-30 z-[100] px-4 py-10"
          onClick={() => setSelectedForm(null)} // Closes modal when clicking outside
        >
          <div 
            className="bg-[#03405f] text-white p-6 rounded-lg w-full max-w-md sm:max-w-lg max-h-[80vh] overflow-y-auto relative shadow-lg"
            onClick={(e) => e.stopPropagation()} // Prevents modal from closing when clicking inside
          >
            <button
              className="absolute top-3 right-3 text-2xl font-bold text-gray-300 hover:text-white"
              onClick={() => setSelectedForm(null)}
            >
              ✖
            </button>
            <h2 className="text-3xl font-bold mb-2 text-[var(--novar-yellow)]">{selectedForm.name}</h2>
            <p className="text-lg mb-2"><span className="font-semibold">Email:</span> {selectedForm.email}</p>
            <p className="text-lg mb-4"><span className="font-semibold">Details:</span> {selectedForm.details}</p>
            <p className="text-sm text-gray-300"><span className="font-semibold">Type:</span> {selectedForm.type}</p>
          </div>
        </div>
      )}
    </div>
  );
}
