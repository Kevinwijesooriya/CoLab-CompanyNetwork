import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const InitialScreen = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/InitialLogo.png')}
        style={styles.image}
      />
      <Text style={styles.text}>COLAB</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 273,
    height: 273,
  },
  text: {
    height: 57,
    fontFamily: 'Hubballi',
    fontSize: 60,
    fontWeight: '400',
    fontStyle: 'normal',
    lineHeight: 60,
    letterSpacing: 6.5,
    color: '#323232',
  },
});

export default InitialScreen;
