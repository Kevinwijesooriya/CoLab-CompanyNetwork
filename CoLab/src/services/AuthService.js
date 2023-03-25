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
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { firebaseAuth, firestoreDB } from '../../firebaseConfig';

export const AddAdmin = payload => {
  const { email, password, role, companyName } = payload;
  createUserWithEmailAndPassword(firebaseAuth, email, password)
    .then(async userCredential => {
      const user = userCredential.user;
      const uid = user.uid;

      const docData = {
        email: email,
        role: 'claimsAdmin',
        companyName: companyName,
      };
      try {
        await setDoc(doc(firestoreDB, 'users', uid), docData);
        console.log('User added to Firestore');
      } catch (error) {
        console.error('Error adding user to Firestore: ', error);
      }
    })
    .catch(error => {
      console.error('Error creating user: ', error);
    });
};
export const AddMember = async payload => {
  const { name, email, password, position, companyName } = payload;
  try {
    console.log('~ AddMember ~ payload:', payload);
    const userCredential = await createUserWithEmailAndPassword(
      firebaseAuth,
      email,
      password,
    );
    const user = userCredential.user;
    const uid = user.uid;
    console.log('~ AddMember ~ user:', user);
    const docData = {
      uid,
      name: name,
      email: email,
      role: position === 'PM' ? 'claimsPM' : 'claimsUser',
      position: position,
      companyName: companyName,
    };
    try {
      const userDocRef = await addDoc(
        collection(firestoreDB, 'users'),
        docData,
      );
      console.log(`User created with ID: ${uid}`);
      console.log(`User document created with ID: ${userDocRef.id}`);
    } catch (error) {
      console.error('Error creating user: ', error);
    }
  } catch (error) {
    console.error('Error creating user: ', error);
  }
};

export async function addUserHelper(payload) {
  const docData = {
    email: payload.email,
    role: 'claimsAdmin',
    companyName: payload.companyName,
  };
  try {
    const usersCollection = collection(firestoreDB, 'users');
    await addDoc(usersCollection, docData);
    console.log('New user added successfully.');
  } catch (error) {
    console.error('Error adding user: ', error);
    throw error;
  }
}
export async function fetchUser(uid) {
  try {
    const usersCollection = collection(firestoreDB, 'users');
    const userQuery = query(usersCollection, where('uid', '==', uid));
    const userSnapshot = await getDocs(userQuery);
    if (userSnapshot.empty) {
      throw new Error(`User with uid ${uid} does not exist.`);
    }
    const user = userSnapshot.docs[0].data();
    return user;
  } catch (error) {
    console.error(`Error fetching user with uid ${uid}: `, error);
    throw error;
  }
}

export async function fetchUsers() {
  try {
    const usersCollection = collection(firestoreDB, 'users');
    const usersSnapshot = await getDocs(usersCollection);
    const usersArray = usersSnapshot.docs.map(doc => doc.data());
    return usersArray;
  } catch (error) {
    console.error('Error fetching users: ', error);
    throw error;
  }
}

export async function updateUser(userId, userData) {
  try {
    const usersCollection = collection(firestoreDB, 'users');
    const userQuery = query(usersCollection, where('uid', '==', userId));
    const userSnapshot = await getDocs(userQuery);
    if (userSnapshot.empty) {
      throw new Error(`No user found with uid ${userId}.`);
    }
    const userDoc = userSnapshot.docs[0];
    const userRef = doc(firestoreDB, 'users', userDoc.id);
    await updateDoc(userRef, userData);
    console.log(`User with uid ${userId} updated successfully.`);
  } catch (error) {
    console.error(`Error updating user with uid ${userId}: `, error);
    throw error;
  }
}
export async function updateUserProfile(userId, imageUrl) {
  try {
    const usersCollection = collection(firestoreDB, 'users');
    const userQuery = query(usersCollection, where('uid', '==', userId));
    const userSnapshot = await getDocs(userQuery);
    if (userSnapshot.empty) {
      throw new Error(`No user found with uid ${userId}.`);
    }
    const userDoc = userSnapshot.docs[0];
    const userRef = doc(firestoreDB, 'users', userDoc.id);
    const userData = { imageUrl };
    await updateDoc(userRef, userData);
    console.log(`User profile with uid ${userId} updated successfully.`);
  } catch (error) {
    console.error(`Error updating user profile with uid ${userId}: `, error);
    throw error;
  }
}

export async function deleteUser(uid) {
  try {
    const usersCollection = collection(firestoreDB, 'users');
    const userQuery = query(usersCollection, where('uid', '==', uid));
    const userSnapshot = await getDocs(userQuery);
    if (userSnapshot.empty) {
      throw new Error(`No user found with uid ${uid}.`);
    }
    const userDoc = userSnapshot.docs[0];
    const userRef = doc(firestoreDB, 'users', userDoc.id);
    await deleteDoc(userRef);
    console.log(`User with uid ${uid} deleted successfully.`);
  } catch (error) {
    console.error(`Error deleting user with uid ${uid}: `, error);
    throw error;
  }
}
