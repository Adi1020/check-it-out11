// import { auth } from '../utils/firebase';
// import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';

// // Login function using Firebase Authentication
// export const login = async (email, password) => {
//   try {
//     const userCredential = await signInWithEmailAndPassword(auth, email, password);
//     return { success: true, user: userCredential.user };
//   } catch (error) {
//     return { success: false, error: error.message };
//   }
// };

// // Signup function using Firebase Authentication
// export const signup = async (email, password) => {
//   try {
//     const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//     return { success: true, user: userCredential.user };
//   } catch (error) {
//     return { success: false, error: error.message };
//   }
// }; working code

// import { getAuth, setPersistence, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, browserSessionPersistence } from 'firebase/auth';
// import { getFirestore, doc, setDoc } from 'firebase/firestore';
// import { app } from './firebase'; 
// import { setSession, clearSession } from './session';

// const auth = getAuth(app);
// const firestore = getFirestore(app);

// const login = async (email, password) => {
//   try {
//     await setPersistence(auth, browserSessionPersistence);
//     const userCredential = await signInWithEmailAndPassword(auth, email, password);
//     setSession(userCredential.user);
//     return { success: true, user: userCredential.user };
//   } catch (error) {
//     return { success: false, error: error.message };
//   }
// };

// const register = async (email, password, additionalData) => {
//   try {
//     await setPersistence(auth, browserSessionPersistence);
//     const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//     const user = userCredential.user;
//     await setDoc(doc(firestore, 'users', user.uid), {
//       email: user.email,
//       firstName: additionalData.firstName,
//       lastName: additionalData.lastName,
//       lists: []
//     });
//     setSession(user);
//     return { success: true, user };
//   } catch (error) {
//     return { success: false, error: error.message };
//   }
// };

// const logout = async () => {
//   try {
//     await signOut(auth);
//     clearSession();
//   } catch (error) {
//     throw error;
//   }
// };

// export { auth, login, register, logout };
import { getAuth, setPersistence, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, browserSessionPersistence } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { app } from './firebase';
import { setSession, clearSession } from './session';

const auth = getAuth(app);
const firestore = getFirestore(app);

const login = async (email, password) => {
  try {
    await setPersistence(auth, browserSessionPersistence);
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const token = await userCredential.user.getIdToken(); // Get the token
    await setSession({ ...userCredential.user, token }); // Store the token
    return { success: true, user: userCredential.user };
  } catch (error) {
    console.error('Login error:', error);
    return { success: false, error: error.code };
  }
};

const register = async (email, password, additionalData = {}) => {
  try {
    await setPersistence(auth, browserSessionPersistence);
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    await setDoc(doc(firestore, 'users', user.uid), {
      email: user.email,
      firstName: additionalData.firstName || '',
      lastName: additionalData.lastName || '',
      lists: []
    });
    const token = await user.getIdToken(); // Get the token
    await setSession({ ...user, token }); // Store the token
    return { success: true, user };
  } catch (error) {
    console.error('Registration error:', error);
    return { success: false, error: error.message };
  }
};

const logout = async () => {
  try {
    await signOut(auth);
    await clearSession();
  } catch (error) {
    throw error;
  }
};

export { auth, login, register, logout };
