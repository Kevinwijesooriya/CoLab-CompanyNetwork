import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import FloatingButton from '../core/components/FloatingButton';

const ProfileScreen = () => {
  const profile = {
    name: 'John Doe',
    position: 'CEO',
    email: 'johndoe@example.com',
    project: 'Product Launch',
    image:
      'http://drive.google.com/uc?export=view&id=1k11P0jqhLZFSGOFMXSSZizd7QrRr_K5J',
  };

  return (
    <>
      <FloatingButton
        text="Change Details"
        icon="edit"
        navigateTo="MemberUpdateScreen"
      />
      <View style={styles.container}>
        <View style={styles.profileHeader}>
          <Text style={styles.profileName}>User Profile</Text>
        </View>
        <View style={styles.profileHeader}>
          <Image source={{ uri: profile.image }} style={styles.profileImage} />
          <View>
            <Text style={styles.profileName}>{profile.name}</Text>
            <Text style={styles.profilePosition}>{profile.position}</Text>
          </View>
        </View>
        <View style={styles.profileDetails}>
          <View style={styles.profileItem}>
            <Text style={styles.profileLabel}>Email</Text>
            <Text style={styles.profileValue}>{profile.email}</Text>
          </View>
          <View style={styles.profileItem}>
            <Text style={styles.profileLabel}>Ongoing Project</Text>
            <Text style={styles.profileValue}>{profile.project}</Text>
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
    fontSize: 24,
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
});

export default ProfileScreen;
