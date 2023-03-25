import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import FloatingButton from '../core/components/FloatingButton';
import { useNavigation } from '@react-navigation/native';
import { fetchProjects } from '../../services/ProjectService';
import { useIsFocused } from '@react-navigation/core';

const MembersScreen = () => {
  const projectInitialState = [
    {
        projectName: 'projectName',
        estimatedTime: 'estimatedTime',
        technologies: 'technologies',
        teamMembers: 'teamMembers',
        description: 'description',
        projectStatus: 'projectStatus',
        clinent: 'clinent',
        img:
        'https://firebasestorage.googleapis.com/v0/b/colab-12dc4.appspot.com/o/undraw_Growth_analytics_re_pyxf.png?alt=media&token=9c1b3987-cbb0-4ea2-a341-3df2376e2242',
    },
  ];
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [projects, setProject] = React.useState(projectInitialState);

    async function fetchMembers() {
      try {
        const projectArray = await fetchProjects();
        console.log("console log:",projectArray)
        setProject(projectArray);
      } catch (error) {
        console.error('Error fetching project: ', error);
      }
    }
    React.useEffect(() => {
    fetchMembers();
  }, []);

  React.useEffect(() => {
    fetchMembers();
  }, [isFocused]);

  const handleCardPress = project => {
    navigation.navigate('ProjectScreen', project);
  };
  const Card = ({ project }) => (
    <View style={styles.card}>
      <TouchableOpacity onPress={() => handleCardPress(project)}>
      <Image
          source={{
            uri:
            project.img ||
              'https://firebasestorage.googleapis.com/v0/b/colab-12dc4.appspot.com/o/undraw_Growth_analytics_re_pyxf.png?alt=media&token=9c1b3987-cbb0-4ea2-a341-3df2376e2242 ',
          }}
          style={styles.cardImage}
        />
        <Text style={styles.cardTitle}>{project.projectName}</Text>
        <Text style={styles.cardSubtitle}>{project.estimatedTime}</Text>
        <Text style={styles.cardSubtitle}>{project.technologies}</Text>
        <Text style={styles.cardSubtitle}>{project.teamMembers}</Text>
        <Text style={styles.cardSubtitle}>{project.description}</Text>
        <Text style={styles.cardSubtitle}>{project.projectStatus}</Text>
        <Text style={styles.cardSubtitle}>{project.clinent}</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <>
      <FloatingButton
        text="Add project"
        icon="adduser"
        navigateTo="NewProject"
      />

      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>projects</Text>
        </View>
        {projects.map((project, index) => (
          <Card key={index} project={project} />
        ))}
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 0,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  titleContainer: {
    padding: 16,
    marginBottom: 16,
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    borderRadius: 8,
    backgroundColor: '#fff',
    elevation: 2,
  },
  title: {
    fontFamily: 'Hind Mysuru',
    fontSize: 30,
    fontWeight: '300',
    fontStyle: 'normal',
    lineHeight: 38,
    letterSpacing: 0.5,
    color: '#323232',
  },
  card: {
    width: '100%',
    marginBottom: 16,
    borderRadius: 8,
    backgroundColor: '#fff',
    elevation: 2,
  },
  cardImage: {
    height: 200,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  cardTitle: {
    margin: 16,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#666',
  },
  cardSubtitle: {
    marginLeft: 16,
    marginBottom: 16,
    fontSize: 16,
    color: '#666',
  },
});

export default MembersScreen;
