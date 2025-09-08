// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDc2dR-wYz7kcOWV46TTr8bc_BUNBF3HCE",
  authDomain: "new-project-6d534.firebaseapp.com",
  projectId: "new-project-6d534",
  storageBucket: "new-project-6d534.firebasestorage.app",
  messagingSenderId: "601896569896",
  appId: "1:601896569896:web:92a3c6a60408750822f91d",
  measurementId: "G-MR2QLP9KKR"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
