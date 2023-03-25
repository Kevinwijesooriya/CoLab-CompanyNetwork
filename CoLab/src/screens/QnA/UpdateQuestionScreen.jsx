import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import { getQuestionById, updateQuestion } from '../../services/QnAService';

const UpdateQuestionScreen = ({ route }) => {
  console.log(
    '🚀 ~ file: UpdateQuestionScreen.jsx:14 ~ UpdateQuestionScreen ~ route.params:',
    route.params,
  );
  const uid = route.params;
  console.log("🚀 ~ file: UpdateQuestionScreen.jsx:18 ~ UpdateQuestionScreen ~ uid:", uid)

  const [question, setQuestion] = useState('');
  console.log("🚀 ~ file: UpdateQuestionScreen.jsx:20 ~ UpdateQuestionScreen ~ question:", question)
  const [error, setError] = useState(null);

  const handleAddQuestion = async () => {
    let payload = {
        question
    };

    try {
      const response = await updateQuestion(uid, payload);;
      console.log('Question added to Firestore', response);
      navigation.navigate('QuestionsScreen');
    } catch (error) {
      // setError('Error updating question to Firestore');
      console.error('Error adding question to Firestore: ', error);
      navigation.navigate('QuestionsScreen');
    }
  };
  React.useEffect(() => {
    async function fetchQuestion() {
      try {
        const questionsArray = await getQuestionById(uid);
        setQuestion(questionsArray.question);
      } catch (error) {
        console.error('Error fetching questions: ', error);
      }
    }

    fetchQuestion();
  }, []);

  return (
    <>
      <View style={styles.imageContainer}>
        <Image source={require('../../assets/Team.png')} style={styles.image} />
      </View>
      <View style={styles.container}>
        <Text style={styles.title}>Update Question</Text>
        <Text style={styles.label}>Question</Text>
        <TextInput
          mode="outlined"
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
          <Text style={styles.buttonText}>Save Changes</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 4,
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
  label: {
    fontFamily: 'Hind Mysuru',
    fontSize: 12,
    fontWeight: '300',
    fontStyle: 'normal',
    lineHeight: 12,
    letterSpacing: 0.5,
    color: '#B5B5B5',
    borderRadius: 5,
    width: 327,
    paddingHorizontal: 10,
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

export default UpdateQuestionScreen;
