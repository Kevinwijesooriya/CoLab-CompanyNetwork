import React from 'react'
import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getAuth } from 'firebase/auth';
import { AddAnswer } from '../../../services/QnAService';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { firestoreDB } from '../../../../firebaseConfig';

const AddAnswersScreen = ({ route }) => {
  console.log("🚀 ~ file: AddAnswersScreen.jsx:14 ~ AddAnswersScreen ~ route:", route.params)
  
    const auth = getAuth();
    const user = auth.currentUser;
    const uid = user.uid;
    const profile =route.params
    const [answer, setAnswer] = React.useState('');
    const [error, setError] = React.useState(null);
    const navigation = useNavigation();
  
    const handleAddQuestion = async () => {
      const usersCollection = collection(firestoreDB, 'users');
      const userQuery = query(usersCollection, where('uid', '==', uid));
      const userSnapshot = await getDocs(userQuery);
      if (userSnapshot.empty) {
        throw new Error(`No user found with uid ${uid}.`);
      }
      const userDoc = userSnapshot.docs[0];
      let payload = {
        uid,
        username:userDoc.data().name,
        answer,
      };
      {profile.answers&&profile.answers.push(payload)}
      
      try {
        console.log(profile.id)
        const response = await AddAnswer(profile.id  ,payload);
        console.log('Question added to Firestore', response);
        navigation.navigate('QuestionsScreen');
      } catch (error) {
        setError('Error adding question to Firestore');
        console.error('Error adding question to Firestore: ', error);
      }
    };
    return (
        <>
          <View style={styles.imageContainer}>
            {/* <Image source={require('../../assets/Team.png')} style={styles.image} /> */}
          </View>
          <View style={styles.container}>
            <Text style={styles.title}>Add Your Answer</Text>
            <Text style={styles.profileLabel}>{profile.question}</Text>
            <TextInput
              style={styles.input}
              placeholder="Answer"
              placeholderTextColor="#B5B5B5"
              onChangeText={text => setAnswer(text)}
              value={answer}
              autoCapitalize="none"
              keyboardType="email-address"
            />
        
           
            {error && <Text style={styles.error}>{error}</Text>}
            <TouchableOpacity style={styles.button} onPress={handleAddQuestion}>
              <Text style={styles.buttonText}>Add</Text>
            </TouchableOpacity>
          </View>
        </>
      );
}
const styles = StyleSheet.create({
    container: {
      flex: 2,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#FFFFFF',
      padding: 20,
    },
    imageContainer: {
      flex: 1,
      justifyContent: 'flex-start',
      alignItems: 'center',
      backgroundColor: '#ffffff',
    },
    image: {
      width: 410,
      height: 410,
    },
    title: {
      fontFamily: 'Hind Mysuru',
      fontSize: 38,
      fontWeight: '300',
      fontStyle: 'normal',
      lineHeight: 38,
      letterSpacing: 0.5,
      color: '#323232',
      backgroundColor: '#ffffff90',
      marginBottom: 38,
      borderRadius: 5,
    },
    input: {
      backgroundColor: '#EFEFEF',
      width: 327,
      height: 45,
      fontSize: 16,
      paddingHorizontal: 10,
      paddingVertical: 8,
      borderRadius: 5,
      marginBottom: 30,
      color: '#323232',
    },
    error: {
      color: '#E9446A',
      fontSize: 16,
      marginBottom: 10,
      fontWeight: '600',
    },
    button: {
      backgroundColor: '#323232',
      width: 327,
      borderRadius: 5,
      height: 50,
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
    },
    profileLabel: {
      fontSize: 18,
      fontWeight: 'bold',
      width: '40%',
      fontFamily: 'Hind Mysuru',
      color: '#323232',
    },
  });
export default AddAnswersScreen
