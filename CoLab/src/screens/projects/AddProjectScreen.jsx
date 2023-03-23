import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

const NewMemberScreen = () => {

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>New Project</Text>
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
});

export default NewMemberScreen;
