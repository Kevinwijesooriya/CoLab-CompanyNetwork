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

const ProfileScreen = ({ route }) => {
    const navigation = useNavigation();
  console.log(
    '🚀 ~ file: ProfileScreen.jsx:6 ~ ProfileScreen ~ props:',
    route.params,
  );
  const profile = route.params;
  const handlePress = async url => {
    await Linking.openURL(url);
  };

  return (
    <>
      <FloatingButton
        text="Add Answers"
        icon="edit"
        navigateTo="AddAnswersScreen"
        // params={profile.question}
      />
      <View style={styles.container}>
        <View style={styles.profileHeader}>
          <Text style={styles.profileName}>User Profile</Text>
        </View>
        <View style={styles.profileHeader}>
          <Image
            source={{ uri: profile.imageUrl }}
            style={styles.profileImage}
          />
          <View>
            <Text style={styles.profileName}>{profile.name}</Text>
            <Text style={styles.profilePosition}>{profile.position}</Text>
          </View>
        </View>
        <View style={styles.profileDetails}>
          <View style={styles.profileItem}>
            {/* <Text style={styles.profileLabel}>Email</Text> */}
            <Text style={styles.profileValue}>{profile.question}</Text>
          </View>
          <View style={styles.profileItem}>
            <Text style={styles.profileLabel}>Ongoing Project</Text>
            <Text style={styles.profileValue}>{profile.project}</Text>
          </View>
          <View style={styles.profileItem}>
            <TouchableOpacity
              style={styles.profileItemSocial}
              onPress={() => handlePress(profile.linkedIn)}>
              <Text style={styles.profileLabel}>LinkedIn Profile</Text>
              <Icon name="linkedin-square" size={24} color="#0077b5" />
            </TouchableOpacity>
          </View>
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
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    // width: '100%',
    borderRadius: 8,
    backgroundColor: '#fff',
    elevation: 2,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
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
  profileItem: {
    padding: 16,
    marginBottom: 16,
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    borderRadius: 8,
    backgroundColor: '#fff',
    elevation: 2,
  },
  profileItemSocial: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  profileLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    width: '40%',
    fontFamily: 'Hind Mysuru',
    color: '#323232',
  },
  profileValue: {
    fontSize: 18,
    fontFamily: 'Hind Mysuru',
    color: '#323232',
  },
});

export default ProfileScreen;
