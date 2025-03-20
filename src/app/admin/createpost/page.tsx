"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { db } from "@/firebase/firebaseConfig";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { uploadToFirebaseStorage } from "@/utils/uploadImage"; // Funksjon for bildeopplasting

export default function CreatePostPage() {
  const router = useRouter();
  const [title, setTitle] = useState<string>("");
  const [creator, setCreator] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [link, setLink] = useState<string>("");
  const [category, setCategory] = useState<string>("portfolio");
  const [images, setImages] = useState<File[]>([]);
  const [uploading, setUploading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  // Håndter bildevalg (maks 5 bilder)
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const selectedFiles = Array.from(e.target.files);
    if (selectedFiles.length + images.length > 5) {
      alert("Du kan kun laste opp maks 5 bilder!");
      return;
    }

    setImages([...images, ...selectedFiles]);
  };

// Handle removing an image before uploading
const handleRemoveImage = (index: number) => {
  setImages((prevImages) => prevImages.filter((_, i) => i !== index));
};


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);
    setErrorMessage("");

    try {
      let imageUrls: string[] = [];

      // Last opp alle bildene til Firebase Storage
      if (images.length > 0) {
        console.log("Laster opp bilder...");
        imageUrls = await Promise.all(images.map(uploadToFirebaseStorage));
        console.log("Bilder lastet opp:", imageUrls);
      }

      // Kategorihåndtering (Community → Portfolio & Community)
      const categories = category === "community" ? ["portfolio", "community"] : ["portfolio"];

      console.log("Legger til post i Firestore...");
      await addDoc(collection(db, "posts"), {
        title,
        creator,
        description,
        link: link || null,
        images: imageUrls, // Lagrer en liste med bilder
        category: categories,
        timestamp: serverTimestamp(),
      });

      console.log("Post lagt til!");
      setTitle("");
      setCreator("");
      setDescription("");
      setLink("");
      setImages([]);
      router.push("/admin/posts");
    } catch (error) {
      console.error("Feil ved lagring av post:", error);
      setErrorMessage("Kunne ikke lagre posten.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center pt-20">
      <h1 className="text-4xl font-bold text-[var(--novar-yellow)] mb-6">Lag en ny post</h1>

      <div className="w-full max-w-3xl p-6 bg-[var(--novar-blue-light)] rounded-lg">
        {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}

        <form onSubmit={handleSubmit}>
          <label className="block mb-2">Tittel:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="input-field mb-4"
            required
          />

          <label className="block mb-2">Skaper:</label>
          <input
            type="text"
            value={creator}
            onChange={(e) => setCreator(e.target.value)}
            className="input-field mb-4"
            required
          />

          <label className="block mb-2">Beskrivelse:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="input-field mb-4"
            required
          />

          <label className="block mb-2">Link (valgfritt):</label>
          <input
            type="text"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            className="input-field mb-4"
          />

          <label className="block mb-2">Kategori:</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="input-field mb-4"
          >
            <option value="portfolio">Portfolio</option>
            <option value="community">Community</option>
          </select>

          <label className="block mb-2">Last opp bilder (Maks 5):</label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageChange}
            className="input-field mb-4"
          />

         {/* Forhåndsvisning av valgte bilder med fjern-knapp */}
{images.length > 0 && (
  <div className="mb-4">
    <p>Bilder valgt: {images.length}/5</p>
    <div className="grid grid-cols-3 gap-2">
      {images.map((img, idx) => (
        <div key={idx} className="relative">
          <img
            src={URL.createObjectURL(img)}
            alt="preview"
            className="w-full rounded-md"
          />
          <button
            className="absolute top-0 right-0 bg-red-500 text-white text-xs px-2 py-1 rounded-full"
            onClick={() => handleRemoveImage(idx)}
          >
            ✖
          </button>
        </div>
      ))}
    </div>
  </div>
)}

          <button type="submit" className="btn-primary w-full" disabled={uploading}>
            {uploading ? "Laster opp..." : "Publiser"}
          </button>
        </form>
      </div>
    </div>
  );
}
