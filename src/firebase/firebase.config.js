// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration


const firebaseConfig = {
  apiKey: "AIzaSyAxbfHe7nGOGNHqtsYVIQHvaRAGqBC4kWU",
  authDomain: "react-user-email-passwor-5bbbe.firebaseapp.com",
  projectId: "react-user-email-passwor-5bbbe",
  storageBucket: "react-user-email-passwor-5bbbe.appspot.com",
  messagingSenderId: "932906123381",
  appId: "1:932906123381:web:e924a12a80946e1842f83c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
export default auth