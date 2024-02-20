// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
// Todo: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

// const firebaseConfig = {
// 	apiKey: import.meta.env.VITE_APIKEY,
// 	authDomain: import.meta.env.VITE_AUTHDOMAIN,
// 	projectId: import.meta.env.VITE_PROJECTID,
// 	storageBucket: import.meta.env.VITE_STORAGEBUCKET,
// 	messagingSenderId: import.meta.env.VITE_MESSAGINGSENDERID,
// 	appId: import.meta.env.VITE_APPID,
// 	measurementId: import.meta.env.VITE_MEASUREMENTID,
// };

const firebaseConfig = {
	apiKey: 'AIzaSyCyC6CCjZiKTrIo2R9Za8FW8wHufh_QBnw',
	authDomain: 'test-aa27e.firebaseapp.com',
	projectId: 'test-aa27e',
	storageBucket: 'test-aa27e.appspot.com',
	messagingSenderId: '616846592982',
	appId: '1:616846592982:web:bb03dce64ec5c5e0a93277',
	measurementId: 'G-XF3S7ER6B4',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const db = () => getFirestore(app);

export default db;
