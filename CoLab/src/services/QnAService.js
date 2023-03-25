import { addDoc, arrayUnion, collection, deleteDoc, doc, getDoc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { firestoreDB } from "../../firebaseConfig";

export const AddQuestion = async payload => {
    const { question,uid } = payload;
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
        question: question,
        username: userDoc.data().name,

      };
        const questionDocRef = await addDoc(collection(firestoreDB, 'questions'), docData);
        console.log(`Question created with ID: ${uid}`);
        console.log(`Question document created with ID: ${questionDocRef.id}`);
      } catch (error) {
        console.error('Error creating question: ', error);
      }

    }
    
    export async function getQuestionById(questionId) {
      try {
        const questionDoc = doc(firestoreDB, 'questions', questionId);
        const docSnapshot = await getDoc(questionDoc);
        if (!docSnapshot.exists()) {
          console.log('No matching document.');
          return null;
        }
        const questionData = docSnapshot.data();
        console.log('Question data:', questionData);
        return questionData;
      } catch (error) {
        console.error('Error fetching question: ', error);
        throw error;
      }
    }

    export async function fetchQuestions() {
      try {
        const questionsCollection = collection(firestoreDB, 'questions');
        const questionsSnapshot = await getDocs(questionsCollection);
        const questionsArray =[]
        questionsSnapshot.docs.map(doc => { 
          let questions = doc.data()
          questions.id=doc.id
          questionsArray.push(questions)
        }
        );
        return questionsArray;

        // // const projectCollection = collection(firestoreDB, 'project');
        // // const projectSnapshot = await getDocs(projectCollection);
        // let projectArray =[]
        // projectSnapshot.docs.map(doc => {
        //   let projects = doc.data()
        //   projects.id=doc.id
        //   projectArray.push(projects)
        // })
        // return projectArray;



      } catch (error) {
        console.error('Error fetching questions: ', error);
        throw error;
      }
        console.log("🚀 ~ file: QnAService.js:76 ~ fetchQuestions ~ questionsArray:", questionsArray)
        console.log("🚀 ~ file: QnAService.js:76 ~ fetchQuestions ~ questionsArray:", questionsArray)
    }
    export async function updateQuestion(uid, dataToUpdate) {
      try {
        const questionRef = doc(firestoreDB, "questions", uid);
        await updateDoc(questionRef, dataToUpdate);
        console.log(`Question with uid ${uid} updated successfully.`);
      } catch (error) {
        console.error(`Error updating question with uid ${uid}: `, error);
        throw error;
      }
    }
    export async function deleteQuestion(id) {
      try {
        const userRef = doc(firestoreDB, "questions", id);
        await deleteDoc(userRef);
        console.log(`User with id ${id} deleted successfully.`);
      } catch (error) {
        console.error(`Error deleting user with id ${id}: `, error);
        throw error;
      }
    }


    export  async function AddAnswer(id, dataToUpdate) {

      const answerRef = doc(firestoreDB, "questions", id);
    
    // Atomically add a new region to the "regions" array field.
    // await updateDoc(answerRef, {
    //     answers : arrayUnion(dataToUpdate)
    // });
    
      try {
        await updateDoc(answerRef, {
          answers : arrayUnion(dataToUpdate)
      });
        console.log(`Answer updated successfully.`);
      } catch (error) {
        console.error(`Error updating project with uid ${pId}: `, error);
        throw error;
      }
    
        }