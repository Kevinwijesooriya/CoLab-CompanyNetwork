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
import { fetchUsers } from '../../services/AuthService';

const MembersScreen = () => {
  const membersInitialState = [
    {
      name: 'Name',
      position: 'Position',
      imageUrl:
        'http://drive.google.com/uc?export=view&id=1k11P0jqhLZFSGOFMXSSZizd7QrRr_K5J',
    },
  ];
  const navigation = useNavigation();
  const [members, setMembers] = React.useState(membersInitialState);
  React.useEffect(() => {
    async function fetchMembers() {
      try {
        const usersArray = await fetchUsers();
        setMembers(usersArray);
      } catch (error) {
        console.error('Error fetching members: ', error);
      }
    }

    fetchMembers();
  }, []);

  const handleCardPress = member => {
    navigation.navigate('ProfileScreen', member);
  };
  const Card = ({ member }) => (
    <View style={styles.card}>
      <TouchableOpacity onPress={() => handleCardPress(member)}>
        <Image source={{ uri: member.imageUrl }} style={styles.cardImage} />
        <Text style={styles.cardTitle}>{member.name}</Text>
        <Text style={styles.cardSubtitle}>{member.position}</Text>
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
          <Card key={index} member={member} />
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

export default MembersScreen;
