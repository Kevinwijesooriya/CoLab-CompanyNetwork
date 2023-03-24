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

const members = [
  {
    name: 'John Doe',
    position: 'CEO',
    imageUrl:
      'http://drive.google.com/uc?export=view&id=1k11P0jqhLZFSGOFMXSSZizd7QrRr_K5J',
  },
  {
    name: 'Jane Doe',
    position: 'CTO',
    imageUrl:
      'http://drive.google.com/uc?export=view&id=1ppXO876d0MzXfLJVmXazY5ZWx41yentN',
  },
  {
    name: 'Bob Smith',
    position: 'CFO',
    imageUrl:
      'http://drive.google.com/uc?export=view&id=1k11P0jqhLZFSGOFMXSSZizd7QrRr_K5J',
  },
  {
    name: 'John Doe',
    position: 'CEO',
    imageUrl:
      'http://drive.google.com/uc?export=view&id=1k11P0jqhLZFSGOFMXSSZizd7QrRr_K5J',
  },
  {
    name: 'Jane Doe',
    position: 'CTO',
    imageUrl:
      'http://drive.google.com/uc?export=view&id=1ppXO876d0MzXfLJVmXazY5ZWx41yentN',
  },
  {
    name: 'Bob Smith',
    position: 'CFO',
    imageUrl:
      'http://drive.google.com/uc?export=view&id=1k11P0jqhLZFSGOFMXSSZizd7QrRr_K5J',
  },
  {
    name: 'John Doe',
    position: 'CEO',
    imageUrl:
      'http://drive.google.com/uc?export=view&id=1k11P0jqhLZFSGOFMXSSZizd7QrRr_K5J',
  },
  {
    name: 'Jane Doe',
    position: 'CTO',
    imageUrl:
      'http://drive.google.com/uc?export=view&id=1ppXO876d0MzXfLJVmXazY5ZWx41yentN',
  },
  {
    name: 'Bob Smith',
    position: 'CFO',
    imageUrl:
      'http://drive.google.com/uc?export=view&id=1k11P0jqhLZFSGOFMXSSZizd7QrRr_K5J',
  },
  {
    name: 'Alice Johnson',
    position: 'COO',
    imageUrl:
      'http://drive.google.com/uc?export=view&id=1ppXO876d0MzXfLJVmXazY5ZWx41yentN',
  },
  {
    name: 'Bob Smith',
    position: 'CFO',
    imageUrl:
      'http://drive.google.com/uc?export=view&id=1k11P0jqhLZFSGOFMXSSZizd7QrRr_K5J',
  },
  {
    name: 'Alice Johnson',
    position: 'COO',
    imageUrl:
      'http://drive.google.com/uc?export=view&id=1ppXO876d0MzXfLJVmXazY5ZWx41yentN',
  },
];

const ViewAllProjects = () => {
  const navigation = useNavigation();
  const handleCardPress = () => {
    navigation.navigate('ProfileScreen');
  };
  const Card = ({ name, position, imageUrl }) => (
    <View style={styles.card}>
      <TouchableOpacity onPress={() => handleCardPress()}>
        <Image source={{ uri: imageUrl }} style={styles.cardImage} />
        <Text style={styles.cardTitle}>{name}</Text>
        <Text style={styles.cardSubtitle}>{position}</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <>
      <FloatingButton
        text="Add Member"
        icon="adduser"
        navigateTo="NewMemberScreen"
      />

      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Our Team</Text>
        </View>
        {members.map((member, index) => (
          <Card key={index} {...member} />
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
    width: '48%',
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

export default ViewAllProjects;
