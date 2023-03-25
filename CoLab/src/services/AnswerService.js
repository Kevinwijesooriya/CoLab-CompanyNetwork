import { addDoc, collection, doc, getDoc, getDocs, query } from "firebase/firestore";
import { firestoreDB } from "../../firebaseConfig";

export const AddAnswer = async payload => {

  const washingtonRef = doc(firestoreDB, "cities", "DC");

// Atomically add a new region to the "regions" array field.
await updateDoc(washingtonRef, {
    regions: arrayUnion("greater_virginia")
});

    const { answer,uid,Qid } = payload;
     try {
      const usersCollection = collection(firestoreDB, 'users');
      const userQuery = query(usersCollection, where('uid', '==', uid));
      const userSnapshot = await getDocs(userQuery);
      if (userSnapshot.empty) {
        throw new Error(`No user found with uid ${uid}.`);
      }
      const userDoc = userSnapshot.docs[0];

      const docData = {
        uid,
        answer: answer,
        username: userDoc.data().name,
        Qid,

      };
        const questionDocRef = await addDoc(collection(firestoreDB, 'answers'), docData);
        console.log("🚀 ~ file: AnswerService.js:23 ~ AddAnswer ~ questionDocRef:", questionDocRef)
        console.log(`Question created with ID: ${uid}`);
        console.log(`Question document created with ID: ${questionDocRef.id}`);
      } catch (error) {
        console.error('Error creating question: ', error);
      }

    }
    
    export async function getAnswerById(answerId) {
      try {
        const answerDoc = doc(firestoreDB, 'answers', answerId);
        const docSnapshot = await getDoc(answerDoc);
        if (!docSnapshot.exists()) {
          console.log('No matching document.');
          return null;
        }
        const answerData = docSnapshot.data();
        console.log('Question data:', answerData);
        return answerData;
      } catch (error) {
        console.error('Error fetching question: ', error);
        throw error;
      }
    }

    // export async function fetchQuestions() {
    //   try {
    //     const questionsCollection = collection(firestoreDB, 'questions');
    //     const questionsSnapshot = await getDocs(questionsCollection);
    //     const questionsArray = questionsSnapshot.docs.map(doc => doc.data());
    //     return questionsArray;
    //   } catch (error) {
    //     console.error('Error fetching questions: ', error);
    //     throw error;
    //   }
    // }
    export async function updateAnswer(Qid, dataToUpdate) {
      try {
        const answerRef = doc(firestoreDB, "answers", Qid);
        await updateDoc(answerRef, dataToUpdate);
        console.log(`Question with uid ${Qid} updated successfully.`);
      } catch (error) {
        console.error(`Error updating question with uid ${uid}: `, error);
        throw error;
      }
    }
    export async function deleteUser(Qid) {
      try {
        const userRef = doc(firestoreDB, "answers", Qid);
        await deleteDoc(userRef);
        console.log(`User with uid ${uid} deleted successfully.`);
      } catch (error) {
        console.error(`Error deleting user with uid ${uid}: `, error);
        throw error;
      }
    }