import React, { useState } from 'react';
import { getAuth } from "firebase/auth";
import { useNavigation } from '@react-navigation/native';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import { AddQuestion } from '../../services/QnAService';

const AddQuestionScreen = () => {
  const auth = getAuth();
  const user = auth.currentUser;
  const uid = user.uid;
  const [question, setQuestion] = useState('');
  const navigation = useNavigation();
  const [error, setError] = useState(null);

  const handleAddQuestion = async () => {
    let payload = {
      uid,
      question,
    };
    try {
      const response = await AddQuestion(payload);
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
        <Image source={require('../../assets/Team.png')} style={styles.image} />
      </View>
      <View style={styles.container}>
        <Text style={styles.title}>New Question</Text>
        <TextInput
          style={styles.input}
          placeholder="Question"
          placeholderTextColor="#B5B5B5"
          onChangeText={text => setQuestion(text)}
          value={question}
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
};

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
});

export default AddQuestionScreen;
