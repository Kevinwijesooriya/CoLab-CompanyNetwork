import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  setDoc,
  getDocs,
  getDoc,
  onSnapshot,
  updateDoc,
  query,
  where,
} from 'firebase/firestore';
import { firebaseAuth, firestoreDB } from '../../firebaseConfig';

  export async function addPost(payload) {
    let userId = payload.uid
    console.log(userId)
    try {
      const usersCollection = collection(firestoreDB, 'users');
      const userQuery = query(usersCollection, where('uid', '==', userId));
      const userSnapshot = await getDocs(userQuery);
      if (userSnapshot.empty) {
        throw new Error(`No user found with uid ${userId}.`);
      }
      const userDoc = userSnapshot.docs[0];

      const docData = {
        imageUrl: payload.imageUrl,
        text: payload.text,
        uid: userId,
        username: userDoc.data().name,
      };
      const postsCollection = collection(firestoreDB, 'posts');
      await addDoc(postsCollection, docData);
      console.log('New post added successfully.');
    } catch (error) {
      console.error('Error adding post: ', error);
      throw error;
    }
  }

export async function updatePost(id, dataToUpdate) {
  try {
    const postRef = doc(firestoreDB, "posts", id);
    await updateDoc(postRef, dataToUpdate);
    console.log(`Post with id ${id} updated successfully.`);
  } catch (error) {
    console.error(`Error updating post with id ${id}: `, error);
    throw error;
  }
}

export async function getOnePost(id) {
  try {
    const userDoc = doc(firestoreDB, 'posts',id);
    console.log('post data:', userDoc);
    const docSnapshot = await getDoc(userDoc);
    console.log('post data:', docSnapshot);
    if (!docSnapshot.exists()) {
      console.log('No matching post.');
      return null;
    }
    const userData = docSnapshot.data();
    console.log('post data:', userData);
    return userData;
  } catch (error) {
    console.error('Error fetching post: ', error);
    throw error;
  }
}

export async function fetchPosts() {
  try {
    const postsCollection = collection(firestoreDB, 'posts');
    const postsSnapshot = await getDocs(postsCollection);
    let postsArray=[]
     postsSnapshot.docs.map(doc => {
       let posts = doc.data()
       posts.id = doc.id
       postsArray.push(posts)
     });
    return postsArray;
  } catch (error) {
    console.error('Error fetching posts: ', error);
    throw error;
  }
}
export async function deletePost(uid) {
  try {
    const userRef = doc(firestoreDB, "posts", uid);
    await deleteDoc(userRef);
    console.log(`Post with uid ${uid} deleted successfully.`);
  } catch (error) {
    console.error(`Error deleting Post with uid ${uid}: `, error);
    throw error;
  }
}