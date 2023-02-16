import firebase, { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

import { GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
	apiKey: "AIzaSyDh9k7gbUnlF4BVCJpHL0cfdPlmvwvy3Mo",

	authDomain: "nextfire-app-902b0.firebaseapp.com",

	projectId: "nextfire-app-902b0",

	storageBucket: "nextfire-app-902b0.appspot.com",

	messagingSenderId: "1033484467828",

	appId: "1:1033484467828:web:b1e55c9ae0b42873a15b21",

	measurementId: "G-TX097W3C64",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleAuthProvider = new GoogleAuthProvider(auth);
// export const googleAuthProvider = new GoogleAuthProvider();

export const firestore = getFirestore(app);
export const storage = getStorage(app);
