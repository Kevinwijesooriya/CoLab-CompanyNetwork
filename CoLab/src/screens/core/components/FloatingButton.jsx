import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

const FloatingButton = props => {
  const { text, icon, navigateTo } = props;
  const navigate = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigate.push(navigateTo)}>
        <Icon name={icon} size={24} color="#FFF" />
        <Text style={styles.text}>{text}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    zIndex: 20,
  },
  button: {
    backgroundColor: '#323232',
    borderRadius: 20,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
    marginLeft: 10,
  },
});

export default FloatingButton;
