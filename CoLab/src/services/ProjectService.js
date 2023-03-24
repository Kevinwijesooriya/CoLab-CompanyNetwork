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
  export const AddProject = async payload => {
    const { projectName,
        estimatedTime,
        technologies,
        teamMembers,
        description,
        projectStatus,
        clinent, } = payload;
    try {
      console.log('~ AddProjcet ~ payload:', payload);
    //   const userCredential = await createUserWithEmailAndPassword(
    //     firebaseAuth,
    //     email,
    //     password,
    //   );
    //   const user = userCredential.user;
    //   const uid = user.uid;
    //   console.log('~ AddMember ~ user:', user);
      const docData = {
        projectName: projectName,
        estimatedTime: estimatedTime,
        technologies: technologies,
        teamMembers: teamMembers,
        description: description,
        projectStatus: projectStatus === 'InProgress' ? 'Completed' : 'relessed',
        clinent: clinent,
      };
      try {
        const userDocRef = await addDoc(
          collection(firestoreDB, 'project'),
          docData,
        );
        console.log(`Project document created with ID: ${userDocRef.id}`);
      } catch (error) {
        console.error('Error creating project: ', error);
      }
    } catch (error) {
      console.error('Error creating project: ', error);
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

  export async function fetchProject(pid) {
    try {
      const projectDoc = doc(firestoreDB, 'project', pid);
      const docSnapshot = await getDoc(projectDoc);
      if (!docSnapshot.exists()) {
        throw new Error(`Project with Pid ${pid} does not exist.`);
      }
      const projectData = docSnapshot.data();
      console.log('Project data:', projectData);
      return projectData;
    } catch (error) {
      console.error('Error fetching user: ', error);
      throw error;
    }
  }
  
  export async function fetchProjects() {
    try {
      const projectCollection = collection(firestoreDB, 'project');
      const projectSnapshot = await getDocs(projectCollection);
      let projectArray =[]
      projectSnapshot.docs.map(doc => {
        let projects = doc.data()
        projects.id=doc.id
        projectArray.push(projects)
      })
      return projectArray;
    } catch (error) {
      console.error('Error fetching All project: ', error);
      throw error;
    }
  }

  export async function updateProject(pId, projectData) {
    try {
      const projectDoc = doc(firestoreDB, 'project', pId);
      await updateDoc(projectDoc, projectData);
      console.log(`Project with pid ${pId} updated successfully.`);
    } catch (error) {
      console.error(`Error updating project with uid ${pId}: `, error);
      throw error;
    }
  }
  
  export async function deleteProject(pid) {
    try {
      const projectRef = doc(firestoreDB, "project", pid);
      await deleteDoc(projectRef);
      console.log(`Project with uid ${pid} deleted successfully.`);
    } catch (error) {
      console.error(`Error deleting project with pid ${pid}: `, error);
      throw error;
    }
  }
  