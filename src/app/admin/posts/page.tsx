"use client";
import { useState, useEffect } from "react";
import { db, storage } from "@/firebase/firebaseConfig";
import { collection, getDocs, doc, deleteDoc, updateDoc } from "firebase/firestore";
import { ref, deleteObject, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import Image from "next/image";

interface PostData {
  id: string;
  title: string;
  creator: string;
  description: string;
  link?: string;
  imageUrl?: string;
}

export default function AdminPosts() {
  const [posts, setPosts] = useState<PostData[]>([]);
  const [category, setCategory] = useState<string>("community");
  const [loading, setLoading] = useState<boolean>(true);
  const [editingPost, setEditingPost] = useState<PostData | null>(null);
  const [newTitle, setNewTitle] = useState<string>("");
  const [newCreator, setNewCreator] = useState<string>("");
  const [newDescription, setNewDescription] = useState<string>("");
  const [newLink, setNewLink] = useState<string>("");
  const [newImage, setNewImage] = useState<File | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const collectionPath = category === "community" ? "community_posts" : "portfolio_posts";
        const querySnapshot = await getDocs(collection(db, collectionPath));
        const fetchedPosts: PostData[] = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<PostData, "id">),
        }));
        setPosts(fetchedPosts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
      setLoading(false);
    };

    fetchPosts();
  }, [category]);

  const handleDelete = async (postId: string, imageUrl?: string) => {
    if (!confirm("Are you sure you want to delete this post?")) return;

    try {
      const collectionPath = category === "community" ? "community_posts" : "portfolio_posts";
      await deleteDoc(doc(db, collectionPath, postId));

      if (imageUrl) {
        const imageRef = ref(storage, imageUrl);
        await deleteObject(imageRef);
      }

      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
      alert("Post deleted successfully.");
    } catch (error) {
      console.error("Error deleting post:", error);
      alert("Failed to delete post.");
    }
  };

  const handleEdit = (post: PostData) => {
    setEditingPost(post);
    setNewTitle(post.title || "");
    setNewCreator(post.creator || "");
    setNewDescription(post.description || "");
    setNewLink(post.link || "");
  };

  const handleUpdate = async () => {
    if (!editingPost) return;
    setUploading(true);

    try {
      let updatedImageUrl = editingPost.imageUrl;

      if (newImage) {
        if (editingPost.imageUrl) {
          const oldImageRef = ref(storage, editingPost.imageUrl);
          await deleteObject(oldImageRef);
        }

        const newImageRef = ref(storage, `posts/${Date.now()}_${newImage.name}`);
        const uploadTask = await uploadBytesResumable(newImageRef, newImage);
        updatedImageUrl = await getDownloadURL(uploadTask.ref);
      }

      const collectionPath = category === "community" ? "community_posts" : "portfolio_posts";
      await updateDoc(doc(db, collectionPath, editingPost.id), {
        title: newTitle,
        creator: newCreator,
        description: newDescription,
        link: newLink || null,
        imageUrl: updatedImageUrl || null,
      });

      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === editingPost.id
            ? {
                ...post,
                title: newTitle || post.title,
                creator: newCreator || post.creator,
                description: newDescription || post.description,
                link: newLink || post.link || "",
                imageUrl: updatedImageUrl || post.imageUrl,
              }
            : post
        )
      );
      

      alert("Post updated successfully!");
      setEditingPost(null);
      setNewImage(null);
    } catch (error) {
      console.error("Error updating post:", error);
      alert("Failed to update post.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center pt-20">
      <h1 className="text-4xl font-bold text-[var(--novar-yellow)] mb-6">Manage Posts</h1>

      <div className="w-full max-w-3xl mt-4 flex">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="input-field px-3 py-2 border rounded-md w-40"
        >
          <option value="community">Community Posts</option>
          <option value="portfolio">Portfolio Posts</option>
        </select>
      </div>

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
              <p className="text-secondary">By {post.creator}</p>
              <p className="mt-2">{post.description}</p>
              <p className="text-sm text-gray-400">{post.link ? `Link: ${post.link}` : "No link"}</p>
              <div className="mt-2 flex space-x-4">
                <button onClick={() => handleEdit(post)} className="btn-primary">
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

      {editingPost && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg max-w-lg">
            <h2 className="text-2xl font-bold mb-4">Edit Post</h2>

            <label className="block mb-2">Title:</label>
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="input-field mb-4"
              required
            />

            <label className="block mb-2">Creator:</label>
            <input
              type="text"
              value={newCreator}
              onChange={(e) => setNewCreator(e.target.value)}
              className="input-field mb-4"
              required
            />

            <label className="block mb-2">Description:</label>
            <textarea
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              className="input-field mb-4"
              required
            />

            <label className="block mb-2">Link (Optional):</label>
            <input
              type="text"
              value={newLink}
              onChange={(e) => setNewLink(e.target.value)}
              className="input-field mb-4"
            />

            <label className="block mb-2">Replace Image (Optional):</label>
            <input type="file" accept="image/*" onChange={(e) => setNewImage(e.target.files?.[0] || null)} className="input-field mb-4" />

            <div className="flex justify-between">
              <button onClick={handleUpdate} className="btn-primary" disabled={uploading}>
                {uploading ? "Updating..." : "Update"}
              </button>
              <button onClick={() => setEditingPost(null)} className="btn-inactive">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
