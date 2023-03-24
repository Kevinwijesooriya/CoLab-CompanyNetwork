export const AddQuestion = async payload => {
    const { question } = payload;
    const docData = {
        uid,
        question: question,
      };
      try {
        const userDocRef = await addDoc(collection(db, 'users'), docData);
        console.log(`User created with ID: ${uid}`);
        console.log(`User document created with ID: ${userDocRef.id}`);
      } catch (error) {
        console.error('Error creating user: ', error);
      }

    }