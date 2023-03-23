import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';

const questions = [
  {
    question: 'Are you hungry?',
    reply: [
      {
        name: 'Kevin Wijesuriya',
        answer: 'Yaaaaah',
      },
      {
        name: 'Kevin Wijesuriya',
        answer: 'Yaaaaah',
      },
    ],
    imageUrl:
      'https://www.google.com/search?q=question+img&sxsrf=AJOqlzUahBwvGh4DH7k7uVKFAnvQSFjpzg:1679565833480&source=lnms&tbm=isch&sa=X&ved=2ahUKEwjrpYan5vH9AhXV4DgGHVkNB90Q_AUoAXoECAEQAw&biw=1536&bih=754&dpr=1.25#imgrc=gyoWJ1UAWlubVM',
  },
  {
    question: 'Are you hungry?',
    reply: [
      {
        name: 'Kevin Wijesuriya',
        answer: 'Yaaaaah',
      },
      {
        name: 'Kevin Wijesuriya',
        answer: 'Yaaaaah',
      },
    ],
    // imageUrl:
    // 'http://drive.google.com/uc?export=view&id=1ppXO876d0MzXfLJVmXazY5ZWx41yentN',
  },
];
const QuestionScreen = () => {
  return (
    <ScrollView style={styles.container}>
      {questions.map((post, index) => (
        <View key={index} style={styles.postContainer}>
            {post.imageUrl&&
          <Image source={{ uri: post.imageUrl }} style={styles.image} />}
          <Text style={styles.question}>{post.question}</Text>
          {post.reply.map((reply, index) => (
            <View key={index} style={styles.replyContainer}>
              <Text style={styles.name}>{reply.name}</Text>
              <Text style={styles.answer}>{reply.answer}</Text>
            </View>
          ))}
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  postContainer: {
    backgroundColor: '#fff',
    padding: 10,
    marginBottom: 10,
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  question: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  replyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  name: {
    fontWeight: 'bold',
    marginRight: 5,
  },
  answer: {
    flex: 1,
  },
});

export default QuestionScreen;
