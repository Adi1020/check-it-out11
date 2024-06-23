import React from 'react';
import { View, Text, Linking, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const LinkedInButton = () => {
  const handlePress = () => {
    Linking.openURL('https://www.linkedin.com/in/adi-simhi217/');
  };

  return (
    <TouchableOpacity style={styles.button} onPress={handlePress}>
      <Icon name="linkedin-square" size={30} color="#0077B5" />
      <Text style={styles.text}>Connect with me on LinkedIn</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  text: {
    marginLeft: 10,
    color: '#0077B5',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default LinkedInButton;
