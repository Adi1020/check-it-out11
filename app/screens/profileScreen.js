import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ProfileScreen = () => {
  const navigation = useNavigation();
  console.log('ProfileScreen');

  const onLogout = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.profileText}>create new list</Text>
      {/* Add more profile details here */}
      <TouchableOpacity style={styles.logoutButton} onPress={onLogout}>
        <Text style={styles.goBackButton}>Go back</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  profileText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  logoutButton: {
    backgroundColor: '#dc3545',
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
