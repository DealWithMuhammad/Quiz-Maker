// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAQumW8jJ7H5sAO4JgHaUdowCcMS1_b0yM",
  authDomain: "tajneed-b738d.firebaseapp.com",
  projectId: "tajneed-b738d",
  storageBucket: "tajneed-b738d.appspot.com",
  messagingSenderId: "71597443659",
  appId: "1:71597443659:web:1c4fa019fd47050d241bce",
  measurementId: "G-N79RWXJG8P",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const db = getFirestore(app);
export { db, storage };
