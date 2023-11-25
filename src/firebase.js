// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import {
    getFirestore,
    collection,
    getDocs,
    addDoc,
    setDoc,
    doc,
} from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAHOagOVstN1wlA7ofkVpvEyX32GF-beNs",
  authDomain: "munch-match-app.firebaseapp.com",
  projectId: "munch-match-app",
  storageBucket: "munch-match-app.appspot.com",
  messagingSenderId: "798244056554",
  appId: "1:798244056554:web:c2d100180180e0f8a05693",
  measurementId: "G-4RKPJGJSEP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export async function addStudent(studentData, id) {
    try {
        await setDoc(doc(db, "students", id), studentData)
        console.log('Publicado!')
    } catch (e) {
        console.error("Error adding document: ", e)
    }
}

export async function getStudents() {
    let students = []
    const querySnapshot = await getDocs(collection(db, "students"))
    querySnapshot.forEach((doc) => {
        students.push(doc.data())
    });

    return students;
}