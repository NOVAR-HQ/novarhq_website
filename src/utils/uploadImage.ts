import { storage } from "@/firebase/firebaseConfig";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export async function uploadToFirebaseStorage(file: File): Promise<string | null> {
  try {
    console.log("Uploading image to Firebase Storage...");
    const storageRef = ref(storage, `posts/${Date.now()}_${file.name}`);
    await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);
    console.log("Image uploaded successfully:", downloadURL);
    return downloadURL;
  } catch (error) {
    console.error("Firebase Storage upload error:", error);
    return null;
  }
}
