// import {auth} from './utils/firebase';


// export const login = async (email, password) => {
//   try {
//     const userCredential = await auth().signInWithEmailAndPassword(email, password);
//     return { success: true, user: userCredential.user };
//   } catch (error) {
//     return { success: false, error: error.message };
//   }
// };

// export const signup = async (email, password) => {
//   try {
//     const userCredential = await auth().createUserWithEmailAndPassword(email, password);
//     return { success: true, user: userCredential.user };
//   } catch (error) {
//     return { success: false, error: error.message };
//   }
// };


// app/utils/auth.js
import { auth } from './utils/firebase';

export const login = async (email, password) => {
  try {
    const response = await fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    if (data.success) {
      // Handle successful login
      return { success: true, user: data.user };
    } else {
      throw new Error(data.error);
    }
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const signup = async (email, password) => {
  try {
    const response = await fetch('/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    if (data.success) {
      // Handle successful signup
      return { success: true, user: data.user };
    } else {
      throw new Error(data.error);
    }
  } catch (error) {
    return { success: false, error: error.message };
  }
};