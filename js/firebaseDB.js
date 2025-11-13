// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-app.js";
import { collection, addDoc, getDocs, deleteDoc, updateDoc,
    doc} from "https://www.gstatic.com/firebasejs/12.5.0/firebase-firestore.js"
import { getFirestore }  from "https://www.gstatic.com/firebasejs/12.5.0/firebase-firestore.js"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDKqo_aHIjYel--r8z7HuFoOZgGzmEa9pU",
  authDomain: "wedding-guestbook-ce61c.firebaseapp.com",
  projectId: "wedding-guestbook-ce61c",
  storageBucket: "wedding-guestbook-ce61c.firebasestorage.app",
  messagingSenderId: "341126396822",
  appId: "1:341126396822:web:cfb202ac0bf89f18cafbb7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore (app);

  //Add a rsvp
export async function addMessage(messageData) {
    try {
        const docRef = await addDoc (collection(db, "messages"), messageData);
        return {id: docRef.id, ...messageData}
    }   catch (error) {
        console.error("error adding message:", error);
    }
}

//Get RSVPS
export async function getMessage() {
    const messages = [];
    try {const querySnapshot = await getDocs(collection(db, "messages"))
    querySnapshot.forEach((doc)=>{
        messages.push({id: doc.id, ...doc.data()})
    })
    } catch(error) {
        console.error("error retrieving messages: ", error);
    }
    return messages; 
}