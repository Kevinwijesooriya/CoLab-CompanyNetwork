import { addDoc, collection, doc, getDoc, getDocs } from "firebase/firestore";
import { firestoreDB } from "../../firebaseConfig";

export const AddAnswer = async payload => {
    const { answer,uid,Qid } = payload;
    const docData = {
        uid,
        answer: answer,
        Qid,


      };
      try {
        const answerDocRef = await addDoc(collection(firestoreDB, 'answers'), docData);
        console.log(`Question created with ID: ${uid}`);
        console.log(`Question document created with ID: ${answerDocRef.id}`);
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