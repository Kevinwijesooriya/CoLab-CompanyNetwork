import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  setDoc,
  getDocs,
  onSnapshot,
  updateDoc,
} from 'firebase/firestore';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { firebaseApp } from '../../firebaseConfig';

const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);

export const AddAdmin = payload => {
  const { email, password, role, companyName } = payload;
  createUserWithEmailAndPassword(auth, email, password)
    .then(async userCredential => {
      const user = userCredential.user;
      const uid = user.uid;

      const docData = {
        email: email,
        role: 'claimsAdmin',
        companyName: companyName,
      };
      try {
        await setDoc(doc(db, 'users', uid), docData);
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
      auth,
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
      const userDocRef = await addDoc(collection(db, 'users'), docData);
      console.log(`User created with ID: ${uid}`);
      console.log(`User document created with ID: ${userDocRef.id}`);
    } catch (error) {
      console.error('Error creating user: ', error);
    }
  } catch (error) {
    console.error('Error creating user: ', error);
  }
};
