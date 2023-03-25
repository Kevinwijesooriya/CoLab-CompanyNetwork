import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

const NavBar = () => {
  const navigation = useNavigation();
  return (
    <>
      <View style={styles.navBar}>
        <TouchableOpacity
          style={styles.navBarButton}
          onPress={() => navigation.navigate('ViewPostScreen')}>
          <Icon name="text-snippet" size={24} color="#666" />
          <Text style={styles.navBarButtonText}>POSTS</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navBarButton}
          onPress={() => navigation.navigate('ViewAllProjects')}>
          <Icon name="insights" size={24} color="#666" />
          <Text style={styles.navBarButtonText}>PROJECTS</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navBarButton}
          onPress={() => navigation.navigate('MembersScreen')}>
          <Icon name="people" size={24} color="#666" />
          <Text style={styles.navBarButtonText}>TEAM</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navBarButton}
          onPress={() => navigation.navigate('QuestionsScreen')}>
          <Icon name="question-answer" size={24} color="#666" />
          <Text style={styles.navBarButtonText}>Q&A</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  navBar: {
    margin: 16,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 60,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    marginBottom: 0,
  },
  navBarButton: {
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
  },
  navBarButtonText: {
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: 5,
    color: '#666',
  },
});

export default NavBar;
