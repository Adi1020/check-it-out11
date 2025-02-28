import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, FlatList, StyleSheet, Text, Image } from 'react-native';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, firestore } from '../utils/firebase';
import { doc, setDoc } from 'firebase/firestore'; 

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigation.navigate('Home');
    } catch (error) {
      setError(error.message);
    }
  };

  const handleSignup = async () => {
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }
    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      await setDoc(doc(firestore, 'users', user.uid), {
        email,
      });
      navigation.navigate('Home'); // This line navigates to the homeScreen
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.leftPanel}>
        <Image source={require('../icons/m33t_login.png')} style={styles.image} />
        <Text style={styles.companyText}>alfa_tech</Text>
        <Text style={styles.appText}>check it out</Text>
      </View>
      <View style={styles.rightPanel}>
        <Text style={styles.welcomeText}>Welcome</Text>
        <Text style={styles.subtitle}>Start managing your lists faster and better</Text>
        {error ? <Text style={styles.error}>{error}</Text> : null}
        <TextInput
          style={styles.input}
          placeholder="Email Address"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity style={styles.forgotPassword}>
          <Text style={styles.forgotPasswordText}>Forgot password?</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <View style={styles.socialButtons}>
          <TouchableOpacity style={styles.googleButton}>
            <Text style={styles.googleButtonText}>Google</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.facebookButton}>
            <Text style={styles.facebookButtonText}>Facebook</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={handleSignup}>
          <Text style={styles.signupText}>Don't you have an account? Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fff',
  },
  leftPanel: {
    flex: 1,
    backgroundColor: '#F4F5F7',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    
  },
  rightPanel: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: 20,
    borderRadius: 100,
  },
  companyText: {
    fontSize: 18,
    color: '#333',
    marginBottom: 5,
    fontWeight: 'bold',
  },
  appText: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 20,
    color: '#888',
    marginBottom: 20,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  input: {
    width: '80%',
    height: 50,
    marginVertical: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginRight: '10%',
    marginBottom: 20,
  },

  forgotPasswordText: {
    color: 'black',
    fontSize: 14,
    fontWeight: 'bold',
    
  },
  button: {
    width: '80%',
    height: 50,
    marginVertical: 10,
    backgroundColor: '#89D3DF',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },

  buttonText: {
    color: '#fff',
    fontSize: 16,
  },

  socialButtons: {  
    flexDirection: 'row',
    width: '80%',
    justifyContent: 'space-between',
    marginVertical: 10,
  },

  googleButton: {
    flex: 1,
    height: 50,
    marginRight: 10,
    backgroundColor: '#4285F4', 
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },

  googleButtonText: {
    color: '#fff',
    fontSize: 16,
  },

  facebookButton: {
    flex: 1,
    height: 50,
    marginLeft: 10,
    backgroundColor: '#4267B2',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },

  facebookButtonText: {
    color: '#fff',
    fontSize: 16,
  },

  signupText: {
    color: 'black',
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 20,
  },

  error: {
    color: 'red',
    marginBottom: 20,
  },
});

export default LoginScreen;
