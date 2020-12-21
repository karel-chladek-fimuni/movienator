import { useEffect, useState } from "react";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import { Movie } from "../types";

// TODO: Add firebaseConfig and initialize the firebase app
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBQHci44stkKsNtKR_EMe95kcdZ5E7nzRs",
  authDomain: "movienator-pv247.firebaseapp.com",
  projectId: "movienator-pv247",
  storageBucket: "movienator-pv247.appspot.com",
  messagingSenderId: "257218063382",
  appId: "1:257218063382:web:95998edc7b3c6adbde5937",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Firestore database
const db = firebase.firestore();

// We can simply cast this type to narrow our collection to Review type
// Safer way would be to use .withConverter() method
type user_movie = { user_id: string; movie_id: number };

export const myListCollection = db.collection(
  "my_movie_list"
) as firebase.firestore.CollectionReference<user_movie>;

// Hook providing logged in user information
export const useLoggedInUser = () => {
  // Hold user info in state
  const [user, setUser] = useState<firebase.User | null>();

  // Setup onAuthStateChanged once when component is mounted
  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user && typeof(user) != "undefined") {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    // Call unsubscribe in the cleanup of the hook
    return () => unsubscribe();
  }, []);

  return user;
};

// Sign up handler
export const signUp = (email: string, password: string) =>
  firebase.auth().createUserWithEmailAndPassword(email, password);

// Sign in handler
export const signIn = (email: string, password: string) =>
  firebase.auth().signInWithEmailAndPassword(email, password);

// Sign out handler
export const signOut = () => firebase.auth().signOut();
