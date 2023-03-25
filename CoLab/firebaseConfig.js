// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, initializeFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBA3vmKZ4oRHxjipH7V8uDl3UvLnEzfK_8',
  authDomain: 'colab-12dc4.firebaseapp.com',
  projectId: 'colab-12dc4',
  storageBucket: 'colab-12dc4.appspot.com',
  messagingSenderId: '892654180043',
  appId: '1:892654180043:web:cd7c62a15f4a8d43c36d4e',
  storageBucket: 'gs://colab-12dc4.appspot.com',
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
export const firestoreDB = initializeFirestore(firebaseApp, {
  experimentalForceLongPolling: true,
  useFetchStreams: false,
});
// export const firestoreDB = getFirestore(firebaseApp);
export const firebaseAuth = getAuth(firebaseApp);
export const storage = getStorage(firebaseApp);
