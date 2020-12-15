import { useEffect, useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import { Movie } from '../types';

// TODO: Add firebaseConfig and initialize the firebase app
// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyB0KEItpOXqDizwd5bGVUFCYCJ6RRwQlVQ",
  authDomain: "movienatorserver.firebaseapp.com",
  databaseURL: "https://movienatorserver-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "movienatorserver",
  storageBucket: "movienatorserver.appspot.com",
  messagingSenderId: "319380453552",
  appId: "1:319380453552:web:f88a6d011af60cceb26375"
};



// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Firestore database
const db = firebase.firestore();

// We can simply cast this type to narrow our collection to Review type
// Safer way would be to use .withConverter() method
export const moviesCollection = db.collection(
  'movies',
) as firebase.firestore.CollectionReference<Movie>;


// Hook providing logged in user information
export const useLoggedInUser = () => {
  // Hold user info in state
  const [user, setUser] = useState<firebase.User | null>();

  // Setup onAuthStateChanged once when component is mounted
  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(u => setUser(u));

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
