// import React, { useState, useEffect } from 'react';
// import { View, TextInput, TouchableOpacity, FlatList, StyleSheet, Text } from 'react-native';
// import { signOut } from 'firebase/auth';
// import { doc, getDoc, updateDoc, arrayUnion, arrayRemove, addDoc, collection, deleteDoc } from 'firebase/firestore';
// import { auth, firestore } from '../utils/firebase';
// import { useNavigation } from '@react-navigation/native'; 
// import Header from '../components/headers';

// const HomeScreen = () => {
//   const navigation = useNavigation(); 
//   const [userData, setUserData] = useState(null);
//   const [newListName, setNewListName] = useState('');
//   const [isLoading, setIsLoading] = useState(true);
//   const [lists, setLists] = useState([]); 

//   useEffect(() => {  
//     const fetchUserData = async () => {
//       try {
//         const userDoc = doc(firestore, 'users', auth.currentUser.uid);
//         const userSnapshot = await getDoc(userDoc);
//         if (userSnapshot.exists()) {
//           const userData = userSnapshot.data();
//           setUserData(userData);
//           const userLists = await Promise.all(userData.lists.map(async (listId) => {
//             const listDoc = await getDoc(doc(firestore, 'lists', listId));
//             return { id: listId, ...listDoc.data() };
//           }));
//           setLists(userLists);
//         }
//       } catch (error) {
//         console.error('Error fetching user data:', error);
//       } finally {
//         setIsLoading(false);
//       }
//     };
//     fetchUserData();
//   }, []);

//   const handleCreateList = async () => {
//     try {
//       const currentUser = auth.currentUser;
//       const userEmail = currentUser.email;

//       const newListRef = await addDoc(collection(firestore, 'lists'), {
//         name: newListName,
//         items: [],
//         userId: currentUser.uid,
//         userEmail: userEmail,
//       });

//       const userDoc = doc(firestore, 'users', currentUser.uid);
//       await updateDoc(userDoc, {
//         lists: arrayUnion(newListRef.id),
//       });

//       setLists((prevLists) => [...prevLists, { id: newListRef.id, name: newListName, items: [] }]);
//       setNewListName('');
//     } catch (error) {
//       console.error('Error creating list:', error);
//     }
//   };

//   const handleDeleteList = async (listId) => {
//     try {
//       const userDoc = doc(firestore, 'users', auth.currentUser.uid);
//       await updateDoc(userDoc, {
//         lists: arrayRemove(listId),
//       });

//       const listDoc = doc(firestore, 'lists', listId);
//       await deleteDoc(listDoc);

//       setLists((prevLists) => prevLists.filter((list) => list.id !== listId));
//     } catch (error) {
//       console.error('Error deleting list:', error);
//     }
//   };

//   const handleLogout = async () => {
//     try {
//       await signOut(auth);
//       console.log('Successfully logged out');
//       navigation.navigate('Login');
//     } catch (error) {
//       console.error('Logout error:', error);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Header title="Check-It-Out" onLogout={handleLogout} />
//       {isLoading ? (
//         <Text style={styles.loadingText}>Loading...</Text>
//       ) : (
//         <>
//           <FlatList
//             style={styles.flatList} 
//             data={lists}
//             keyExtractor={(item) => item.id}
//             renderItem={({ item }) => (
//               <View style={styles.button}>
//                 <Text style={styles.buttonText}>{item.name}</Text>
//                 <TouchableOpacity onPress={() => handleDeleteList(item.id)}>
//                   <Text style={styles.buttonText}>Delete</Text>
//                 </TouchableOpacity>
//               </View>
//             )}
//           />
//           <View style={styles.inputContainer}>
//             <TextInput
//               style={styles.input}
//               placeholder="Create a new list"
//               value={newListName}
//               onChangeText={setNewListName}
//             />
//             <TouchableOpacity style={styles.button} onPress={handleCreateList}>
//               <Text style={styles.buttonText}>Create</Text>
//             </TouchableOpacity>
//           </View>
//         </>
//       )}
//       <TouchableOpacity 
//         style={styles.profileButton}
//         onPress={() => navigation.navigate('Profile')}
//       >
//         <Text style={styles.profileButtonText}>Go to Profile</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     padding: 20,
//     justifyContent: 'flex-start',
//     alignContent: 'flex-start',
//   },
//   emptyText: {
//     textAlign: 'center',
//     padding: 20,
//     backgroundColor: 'blue',
//   },
//   inputContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: 20,
//     borderWidth: 1,
//   },
//   flatList: {
//     flex: 1,
//     padding: 20,
//     borderWidth: 1,
//     borderColor: '#333',
//     borderRadius: 5,
//   },
//   input: {
//     flex: 1,
//     padding: 10,
//     margin: 10,
//     borderWidth: 1,
//     borderColor: '#333',
//     borderRadius: 5,
//   },
//   button: {
//     padding: 10,
//     margin: 10,
//     backgroundColor: '#333',
//     borderRadius: 5,
//   },
//   buttonText: {
//     color: '#fff',
//     textAlign: 'center',
//   },
//   profileButton: {
//     height: 50,
//     backgroundColor: '#4285F4',
//     alignItems: 'center',
//     justifyContent: 'center',
//     borderRadius: 5,
//     marginTop: 20,
//   },
//   profileButtonText: {
//     color: '#fff',
//     fontSize: 16,
//   },
// });
// working code
// export default HomeScreen;


// import React, { useState, useEffect } from 'react';
// import { View, TextInput, TouchableOpacity, FlatList, StyleSheet, Text } from 'react-native';
// import { signOut } from 'firebase/auth';
// import { doc, getDoc, updateDoc, arrayUnion, arrayRemove, addDoc, collection, deleteDoc } from 'firebase/firestore';
// import { auth, firestore } from '../utils/firebase';
// import { useNavigation } from '@react-navigation/native'; 
// import Header from '../components/headers';

// const HomeScreen = () => {
//   const navigation = useNavigation(); 
//   const [userData, setUserData] = useState(null);
//   const [newListName, setNewListName] = useState('');
//   const [isLoading, setIsLoading] = useState(true);
//   const [lists, setLists] = useState([]); 

//   useEffect(() => {  
//     const fetchUserData = async () => {
//       try {
//         const userDoc = doc(firestore, 'users', auth.currentUser.uid);
//         const userSnapshot = await getDoc(userDoc);
//         if (userSnapshot.exists()) {
//           const userData = userSnapshot.data();
//           setUserData(userData);
//           const userLists = await Promise.all(userData.lists.map(async (listId) => {
//             const listDoc = await getDoc(doc(firestore, 'lists', listId));
//             return { id: listId, ...listDoc.data() };
//           }));
//           setLists(userLists);
//         }
//       } catch (error) {
//         console.error('Error fetching user data:', error);
//       } finally {
//         setIsLoading(false);
//       }
//     };
//     fetchUserData();
//   }, []);

//   const handleCreateList = async () => {
//     try {
//       const currentUser = auth.currentUser;
//       const userEmail = currentUser.email;

//       const newListRef = await addDoc(collection(firestore, 'lists'), {
//         name: newListName,
//         items: [],
//         userId: currentUser.uid,
//         userEmail: userEmail,
//       });

//       const userDoc = doc(firestore, 'users', currentUser.uid);
//       await updateDoc(userDoc, {
//         lists: arrayUnion(newListRef.id),
//       });

//       setLists((prevLists) => [...prevLists, { id: newListRef.id, name: newListName, items: [] }]);
//       setNewListName('');
//     } catch (error) {
//       console.error('Error creating list:', error);
//     }
//   };

//   const handleLogout = async () => {
//     try {
//       await signOut(auth);
//       console.log('Successfully logged out');
//       navigation.navigate('Login');
//     } catch (error) {
//       console.error('Logout error:', error);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Header title="Check-It-Out" onLogout={handleLogout} />
//       {isLoading ? (
//         <Text style={styles.loadingText}>Loading...</Text>
//       ) : (
//         <>
//           <FlatList
//             style={styles.flatList} 
//             data={lists}
//             keyExtractor={(item) => item.id}
//             renderItem={({ item }) => (
//               <View style={styles.button}>
//                 <TouchableOpacity onPress={() => navigation.navigate('ListDetails', { listId: item.id })}>
//                   <Text style={styles.buttonText}>{item.name}</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity onPress={() => navigation.navigate('ListDetails', { listId: item.id })}>
//                   <Text style={styles.buttonText}>Edit</Text>
//                 </TouchableOpacity>
//               </View>
//             )}
//           />
//           <View style={styles.inputContainer}>
//             <TextInput
//               style={styles.input}
//               placeholder="Create a new list"
//               value={newListName}
//               onChangeText={setNewListName}
//             />
//             <TouchableOpacity style={styles.button} onPress={handleCreateList}>
//               <Text style={styles.buttonText}>Create</Text>
//             </TouchableOpacity>
//           </View>
//         </>
//       )}
//       <TouchableOpacity 
//         style={styles.profileButton}
//         onPress={() => navigation.navigate('Profile')}
//       >
//         <Text style={styles.profileButtonText}>Go to Profile</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     padding: 20,
//     justifyContent: 'flex-start',
//     alignContent: 'flex-start',
//   },
//   emptyText: {
//     textAlign: 'center',
//     padding: 20,
//     backgroundColor: 'blue',
//   },
//   inputContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: 20,
//     borderWidth: 1,
//   },
//   flatList: {
//     flex: 1,
//     padding: 20,
//     borderWidth: 1,
//     borderColor: '#333',
//     borderRadius: 5,
//   },
//   input: {
//     flex: 1,
//     padding: 10,
//     margin: 10,
//     borderWidth: 1,
//     borderColor: '#333',
//     borderRadius: 5,
//   },
//   button: {
//     padding: 10,
//     margin: 10,
//     backgroundColor: '#333',
//     borderRadius: 5,
//   },
//   buttonText: {
//     color: '#fff',
//     textAlign: 'center',
//   },
//   profileButton: {
//     height: 50,
//     backgroundColor: '#4285F4',
//     alignItems: 'center',
//     justifyContent: 'center',
//     borderRadius: 5,
//     marginTop: 20,
//   },
//   profileButtonText: {
//     color: '#fff',
//     fontSize: 16,
//   },
// });

// working code
// export default HomeScreen;

// import React, { useState, useEffect } from 'react';
// import { View, TextInput, TouchableOpacity, FlatList, StyleSheet, Text } from 'react-native';
// import { signOut } from 'firebase/auth';
// import { doc, getDoc, updateDoc, arrayUnion, addDoc, collection } from 'firebase/firestore';
// import { auth, firestore } from '../utils/firebase';
// import { useNavigation } from '@react-navigation/native'; 
// import Header from '../components/headers';

// const HomeScreen = () => {
//   const navigation = useNavigation(); 
//   const [userData, setUserData] = useState(null);
//   const [newListName, setNewListName] = useState('');
//   const [isLoading, setIsLoading] = useState(true);
//   const [lists, setLists] = useState([]); 

//   useEffect(() => {  
//     const fetchUserData = async () => {
//       try {
//         const userDoc = doc(firestore, 'users', auth.currentUser.uid);
//         const userSnapshot = await getDoc(userDoc);
//         if (userSnapshot.exists()) {
//           const userData = userSnapshot.data();
//           setUserData(userData);
//           const userLists = await Promise.all(userData.lists.map(async (listId) => {
//             const listDoc = await getDoc(doc(firestore, 'lists', listId));
//             return { id: listId, ...listDoc.data() };
//           }));
//           setLists(userLists);
//         }
//       } catch (error) {
//         console.error('Error fetching user data:', error);
//       } finally {
//         setIsLoading(false);
//       }
//     };
//     fetchUserData();
//   }, []);

//   const handleCreateList = async () => {
//     try {
//       const currentUser = auth.currentUser;
//       const userEmail = currentUser.email;

//       const newListRef = await addDoc(collection(firestore, 'lists'), {
//         name: newListName,
//         items: [],
//         userId: currentUser.uid,
//         userEmail: userEmail,
//       });

//       const userDoc = doc(firestore, 'users', currentUser.uid);
//       await updateDoc(userDoc, {
//         lists: arrayUnion(newListRef.id),
//       });

//       setLists((prevLists) => [...prevLists, { id: newListRef.id, name: newListName, items: [] }]);
//       setNewListName('');
//     } catch (error) {
//       console.error('Error creating list:', error);
//     }
//   };

//   const handleLogout = async () => {
//     try {
//       await signOut(auth);
//       console.log('Successfully logged out');
//       navigation.navigate('Login');
//     } catch (error) {
//       console.error('Logout error:', error);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Header title="Check-It-Out" onLogout={handleLogout} />
//       {isLoading ? (
//         <Text style={styles.loadingText}>Loading...</Text>
//       ) : (
//         <>
//           <FlatList
//             style={styles.flatList} 
//             data={lists}
//             keyExtractor={(item) => item.id}
//             renderItem={({ item }) => (
//               <View style={styles.button}>
//                 <TouchableOpacity onPress={() => navigation.navigate('ListDetails', { listId: item.id, lists })}>
//                   <Text style={styles.buttonText}>{item.name}</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity onPress={() => navigation.navigate('ListDetails', { listId: item.id, lists })}>
//                   <Text style={styles.buttonText}>Edit</Text>
//                 </TouchableOpacity>
//               </View>
//             )}
//           />
//           <View style={styles.inputContainer}>
//             <TextInput
//               style={styles.input}
//               placeholder="Create a new list"
//               value={newListName}
//               onChangeText={setNewListName}
//             />
//             <TouchableOpacity style={styles.button} onPress={handleCreateList}>
//               <Text style={styles.buttonText}>Create</Text>
//             </TouchableOpacity>
//           </View>
//         </>
//       )}
//       <TouchableOpacity 
//         style={styles.profileButton}
//         onPress={() => navigation.navigate('Profile')}
//       >
//         <Text style={styles.profileButtonText}>Go to Profile</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     padding: 20,
//     justifyContent: 'flex-start',
//     alignContent: 'flex-start',
//   },
//   emptyText: {
//     textAlign: 'center',
//     padding: 20,
//     backgroundColor: 'blue',
//   },
//   inputContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: 20,
//     borderWidth: 1,
//   },
//   flatList: {
//     flex: 1,
//     padding: 20,
//     borderWidth: 1,
//     borderColor: '#333',
//     borderRadius: 5,
//   },
//   input: {
//     flex: 1,
//     padding: 10,
//     margin: 10,
//     borderWidth: 1,
//     borderColor: '#333',
//     borderRadius: 5,
//   },
//   button: {
//     padding: 10,
//     margin: 10,
//     backgroundColor: '#333',
//     borderRadius: 5,
//   },
//   buttonText: {
//     color: '#fff',
//     textAlign: 'center',
//   },
//   profileButton: {
//     height: 50,
//     backgroundColor: '#4285F4',
//     alignItems: 'center',
//     justifyContent: 'center',
//     borderRadius: 5,
//     marginTop: 20,
//   },
//   profileButtonText: {
//     color: '#fff',
//     fontSize: 16,
//   },
// });

// export default HomeScreen; WORKING CODE

// import React, { useState, useEffect, useCallback } from 'react';
// import { View, Text, FlatList, TouchableOpacity, StyleSheet, TextInput, ScrollView, Image, Alert } from 'react-native';
// import { signOut } from 'firebase/auth';
// import { doc, getDoc, updateDoc, arrayUnion, addDoc, collection, onSnapshot } from 'firebase/firestore';
// import { auth, firestore } from '../utils/firebase';
// import { useNavigation } from '@react-navigation/native';
// import Header from '../components/headers';
// import { useTheme } from '../contexts/themeContext';
// import LinkedInButton from '../components/linkButton';

// const HomeScreen = () => {
//   const navigation = useNavigation();
//   const { theme } = useTheme();
//   const [userData, setUserData] = useState(null);
//   const [newListName, setNewListName] = useState('');
//   const [isLoading, setIsLoading] = useState(true);
//   const [lists, setLists] = useState([]);

//   useEffect(() => {
//     const userDocRef = doc(firestore, 'users', auth.currentUser.uid);

//     const unsubscribe = onSnapshot(userDocRef, async (docSnapshot) => {
//       if (docSnapshot.exists()) {
//         const userData = docSnapshot.data();
//         setUserData(userData);
//         const userLists = await Promise.all(userData.lists.map(async (listId) => {
//           const listDoc = await getDoc(doc(firestore, 'lists', listId));
//           return listDoc.exists() ? { id: listId, ...listDoc.data() } : null;
//         }));
//         setLists(userLists.filter(list => list !== null));
//       }
//       setIsLoading(false);
//     });

//     return () => unsubscribe(); // Cleanup listener on unmount
//   }, []);

//   const handleCreateList = useCallback(async () => {
//     if (!newListName.trim()) return;
//     try {
//       const currentUser = auth.currentUser;
//       const userEmail = currentUser.email;

//       const newListRef = await addDoc(collection(firestore, 'lists'), {
//         name: newListName,
//         items: [],
//         userId: currentUser.uid,
//         userEmail: userEmail,
//       });

//       const userDoc = doc(firestore, 'users', currentUser.uid);
//       await updateDoc(userDoc, {
//         lists: arrayUnion(newListRef.id),
//       });

//       setNewListName('');
//     } catch (error) {
//       console.error('Error creating list:', error);
//       Alert.alert("Error", "Could not create a new list.");
//     }
//   }, [newListName]);

//   const handleLogout = useCallback(async () => {
//     try {
//       await signOut(auth);
//       navigation.navigate('Login');
//     } catch (error) {
//       console.error('Logout error:', error);
//       Alert.alert("Error", "Could not log out.");
//     }
//   }, [navigation]);

//   const placeholderTextColor = theme.text === '#000' ? '#555' : '#aaa';

//   return (
//     <View style={[styles.container, { backgroundColor: theme.background }]}>
//       <Header title="Check-It-Out" onLogout={handleLogout} />
//       {isLoading ? (
//         <Text style={[styles.loadingText, { color: theme.text }]}>Loading...</Text>
//       ) : (
//         <ScrollView style={styles.scrollView}>
//           <FlatList
//             style={styles.flatList}
//             data={lists}
//             keyExtractor={(item) => item.id}
//             renderItem={({ item }) => (
//               <View style={[styles.listItem, { backgroundColor: theme.background }]}>
//                 <TouchableOpacity onPress={() => navigation.navigate('ListDetails', { listId: item.id, lists })}>
//                   <Text style={[styles.listText, { color: theme.text }]}>{item.name}</Text>
//                 </TouchableOpacity>
//               </View>
//             )}
//           />
//           <View style={styles.inputContainer}>
//             <TextInput
//               style={[styles.input, { color: theme.text, borderColor: theme.text }]}
//               placeholder="Create a new list"
//               placeholderTextColor={placeholderTextColor} // Use the calculated placeholder text color
//               value={newListName}
//               onChangeText={setNewListName}
//             />
//             <TouchableOpacity style={[styles.button, { backgroundColor: theme.button }]} onPress={handleCreateList}>
//               <Text style={[styles.buttonText, { color: theme.buttonText }]}>Create</Text>
//             </TouchableOpacity>
//           </View>
//           <View style={styles.sectionContainer}>
//             <TouchableOpacity style={[styles.sectionButton, { backgroundColor: theme.button }]} onPress={() => navigation.navigate('Profile')}>
//               <Text style={[styles.sectionButtonText, { color: theme.buttonText }]}>Profile</Text>
//             </TouchableOpacity>
//             <TouchableOpacity style={[styles.sectionButton, { backgroundColor: theme.button }]} onPress={() => navigation.navigate('Statistics')}>
//               <Text style={[styles.sectionButtonText, { color: theme.buttonText }]}>Statistics</Text>
//             </TouchableOpacity>
//             <TouchableOpacity style={[styles.sectionButton, { backgroundColor: theme.button }]} onPress={() => navigation.navigate('Recipes')}>
//               <Text style={[styles.sectionButtonText, { color: theme.buttonText }]}>Recipes</Text>
//             </TouchableOpacity>
//             <TouchableOpacity style={[styles.sectionButton, { backgroundColor: theme.button }]} onPress={() => navigation.navigate('PeacefulZone')}>
//               <Text style={[styles.sectionButtonText, { color: theme.buttonText }]}>Peaceful Zone</Text>
//             </TouchableOpacity>
//           </View>
//         </ScrollView>
//       )}
//       <LinkedInButton />
//       <TouchableOpacity style={styles.accessibilityIcon} onPress={() => alert('Accessibility options')}>
//         <Image source={require('../icons/m33t_background.png')} style={styles.accessibilityImage} />
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//   },
//   loadingText: {
//     textAlign: 'center',
//     padding: 20,
//     fontSize: 18,
//   },
//   scrollView: {
//     flex: 1,
//   },
//   flatList: {
//     flex: 1,
//     marginBottom: 20,
//   },
//   listItem: {
//     padding: 15,
//     marginVertical: 8,
//     borderRadius: 5,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     backgroundColor: '#f4f5f7', // Default color
//   },
//   listText: {
//     fontSize: 16,
//   },
//   inputContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   input: {
//     flex: 1,
//     padding: 10,
//     borderWidth: 1,
//     borderRadius: 5,
//     marginRight: 10,
//     borderColor: '#ccc',
//   },
//   button: {
//     padding: 10,
//     borderRadius: 5,
//     backgroundColor: '#89D3DF',
//   },
//   buttonText: {
//     textAlign: 'center',
//     color: '#fff',
//   },
//   sectionContainer: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     justifyContent: 'space-between',
//   },
//   sectionButton: {
//     width: '48%',
//     padding: 15,
//     borderRadius: 5,
//     marginVertical: 8,
//     backgroundColor: '#4285F4',
//   },
//   sectionButtonText: {
//     textAlign: 'center',
//     fontSize: 16,
//     color: '#fff',
//   },
//   accessibilityIcon: {
//     position: 'absolute',
//     bottom: 20,
//     right: 20,
//   },
//   accessibilityImage: {
//     width: 50,
//     height: 50,
//   },
// });

// export default HomeScreen; working code 23/6

import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, TextInput, ScrollView, Image, Alert } from 'react-native';
import { signOut } from 'firebase/auth';
import { doc, getDoc, updateDoc, arrayUnion, addDoc, collection, onSnapshot } from 'firebase/firestore';
import { auth, firestore } from '../utils/firebase';
import { useNavigation } from '@react-navigation/native';
import Header from '../components/headers';
import { useTheme } from '../contexts/themeContext';
import LinkedInButton from '../components/linkButton';

const HomeScreen = () => {
  const navigation = useNavigation();
  const { theme } = useTheme();
  const [userData, setUserData] = useState(null);
  const [newListName, setNewListName] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [lists, setLists] = useState([]);

  const fetchUserLists = async () => {
    const userDocRef = doc(firestore, 'users', auth.currentUser.uid);

    const docSnapshot = await getDoc(userDocRef);
    if (docSnapshot.exists()) {
      const userData = docSnapshot.data();
      setUserData(userData);
      const userLists = await Promise.all(userData.lists.map(async (listId) => {
        const listDoc = await getDoc(doc(firestore, 'lists', listId));
        return listDoc.exists() ? { id: listId, ...listDoc.data() } : null;
      }));
      setLists(userLists.filter(list => list !== null));
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchUserLists();

    const userDocRef = doc(firestore, 'users', auth.currentUser.uid);

    const unsubscribe = onSnapshot(userDocRef, async (docSnapshot) => {
      if (docSnapshot.exists()) {
        fetchUserLists();
      }
    });

    return () => unsubscribe(); // Cleanup listener on unmount
  }, []);

  const handleCreateList = useCallback(async () => {
    if (!newListName.trim()) return;
    try {
      const currentUser = auth.currentUser;
      const userEmail = currentUser.email;

      const newListRef = await addDoc(collection(firestore, 'lists'), {
        name: newListName,
        items: [],
        userId: currentUser.uid,
        userEmail: userEmail,
      });

      const userDoc = doc(firestore, 'users', currentUser.uid);
      await updateDoc(userDoc, {
        lists: arrayUnion(newListRef.id),
      });

      setNewListName('');
      fetchUserLists();
    } catch (error) {
      console.error('Error creating list:', error);
      Alert.alert("Error", "Could not create a new list.");
    }
  }, [newListName]);

  const handleLogout = useCallback(async () => {
    try {
      await signOut(auth);
      navigation.navigate('Login');
    } catch (error) {
      console.error('Logout error:', error);
      Alert.alert("Error", "Could not log out.");
    }
  }, [navigation]);

  const handleListDeleted = useCallback(() => {
    fetchUserLists();
  }, []);

  const placeholderTextColor = theme.text === '#000' ? '#555' : '#aaa';

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Header title="Check-It-Out" onLogout={handleLogout} />
      {isLoading ? (
        <Text style={[styles.loadingText, { color: theme.text }]}>Loading...</Text>
      ) : (
        <ScrollView style={styles.scrollView}>
          <FlatList
            style={styles.flatList}
            data={lists}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={[styles.listItem, { backgroundColor: theme.background }]}>
                <TouchableOpacity onPress={() => navigation.navigate('ListDetails', { listId: item.id, lists, onListDeleted: handleListDeleted })}>
                  <Text style={[styles.listText, { color: theme.text }]}>{item.name}</Text>
                </TouchableOpacity>
              </View>
            )}
          />
          <View style={styles.inputContainer}>
            <TextInput
              style={[styles.input, { color: theme.text, borderColor: theme.text }]}
              placeholder="Create a new list"
              placeholderTextColor={placeholderTextColor} // Use the calculated placeholder text color
              value={newListName}
              onChangeText={setNewListName}
            />
            <TouchableOpacity style={[styles.button, { backgroundColor: theme.button }]} onPress={handleCreateList}>
              <Text style={[styles.buttonText, { color: theme.buttonText }]}>Create</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.sectionContainer}>
            <TouchableOpacity style={[styles.sectionButton, { backgroundColor: theme.button }]} onPress={() => navigation.navigate('Profile')}>
              <Text style={[styles.sectionButtonText, { color: theme.buttonText }]}>Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.sectionButton, { backgroundColor: theme.button }]} onPress={() => navigation.navigate('Statistics')}>
              <Text style={[styles.sectionButtonText, { color: theme.buttonText }]}>Statistics</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.sectionButton, { backgroundColor: theme.button }]} onPress={() => navigation.navigate('Recipes')}>
              <Text style={[styles.sectionButtonText, { color: theme.buttonText }]}>Recipes</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.sectionButton, { backgroundColor: theme.button }]} onPress={() => navigation.navigate('PeacefulZone')}>
              <Text style={[styles.sectionButtonText, { color: theme.buttonText }]}>Peaceful Zone</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      )}
      <LinkedInButton />
      <TouchableOpacity style={styles.accessibilityIcon} onPress={() => alert('Accessibility options')}>
        <Image source={require('../icons/m33t_background.png')} style={styles.accessibilityImage} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  loadingText: {
    textAlign: 'center',
    padding: 20,
    fontSize: 18,
  },
  scrollView: {
    flex: 1,
  },
  flatList: {
    flex: 1,
    marginBottom: 20,
  },
  listItem: {
    padding: 15,
    marginVertical: 8,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f4f5f7', // Default color
  },
  listText: {
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    marginRight: 10,
    borderColor: '#ccc',
  },
  button: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#89D3DF',
  },
  buttonText: {
    textAlign: 'center',
    color: '#fff',
  },
  sectionContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  sectionButton: {
    width: '48%',
    padding: 15,
    borderRadius: 5,
    marginVertical: 8,
    backgroundColor: '#4285F4',
  },
  sectionButtonText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#fff',
  },
  accessibilityIcon: {
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
  accessibilityImage: {
    width: 50,
    height: 50,
  },
});

export default HomeScreen;



