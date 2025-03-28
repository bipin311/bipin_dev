// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, addDoc, query, orderBy } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDMad96IdYKlaIHXAVjntYhp3w61OJRLHg",
  authDomain: "myportfolio-8ba8e.firebaseapp.com",
  projectId: "myportfolio-8ba8e",
  storageBucket: "myportfolio-8ba8e.firebasestorage.app",
  messagingSenderId: "139293909758",
  appId: "1:139293909758:web:4eb23d6e217fd7f9397baf",
  measurementId: "G-2QFXFCKHNB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };


export const projectsCollection = collection(db, 'projects');
export const blogPostsCollection = collection(db, 'blogPosts');
export const messagesCollection = collection(db, 'messages');

// Helper functions for data fetching
export async function getProjects() {
  const projectsQuery = query(projectsCollection, orderBy('id', 'asc'));
  const snapshot = await getDocs(projectsQuery);
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
}

export async function getBlogPosts() {
  const blogPostsQuery = query(blogPostsCollection, orderBy('date', 'desc'));
  const snapshot = await getDocs(blogPostsQuery);
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
}

export async function sendMessage(message: {
  name: string;
  email: string;
  message: string;
}) {
  return addDoc(messagesCollection, {
    ...message,
    createdAt: new Date().toISOString(),
  });
}