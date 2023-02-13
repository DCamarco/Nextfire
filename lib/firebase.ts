import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
	apiKey: "AIzaSyDh9k7gbUnlF4BVCJpHL0cfdPlmvwvy3Mo",

	authDomain: "nextfire-app-902b0.firebaseapp.com",

	projectId: "nextfire-app-902b0",

	storageBucket: "nextfire-app-902b0.appspot.com",

	messagingSenderId: "1033484467828",

	appId: "1:1033484467828:web:b1e55c9ae0b42873a15b21",

	measurementId: "G-TX097W3C64",
};

if (!firebase.apps.length) {
	firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const storage = firebase.storage();
