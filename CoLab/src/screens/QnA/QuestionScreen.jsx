import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  Linking,
  TouchableOpacity,
  Alert,
} from 'react-native';
import FloatingButton from '../core/components/FloatingButton';
import Icon from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import { deleteQuestion } from '../../services/QnAService';

const ProfileScreen = ({ route }) => {
    const navigation = useNavigation();
  console.log(
    '🚀 ~ file: ProfileScreen.jsx:6 ~ ProfileScreen ~ props:',
    route.params,
  );
  const profile = route.params;
  const handlePress = (question) => {
    navigation.navigate('UpdateQuestionScreen', question);
  };
  const handlePressRemove = async id => {
    try {
      await deleteQuestion(id);
      navigation.navigate('QuestionsScreen');
    } catch (error) {
      console.log('Ops! Something Went Wrong', error);
    }
  };

  return (
    <>
      <FloatingButton
        text="Add Answers"
        icon="edit"
        navigateTo="AddAnswersScreen"
        params={profile}
      />
      <View style={styles.container}>
        <View style={styles.profileHeader}>
          <Text style={styles.profileName}>Question</Text>
        </View>
        <View style={styles.profileDetails}>
          <View style={styles.profileItem}>
            {/* <Text style={styles.profileLabel}>Email</Text> */}
            <TouchableOpacity
              style={styles.profileItemSocial}
              onPress={() => handlePress(profile.id)}>
              <Text style={styles.profileLabel}>{profile.question}</Text>
            </TouchableOpacity>
          </View>
        </View>
        {profile.answers&&profile.answers.map((answer, index) => (
        <View key={`key${index}`} style={styles.answerDetails}>
          <View style={styles.answerItem}>
              <Text style={styles.answerUserLabel}>{answer.username}</Text>
              <Text style={styles.answerLabel}>{answer.answer}</Text>
          </View>
        </View> ))}
        <View style={styles.profileItemRemove}>
            <TouchableOpacity
              style={styles.profileItemTouchRemove}
              onPress={() => handlePressRemove(profile.id)}>
              <Text style={styles.profileLabelRemove}>Remove </Text>
              <Icon name="deleteuser" size={24} color="#fff" />
            </TouchableOpacity>
          </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profileHeader: {
    padding: 16,
    margin: 16,
    marginBottom: 0,
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: '#fff',
    elevation: 2,
  },
  profileItemRemove: {
    padding: 16,
    margin: 16,
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: 'red',
    elevation: 2,
  },
  profileLabelRemove: {
    fontSize: 18,
    fontWeight: 'bold',
    width: '40%',
    fontFamily: 'Hind Mysuru',
    color: '#fff',
  },
  profileItemTouchRemove: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    borderRadius: 8,
    backgroundColor: 'red',
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 0,
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: 'Hind Mysuru',
    color: '#323232',
  },
  profilePosition: {
    fontSize: 18,
    color: '#999999',
  },
  profileDetails: {
    padding: 20,
    fontFamily: 'Hind Mysuru',
    color: '#323232',
  },
  answerDetails: {
    padding: 20,
    fontFamily: 'Hind Mysuru',
    color: '#323232',
  },
  profileItem: {
    padding: 16,
    marginBottom: 0,
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    borderRadius: 8,
    backgroundColor:"#999999",
    elevation: 2,
  },
  answerItem: {
    padding: 16,
    marginBottom: 0,
    flexWrap: 'wrap',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    borderRadius: 8,
    backgroundColor:"#fff",
    elevation: 2,
  },
  profileItemSocial: {
    marginBottom: 0,
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    borderRadius: 8,
    backgroundColor:"#999999",
  },
  answerItemSocial: {
    flexWrap: 'wrap',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    borderRadius: 8,
    backgroundColor:"#fff",
  },
  answerLabel: {
    fontSize: 18,
    width: '100%',
    fontFamily: 'Hind Mysuru',
    color: '#323232',
    backgroundColor:"#fff",
  },
  answerUserLabel: {
    fontSize: 20,
    fontWeight: 'bold',
    width: '100%',
    fontFamily: 'Hind Mysuru',
    color: '#323232',
    backgroundColor:"#fff",
  },
  profileLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    width: '40%',
    fontFamily: 'Hind Mysuru',
    color: '#323232',
    backgroundColor:"#999999",
  },
  profileValue: {
    fontSize: 18,
    fontFamily: 'Hind Mysuru',
    color: '#323232',
  },
});

export default ProfileScreen;
