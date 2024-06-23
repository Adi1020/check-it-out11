import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../contexts/themeContext'; 

const ProfileScreen = () => {
  const { theme } = useTheme();
  const navigation = useNavigation();

  const onLogout = () => {
    navigation.goBack();
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.text, { color: theme.text }]}>PROFILE</Text>
      <TouchableOpacity style={[styles.logoutButton, { backgroundColor: theme.button }]} onPress={onLogout}>
        <Text style={[styles.goBackButton, { color: theme.buttonText }]}>Go back</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  logoutButton: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  goBackButton: {
    color: '#fff',
    fontSize: 14,
  },
});

export default ProfileScreen;
