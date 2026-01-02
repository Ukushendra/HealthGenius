import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase";

export default function TestFirebase() {
  const writeData = async () => {
    try {
      await addDoc(collection(db, "patients"), {
        name: "Test Patient",
        age: 25,
        createdAt: new Date()
      });
      alert("Data added successfully!");
    } catch (error) {
      console.error("Firestore error:", error);
      alert("Failed to add data");
    }
  };

  return <button onClick={writeData}>Add Test Data</button>;
}
