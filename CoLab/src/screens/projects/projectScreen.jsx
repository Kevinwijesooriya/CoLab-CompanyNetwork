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
import { deleteProject } from '../../services/ProjectService';
import { useNavigation } from '@react-navigation/native';

const ProjectScreen = ({ route }) => {
  const navigation = useNavigation();
  const projectProfile = route.params;
  console.log(projectProfile)
  const handlePressRemove = async pid => {
    try {
      await deleteProject(pid);
      navigation.navigate('ViewAllProjects');
    } catch (error) {
      console.log('Ops! Something Went Wrong', error);
    }
  };

  return (
    <>
      <FloatingButton
        text="Change Details"
        icon="edit"
        navigateTo="UpdateProjectScreen"
        params={projectProfile.id}
      />
      <View style={styles.container}>
        <View style={styles.profileHeader}>
          <Text style={styles.profileName}>{projectProfile.projectName} Project</Text>
        </View>
        <View style={styles.profileHeader}>
          <Image
            source={{ uri: projectProfile.imageUrl }}
            style={styles.profileImage}
          />
          <View>
            <Text style={styles.profileName}>{projectProfile.description}</Text>
            <Text style={styles.profilePosition}>{projectProfile.technologies}</Text>
          </View>
        </View>
        <View style={styles.profileDetails}>
          <View style={styles.profileItem}>
            <Text style={styles.profileLabel}>Team Members</Text>
            <Text style={styles.profileValue}>{projectProfile.teamMembers}</Text>
          </View>
          <View style={styles.profileItem}>
            <Text style={styles.profileLabel}>Estimated Time Duration</Text>
            <Text style={styles.profileValue}>{projectProfile.estimatedTime}</Text>
          </View>
          <View style={styles.profileItem}>
            <Text style={styles.profileLabel}>Project Status</Text>
            <Text style={styles.profileValue}>{projectProfile.projectStatus}</Text>
          </View>
          <View style={styles.profileItem}>
          <Text style={styles.profileLabel}>client</Text>
          <Text style={styles.profileValue}>{projectProfile.clinent}</Text>
          </View>
          <View style={styles.profileItemRemove}>
            <TouchableOpacity
              style={styles.profileItemTouchRemove}
              onPress={() => handlePressRemove(projectProfile.id)}>
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
    fontSize: 17,
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
  profileLabelRemove: {
    fontSize: 18,
    fontWeight: 'bold',
    width: '40%',
    fontFamily: 'Hind Mysuru',
    color: '#fff',
  },
});

export default ProjectScreen;
