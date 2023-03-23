import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { firebaseApp } from '../../../firebaseConfig';
import { AddMember } from '../../services/AuthService';

const NewMemberScreen = () => {
  const auth = getAuth(firebaseApp);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [position, setPosition] = useState('');
  const [companyName, setCompanyName] = useState('Hatchyard');
  const [error, setError] = useState(null);

  const handleAddMember = async () => {
    let payload = {
      name,
      email,
      password,
      position,
      companyName,
    };
    try {
      const response = await AddMember(payload);
      console.log('User added to Firestore', response);
    } catch (error) {
      setError('Error adding user to Firestore');
      console.error('Error adding user to Firestore: ', error);
    }
  };

  return (
    <>
      <View style={styles.imageContainer}>
        <Image source={require('../../assets/Team.png')} style={styles.image} />
      </View>
      <View style={styles.container}>
        <Text style={styles.title}>New Member</Text>
        <TextInput
          style={styles.input}
          placeholder="Name"
          placeholderTextColor="#B5B5B5"
          onChangeText={text => setName(text)}
          value={name}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholder="Position"
          placeholderTextColor="#B5B5B5"
          onChangeText={text => setPosition(text)}
          value={position}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholder="Username"
          placeholderTextColor="#B5B5B5"
          onChangeText={text => setEmail(text)}
          value={email}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#B5B5B5"
          onChangeText={text => setPassword(text)}
          value={password}
          secureTextEntry
        />
        {error && <Text style={styles.error}>{error}</Text>}
        <TouchableOpacity style={styles.button} onPress={handleAddMember}>
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

export default NewMemberScreen;
