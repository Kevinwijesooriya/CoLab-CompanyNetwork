import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
} from 'react-native';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { firebaseApp } from '../../../firebaseConfig';
import { AddProject } from '../../services/ProjectService';

const AddProjectScreen = () => {
  const auth = getAuth(firebaseApp);
  const [projectName, setProjectName] = useState('');
  const [estimatedTime, setEstimatedTime] = useState('');
  const [technologies, setTechnologies] = useState('');
  const [teamMembers, setTeamMembers] = useState('');
  // const [teamMembers, setteamMembers] = useState([]);
  const [description, setDescription] = useState('');
  const [projectStatus, setProjectStatus] = useState('');
  const [clinent, setClinent] = useState('');
  const [error, setError] = useState(null);

  const handleAddProject = async () => {
    let payload = {
      projectName,
      estimatedTime,
      technologies,
      teamMembers,
      description,
      projectStatus,
      clinent,
    };
    AddProject(payload);
  };

  return (
    <>
      <View style={styles.imageContainer}>
        <Image source={require('../../assets/Team.png')} style={styles.image} />
      </View>
      
      <ScrollView contentContainerStyle={styles.containerScroll}>
      <View style={styles.container}>
        <Text style={styles.title}>New Project</Text>
        <TextInput
          style={styles.input}
          placeholder="Project Name"
          placeholderTextColor="#B5B5B5"
          onChangeText={text => setProjectName(text)}
          value={projectName}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholder="Estimated Time"
          placeholderTextColor="#B5B5B5"
          onChangeText={text => setEstimatedTime(text)}
          value={estimatedTime}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholder="Technologies"
          placeholderTextColor="#B5B5B5"
          onChangeText={text => setTechnologies(text)}
          value={technologies}
          autoCapitalize="none"
          keyboardType="email-address"
        />
         <TextInput
          style={styles.input}
          placeholder="Team Members"
          placeholderTextColor="#B5B5B5"
          onChangeText={text => setTeamMembers(text)}
          value={teamMembers}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholder="Description"
          placeholderTextColor="#B5B5B5"
          onChangeText={text => setDescription(text)}
          value={description}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholder="ProjectStatus"
          placeholderTextColor="#B5B5B5"
          onChangeText={text => setProjectStatus(text)}
          value={projectStatus}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholder="Clinent"
          placeholderTextColor="#B5B5B5"
          onChangeText={text => setClinent(text)}
          value={clinent}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        {error && <Text style={styles.error}>{error}</Text>}
        <TouchableOpacity style={styles.button} onPress={handleAddProject}>
          <Text style={styles.buttonText}>Add</Text>
        </TouchableOpacity>
      </View>
        </ScrollView>
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
  containerScroll: {
    padding: 16,
    paddingBottom: 0,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
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
    fontSize: 30,
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

export default AddProjectScreen;
