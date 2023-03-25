import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import { fetchProject, updateProject } from '../../services/ProjectService';
import { useNavigation } from '@react-navigation/native';

const UpdateProjectScreen = ({ route }) => {
  console.log(
    '🚀 ~ file: MemberUpdateScreen.jsx:14 ~ MemberUpdateScreen ~ route.params:',
    route.params,
  );
  const pid = route.params;

  const [projectName, setProjectName] = useState('');
  const [estimatedTime, setEstimatedTime] = useState('');
  const [technologies, setTechnologies] = useState('');
  const [teamMembers, setTeamMembers] = useState('');
  // const [teamMembers, setteamMembers] = useState([]);
  const [description, setDescription] = useState('');
  const [projectStatus, setProjectStatus] = useState('');
  const [clinent, setClinent] = useState('');
  const [error, setError] = useState(null);
  const navigation = useNavigation();

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
    try{
    await updateProject(pid, payload);
    navigation.navigate('ViewAllProjects');
  } catch (error) {
    setError('Update Failed');
  }
  };
  React.useEffect(() => {
    async function fetchProjects() {
      try {
        const projectArray = await fetchProject(pid);
        setProjectName(projectArray.projectName)
        setEstimatedTime(projectArray.estimatedTime)
        setTechnologies(projectArray.technologies)
        setTeamMembers(projectArray.teamMembers)
        setDescription(projectArray.description)
        setProjectStatus(projectArray.projectStatus)
        setClinent(projectArray.clinent)
        // {
        //   usersArray.project && setProject(usersArray.project);
        // }
        // {
        //   usersArray.linkedIn && setLinkedIn(usersArray.linkedIn);
        // }
      } catch (error) {
        console.error('Error fetching project: ', error);
        console.error("fetched details:",projectArray)
      }
    }

    fetchProjects();
  }, []);

  return (
    <>
      <View style={styles.imageContainer}>
        <Image source={require('../../assets/Team.png')} style={styles.image} />
      </View>
      <View style={styles.container}>
        <Text style={styles.title}>Update Project</Text>
        {/* <Text style={styles.label}>Name</Text>
        <TextInput
          mode="outlined"
          style={styles.input}
          placeholder="Project Name"
          placeholderTextColor="#B5B5B5"
          onChangeText={text => setProjectName(text)}
          value={projectName}
          autoCapitalize="none"
          keyboardType="email-address"
        /> */}
        <Text style={styles.label}>Estimated Time</Text>
        <TextInput
          style={styles.input}
          placeholder="Estimated Time"
          placeholderTextColor="#B5B5B5"
          onChangeText={text => setEstimatedTime(text)}
          value={estimatedTime}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        <Text style={styles.label}>Technologies</Text>
        <TextInput
          style={styles.input}
          placeholder="Technologies"
          placeholderTextColor="#B5B5B5"
          onChangeText={text => setTechnologies(text)}
          value={technologies}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        <Text style={styles.label}>Team Members</Text>
        <TextInput
          style={styles.input}
          placeholder="Team Members"
          placeholderTextColor="#B5B5B5"
          onChangeText={text => setTeamMembers(text)}
          value={teamMembers}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        <Text style={styles.label}>Description</Text>
        <TextInput
          style={styles.input}
          placeholder="Description"
          placeholderTextColor="#B5B5B5"
          onChangeText={text => setDescription(text)}
          value={description}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        <Text style={styles.label}>Project Status</Text>
        <TextInput
          style={styles.input}
          placeholder="ProjectStatus"
          placeholderTextColor="#B5B5B5"
          onChangeText={text => setProjectStatus(text)}
          value={projectStatus}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        <Text style={styles.label}>Client</Text>
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
    fontSize: 20,
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
    height: 40,
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

export default UpdateProjectScreen;
