import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import FloatingButton from '../core/components/FloatingButton';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { fetchQuestions } from '../../services/QnAService';

const QuestionsScreen = () => {
  const questionsInitialState = [
    {
      question: 'Question',
      imageUrl:
        'http://drive.google.com/uc?export=view&id=1k11P0jqhLZFSGOFMXSSZizd7QrRr_K5J',
    },
  ];
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [questions, setQuestions] = React.useState(questionsInitialState);
  console.log("🚀 ~ file: questionScreen.jsx:24 ~ QuestionScreen ~ questions:", questions)
  async function fetchQuestion() {
    try {
      const questionsArray = await fetchQuestions();
      console.log("🚀 ~ file: questionScreen.jsx:28 ~ fetchQuestion ~ questionsArray:", questionsArray)
      setQuestions(questionsArray);
    } catch (error) {
      console.error('Error fetching questions: ', error);
    }
  }
  React.useEffect(() => {
    fetchQuestion();
  }, []);
  React.useEffect(() => {
    fetchQuestion();
  }, [isFocused]);

  const handleCardPress = question => {
    navigation.navigate('QuestionScreen', question);
  };
  const Card = ({ question }) => (
    <View style={styles.card}>
      <TouchableOpacity onPress={() => handleCardPress(question)}>
        {/* <Image source={{ uri: question.imageUrl }} style={styles.cardImage} /> */}
        <Text style={styles.cardSubtitle}>{question.username}</Text>
        <Text style={styles.cardTitle}>{question.question}</Text>
        
      </TouchableOpacity>
    </View>
  );

  return (
    <>
      <FloatingButton
        text="Add Question"
        icon="addquestion"
        navigateTo="AddQuestionScreen"
      />

      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Q & A</Text>
        </View>
        {questions.map((question, index) => (
          <Card key={index} question={question} />
        ))}
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 0,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  titleContainer: {
    padding: 16,
    marginBottom: 16,
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    borderRadius: 8,
    backgroundColor: '#fff',
    elevation: 2,
  },
  title: {
    fontFamily: 'Hind Mysuru',
    fontSize: 30,
    fontWeight: '300',
    fontStyle: 'normal',
    lineHeight: 38,
    letterSpacing: 0.5,
    color: '#323232',
  },
  card: {
    width: '100%',
    marginBottom: 16,
    borderRadius: 8,
    backgroundColor: '#fff',
    elevation: 2,
  },
  cardImage: {
    height: 200,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  cardTitle: {
    margin: 16,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#666',
  },
  cardSubtitle: {
    marginLeft: 16,
    marginBottom: 16,
    fontSize: 16,
    color: '#666',
  },
});

export default QuestionsScreen;


// const questions = [
//   {
//     question: '',
//     reply: [
//       {
//         name: 'Kevin Wijesuriya',
//         answer: 'Yaaaaah',
//       },
//       {
//         name: 'Kevin Wijesuriya',
//         answer: 'Yaaaaah',
//       },
//     ],
//     imageUrl:
//       'https://www.google.com/search?q=question+img&sxsrf=AJOqlzUahBwvGh4DH7k7uVKFAnvQSFjpzg:1679565833480&source=lnms&tbm=isch&sa=X&ved=2ahUKEwjrpYan5vH9AhXV4DgGHVkNB90Q_AUoAXoECAEQAw&biw=1536&bih=754&dpr=1.25#imgrc=gyoWJ1UAWlubVM',
//   },
//   {
//     question: 'Are you hungry?',
//     reply: [
//       {
//         name: 'Kevin Wijesuriya',
//         answer: 'Yaaaaah',
//       },
//       {
//         name: 'Kevin Wijesuriya',
//         answer: 'Yaaaaah',
//       },
//     ],
//     // imageUrl:
//     // 'http://drive.google.com/uc?export=view&id=1ppXO876d0MzXfLJVmXazY5ZWx41yentN',
//   },
// ];
