"use client";
import { useState, useEffect } from "react";
import { db, storage } from "@/firebase/firebaseConfig";
import { collection, getDocs, doc, deleteDoc, updateDoc } from "firebase/firestore";
import { ref, deleteObject } from "firebase/storage";
import Image from "next/image";

export default function AdminPosts() {
  const [posts, setPosts] = useState<any[]>([]);
  const [category, setCategory] = useState("community"); // Default category
  const [loading, setLoading] = useState(true);
  const [editingPost, setEditingPost] = useState<any | null>(null);

  // Fetch posts from Firestore
  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const collectionPath = category === "community" ? "community_posts" : "portfolio_posts";
        const querySnapshot = await getDocs(collection(db, collectionPath));
        const fetchedPosts = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPosts(fetchedPosts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
      setLoading(false);
    };

    fetchPosts();
  }, [category]);

  // Delete post function
  const handleDelete = async (postId: string, imageUrl?: string) => {
    const confirmDelete = confirm("Are you sure you want to delete this post?");
    if (!confirmDelete) return;

    try {
      const collectionPath = category === "community" ? "community_posts" : "portfolio_posts";
      await deleteDoc(doc(db, collectionPath, postId));

      // Delete image from Firebase Storage if exists
      if (imageUrl) {
        const imageRef = ref(storage, imageUrl);
        await deleteObject(imageRef);
      }

      setPosts(posts.filter((post) => post.id !== postId));
      alert("Post deleted successfully.");
    } catch (error) {
      console.error("Error deleting post:", error);
      alert("Failed to delete post.");
    }
  };

  // Edit post function
  const handleEdit = async (postId: string) => {
    const newTitle = prompt("Enter new title:");
    const newDescription = prompt("Enter new description:");
    if (!newTitle || !newDescription) return;

    try {
      const collectionPath = category === "community" ? "community_posts" : "portfolio_posts";
      await updateDoc(doc(db, collectionPath, postId), {
        title: newTitle,
        description: newDescription,
      });

      setPosts(
        posts.map((post) =>
          post.id === postId ? { ...post, title: newTitle, description: newDescription } : post
        )
      );
      alert("Post updated successfully.");
    } catch (error) {
      console.error("Error updating post:", error);
      alert("Failed to update post.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center pt-20">
      <h1 className="text-4xl font-bold text-[var(--novar-yellow)] mb-6">Manage Posts</h1>

      {/* Category Selector */}
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="input-field mb-4"
      >
        <option value="community">Community Posts</option>
        <option value="portfolio">Portfolio Posts</option>
      </select>

      {loading ? (
        <p>Loading posts...</p>
      ) : posts.length === 0 ? (
        <p>No posts found.</p>
      ) : (
        <div className="w-full max-w-3xl">
          {posts.map((post) => (
            <div key={post.id} className="box mb-4 p-4">
              {post.imageUrl && (
                <Image
                  src={post.imageUrl}
                  alt={post.title}
                  width={600}
                  height={400}
                  className="w-full h-48 object-cover mb-4"
                />
              )}
              <h2 className="text-xl font-bold">{post.title}</h2>
              <p className="mt-2">{post.description}</p>
              <div className="mt-2 flex space-x-4">
                <button onClick={() => handleEdit(post.id)} className="btn-primary">
                  Edit
                </button>
                <button onClick={() => handleDelete(post.id, post.imageUrl)} className="btn-inactive">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
