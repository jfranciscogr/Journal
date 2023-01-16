// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyCPH8g4e1RffpbeO1031EKr3sr2csUMA9s',
	authDomain: 'journal-app-872bf.firebaseapp.com',
	projectId: 'journal-app-872bf',
	storageBucket: 'journal-app-872bf.appspot.com',
	messagingSenderId: '51847858123',
	appId: '1:51847858123:web:27b91e356a817a0940184e',
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseDB = getFirestore(FirebaseApp);
