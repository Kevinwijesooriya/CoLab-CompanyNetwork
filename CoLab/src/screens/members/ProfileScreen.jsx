import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  Linking,
  TouchableOpacity,
} from 'react-native';
import FloatingButton from '../core/components/FloatingButton';
import Icon from 'react-native-vector-icons/AntDesign';
import { deleteUser, updateUserProfile } from '../../services/AuthService';
import { useNavigation } from '@react-navigation/native';
import ImagePicker from 'react-native-image-crop-picker';
import { uploadImage } from '../core/ImageUpload';

const ProfileScreen = ({ route }) => {
  const navigation = useNavigation();
  const profile = route.params;
  const [imgFile, setFile] = React.useState(null);

  const handlePressImage = async () => {
    try {
      const image = await ImagePicker.openPicker({
        width: 300,
        height: 400,
        cropping: true,
      });
      setFile(image);
      const file = {
        uri: image.path,
        type: image.mime,
      };
      const imageUrl = await uploadImage(file);
      console.log('Upload success', imageUrl);
      setFile(imageUrl);
      await updateUserProfile(profile.uid, imageUrl);
      console.log('Update profile info');
    } catch (error) {
      console.log('Upload error', error);
    }
  };

  const handlePressLinkedIn = async url => {
    await Linking.openURL(url);
  };
  const handlePressRemove = async uid => {
    try {
      await deleteUser(uid);
      navigation.navigate('MembersScreen');
    } catch (error) {
      console.log('Ops! Something Went Wrong', error);
    }
  };

  return (
    <>
      <FloatingButton
        text="Change Details"
        icon="edit"
        navigateTo="MemberUpdateScreen"
        params={profile}
      
      />
      <View style={styles.container}>
        <View style={styles.profileHeader}>
          <Text style={styles.profileName}>User Profile</Text>
        </View>
        <View style={styles.profileHeader}>
          <TouchableOpacity onPress={() => handlePressImage()}>
            <Image
              source={{
                uri:
                  (imgFile !== null && imgFile) ||
                  profile.imageUrl ||
                  'http://drive.google.com/uc?export=view&id=1k11P0jqhLZFSGOFMXSSZizd7QrRr_K5J',
              }}
              style={styles.profileImage}
            />
          </TouchableOpacity>
          <View>
            <Text style={styles.profileName}>{profile.name}</Text>
            <Text style={styles.profilePosition}>{profile.position}</Text>
          </View>
        </View>
        <View style={styles.profileDetails}>
          <View style={styles.profileItem}>
            <Text style={styles.profileLabel}>Email</Text>
            <Text style={styles.profileValue}>{profile.email}</Text>
          </View>
          <View style={styles.profileItem}>
            <Text style={styles.profileLabel}>Ongoing Project</Text>
            <Text style={styles.profileValue}>{profile.project}</Text>
          </View>
          <View style={styles.profileItem}>
            <TouchableOpacity
              style={styles.profileItemSocial}
              onPress={() => handlePressLinkedIn(profile.linkedIn)}>
              <Text style={styles.profileLabel}>LinkedIn Profile</Text>
              <Icon name="linkedin-square" size={24} color="#0077b5" />
            </TouchableOpacity>
          </View>
          <View style={styles.profileItemRemove}>
            <TouchableOpacity
              style={styles.profileItemTouchRemove}
              onPress={() => handlePressRemove(profile.uid)}>
              <Text style={styles.profileLabelRemove}>Remove </Text>
              <Icon name="deleteuser" size={24} color="#fff" />
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
  profileItemRemove: {
    padding: 16,
    marginBottom: 16,
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    borderRadius: 8,
    backgroundColor: 'red',
    elevation: 2,
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
  profileLabelRemove: {
    fontSize: 18,
    fontWeight: 'bold',
    width: '40%',
    fontFamily: 'Hind Mysuru',
    color: '#fff',
  },
  profileValue: {
    fontSize: 18,
    fontFamily: 'Hind Mysuru',
    color: '#323232',
  },
});

export default ProfileScreen;
