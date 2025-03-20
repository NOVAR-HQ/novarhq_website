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
  images: string[];
  category: string[];
}

export default function AdminPosts() {
  const [posts, setPosts] = useState<PostData[]>([]);
  const [category, setCategory] = useState<string>("all");
  const [loading, setLoading] = useState<boolean>(true);
  const [editingPost, setEditingPost] = useState<PostData | null>(null);
  const [newTitle, setNewTitle] = useState<string>("");
  const [newCreator, setNewCreator] = useState<string>("");
  const [newDescription, setNewDescription] = useState<string>("");
  const [newLink, setNewLink] = useState<string>("");
  const [newImages, setNewImages] = useState<File[]>([]);
  const [uploading, setUploading] = useState<boolean>(false);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const querySnapshot = await getDocs(collection(db, "posts"));
        let fetchedPosts: PostData[] = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            title: data.title,
            creator: data.creator,
            description: data.description,
            link: data.link || "",
            category: data.category || [],
            images: data.images ? data.images : data.imageUrl ? [data.imageUrl] : [],
          };
        });

        if (category !== "all") {
          fetchedPosts = fetchedPosts.filter((post) => post.category.includes(category));
        }

        setPosts(fetchedPosts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
      setLoading(false);
    };

    fetchPosts();
  }, [category]);

  const handleDelete = async (postId: string, images: string[]) => {
    if (!confirm("Are you sure you want to delete this post?")) return;

    try {
      await deleteDoc(doc(db, "posts", postId));

      for (const imageUrl of images) {
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
    setEditingPost({ ...post });
    setNewTitle(post.title);
    setNewCreator(post.creator);
    setNewDescription(post.description);
    setNewLink(post.link || "");
    setNewImages([]);
  };

  const handleImageDelete = async (imageUrl: string) => {
    if (!editingPost) return;
    if (!confirm("Are you sure you want to delete this image?")) return;

    try {
      const imageRef = ref(storage, imageUrl);
      await deleteObject(imageRef);

      const updatedImages = editingPost.images.filter((img) => img !== imageUrl);
      await updateDoc(doc(db, "posts", editingPost.id), { images: updatedImages });

      setEditingPost((prev) => prev && { ...prev, images: updatedImages });
      setPosts((prevPosts) =>
        prevPosts.map((post) => (post.id === editingPost.id ? { ...post, images: updatedImages } : post))
      );

      alert("Image deleted successfully.");
    } catch (error) {
      console.error("Error deleting image:", error);
      alert("Failed to delete image.");
    }
  };

  const handleUpdate = async () => {
    if (!editingPost) return;
    setUploading(true);

    try {
      let updatedImages = [...editingPost.images];

      if (newImages.length > 0) {
        if (newImages.length + updatedImages.length > 5) {
          alert("You can only upload up to 5 images.");
          setUploading(false);
          return;
        }

        const uploadedImageUrls = await Promise.all(
          newImages.map(async (image) => {
            const imageRef = ref(storage, `posts/${Date.now()}_${image.name}`);
            const uploadTask = await uploadBytesResumable(imageRef, image);
            return await getDownloadURL(uploadTask.ref);
          })
        );

        updatedImages = [...updatedImages, ...uploadedImageUrls];
      }

      await updateDoc(doc(db, "posts", editingPost.id), {
        title: newTitle,
        creator: newCreator,
        description: newDescription,
        link: newLink || null,
        images: updatedImages,
      });

      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === editingPost.id
            ? {
                ...post,
                title: newTitle,
                creator: newCreator,
                description: newDescription,
                link: newLink || "",
                images: updatedImages,
              }
            : post
        )
      );

      alert("Post updated successfully!");
      setEditingPost(null);
      setNewImages([]);
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
          <option value="all">All Posts</option>
          <option value="community">Community</option>
          <option value="portfolio">Portfolio</option>
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
              {post.images.length > 0 && (
                <Image src={post.images[0]} alt={post.title} width={600} height={400} className="w-full h-48 object-cover mb-4" />
              )}
              <h2 className="text-xl font-bold">{post.title}</h2>
              <p className="text-secondary">By {post.creator}</p>
              <p className="mt-2">{post.description}</p>
              <div className="mt-2 flex space-x-4">
                <button onClick={() => handleEdit(post)} className="btn-primary">
                  Edit
                </button>
                <button onClick={() => handleDelete(post.id, post.images)} className="btn-inactive">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

{editingPost && (
  <div 
    className="fixed inset-0 flex items-center justify-center blurred-overlay z-[200] px-4 py-10"
    onClick={() => setEditingPost(null)} // Close modal when clicking outside
  >
    <div 
      className="bg-[#03405f] text-white p-6 rounded-lg w-full max-w-md sm:max-w-lg max-h-[80vh] overflow-y-auto relative shadow-lg"
      onClick={(e) => e.stopPropagation()} // Prevents modal from closing when clicking inside
    >
      <button
        className="absolute top-3 right-3 text-2xl font-bold text-gray-300 hover:text-white"
        onClick={() => setEditingPost(null)}
      >
        ✖
      </button>

      <h2 className="text-2xl font-bold mb-4 text-[var(--novar-yellow)]">Edit Post</h2>

      {/* Title */}
      <label className="block mb-2 text-gray-300">Title:</label>
      <input
        type="text"
        value={newTitle}
        onChange={(e) => setNewTitle(e.target.value)}
        className="input-field mb-4 w-full bg-[#022b40] text-white border border-gray-500 rounded-md p-2"
        required
      />

      {/* Creator */}
      <label className="block mb-2 text-gray-300">Creator:</label>
      <input
        type="text"
        value={newCreator}
        onChange={(e) => setNewCreator(e.target.value)}
        className="input-field mb-4 w-full bg-[#022b40] text-white border border-gray-500 rounded-md p-2"
        required
      />

      {/* Description */}
      <label className="block mb-2 text-gray-300">Description:</label>
      <textarea
        value={newDescription}
        onChange={(e) => setNewDescription(e.target.value)}
        className="input-field mb-4 w-full bg-[#022b40] text-white border border-gray-500 rounded-md p-2"
        required
      />

      {/* Link */}
      <label className="block mb-2 text-gray-300">Link (Optional):</label>
      <input
        type="text"
        value={newLink}
        onChange={(e) => setNewLink(e.target.value)}
        className="input-field mb-4 w-full bg-[#022b40] text-white border border-gray-500 rounded-md p-2"
      />

      {/* Images */}
      <label className="block mb-2 text-gray-300">Images:</label>
      <div className="grid grid-cols-3 gap-2 mb-4">
        {editingPost.images.map((img, idx) => (
          <div key={idx} className="relative">
            <Image src={img} alt={`Image ${idx + 1}`} width={100} height={100} className="rounded-md" />
            <button
              className="absolute top-0 right-0 bg-red-500 text-white text-xs px-2 py-1 rounded-full"
              onClick={() => handleImageDelete(img)}
            >
              ✖
            </button>
          </div>
        ))}
      </div>

      {/* Add New Images */}
      <label className="block mb-2 text-gray-300">Add Images:</label>
      <input
        type="file"
        multiple
        accept="image/*"
        onChange={(e) => setNewImages(Array.from(e.target.files || []))}
        className="input-field mb-4 w-full bg-[#022b40] text-white border border-gray-500 rounded-md p-2"
      />

      <div className="flex justify-between mt-4">
        <button
          onClick={handleUpdate}
          className="bg-[var(--novar-yellow)] text-black px-4 py-2 rounded-md font-bold hover:bg-yellow-500"
          disabled={uploading}
        >
          {uploading ? "Updating..." : "Update"}
        </button>
        <button
          onClick={() => setEditingPost(null)}
          className="bg-gray-600 text-white px-4 py-2 rounded-md font-bold hover:bg-gray-700"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
)}

    </div>
  );
}
