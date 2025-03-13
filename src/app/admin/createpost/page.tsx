"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { db } from "@/firebase/firebaseConfig";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { uploadToFirebaseStorage } from "@/utils/uploadImage"; // Import fixed upload function

export default function CreatePostPage() {
  const router = useRouter();
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [link, setLink] = useState<string>("");
  const [category, setCategory] = useState<string>("community");
  const [image, setImage] = useState<File | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);
    setErrorMessage("");

    try {
      let imageUrl: string | null = null;
      if (image) {
        console.log("Uploading image...");
        imageUrl = await uploadToFirebaseStorage(image);
        console.log("Image uploaded successfully:", imageUrl);
      }

      console.log("Adding post to Firestore...");
      const collectionPath = category === "community" ? "community_posts" : "portfolio_posts";

      await addDoc(collection(db, collectionPath), {
        title,
        description,
        link: link || null,
        imageUrl: imageUrl || null,
        timestamp: serverTimestamp(),
      });

      console.log("Post added successfully!");
      setTitle("");
      setDescription("");
      setLink("");
      setImage(null);
      router.push("/admin/posts"); // Redirect to Manage Posts
    } catch (error) {
      console.error("Error adding post:", error);
      setErrorMessage("Failed to add post.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center pt-20">
      <h1 className="text-4xl font-bold text-[var(--novar-yellow)] mb-6">Create a New Post</h1>

      <div className="w-full max-w-3xl p-6 bg-[var(--novar-blue-light)] rounded-lg">
        {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}

        <form onSubmit={handleSubmit}>
          <label className="block mb-2">Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="input-field mb-4"
            required
          />

          <label className="block mb-2">Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="input-field mb-4"
            required
          />

          <label className="block mb-2">Link (Optional):</label>
          <input
            type="text"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            className="input-field mb-4"
          />

          <label className="block mb-2">Category:</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="input-field mb-4"
          >
            <option value="community">Community</option>
            <option value="portfolio">Portfolio</option>
          </select>

          <label className="block mb-2">Upload Image:</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files?.[0] || null)}
            className="input-field mb-4"
          />

          <button type="submit" className="btn-primary w-full" disabled={uploading}>
            {uploading ? "Uploading..." : "Post"}
          </button>
        </form>
      </div>
    </div>
  );
}
