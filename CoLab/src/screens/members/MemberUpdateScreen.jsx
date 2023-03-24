import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import { fetchUser, updateUser } from '../../services/AuthService';

const MemberUpdateScreen = ({ route }) => {
  const navigation = useNavigation();
  const profile = route.params;

  const [name, setName] = useState('');
  const [position, setPosition] = useState('');
  const [project, setProject] = useState('');
  const [linkedIn, setLinkedIn] = useState('');
  const [error, setError] = useState(null);

  const handleUpdateMember = async () => {
    let payload = {
      name,
      position,
      project,
      linkedIn,
    };
    try {
      await updateUser(profile.uid, payload);
      navigation.navigate('ProfileScreen', profile);
    } catch (error) {
      setError('Update Failed');
    }
  };
  React.useEffect(() => {
    async function fetchMember() {
      try {
        const usersArray = await fetchUser(profile.uid);
        setName(usersArray.name);
        setPosition(usersArray.position);
        {
          usersArray.project && setProject(usersArray.project);
        }
        {
          usersArray.linkedIn && setLinkedIn(usersArray.linkedIn);
        }
      } catch (error) {
        console.error('Error fetching members: ', error);
      }
    }

    fetchMember();
  }, []);

  return (
    <>
      <View style={styles.imageContainer}>
        <Image source={require('../../assets/Team.png')} style={styles.image} />
      </View>
      <View style={styles.container}>
        <Text style={styles.title}>Update Profile</Text>
        <Text style={styles.label}>Name</Text>
        <TextInput
          mode="outlined"
          style={styles.input}
          placeholder="Name"
          placeholderTextColor="#B5B5B5"
          onChangeText={text => setName(text)}
          value={name}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        <Text style={styles.label}>Position</Text>
        <TextInput
          style={styles.input}
          placeholder="Position"
          placeholderTextColor="#B5B5B5"
          onChangeText={text => setPosition(text)}
          value={position}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        <Text style={styles.label}>Current Project</Text>
        <TextInput
          style={styles.input}
          placeholder="Current Project"
          placeholderTextColor="#B5B5B5"
          onChangeText={text => setProject(text)}
          value={project}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        <Text style={styles.label}>LinkedIn Profile</Text>
        <TextInput
          style={styles.input}
          placeholder="LinkedIn Profile"
          placeholderTextColor="#B5B5B5"
          onChangeText={text => setLinkedIn(text)}
          value={linkedIn}
          keyboardType="email-address"
        />
        {error && <Text style={styles.error}>{error}</Text>}
        <TouchableOpacity style={styles.button} onPress={handleUpdateMember}>
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

export default MemberUpdateScreen;
