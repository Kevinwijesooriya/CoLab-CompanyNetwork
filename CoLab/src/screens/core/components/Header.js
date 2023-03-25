import { getAuth, signOut } from 'firebase/auth';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { firebaseApp } from '../../../../firebaseConfig';

const auth = getAuth(firebaseApp);
const handleSignOut = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error('Error signing out: ', error);
  }
};
export const Header = title => ({
  headerTitle: title || 'CoLab',
  headerRight: () => (
    <>
      <TouchableOpacity onPress={handleSignOut}>
        <Icon name="logout" size={24} color="#323232" />
      </TouchableOpacity>
    </>
  ),
});
