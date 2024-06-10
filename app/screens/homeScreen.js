import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, FlatList, StyleSheet, Text } from 'react-native';
import { signOut } from 'firebase/auth';
import { doc, getDoc, updateDoc, arrayUnion, arrayRemove, addDoc, collection, deleteDoc } from 'firebase/firestore';
import { auth, firestore } from '../utils/firebase';
import { useNavigation } from '@react-navigation/native'; 
import Header from '../components/headers';

const HomeScreen = () => {
  const navigation = useNavigation(); 
  const [userData, setUserData] = useState(null);
  const [newListName, setNewListName] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [lists, setLists] = useState([]); 

  useEffect(() => {
    const fetchUserData = async () => {
      console.log('fetchUserData');
      try {
        const userDoc = doc(firestore, 'users', auth);
        const userSnapshot = await getDoc(userDoc);
        console.log('userSnapshot')
        if (userSnapshot.exists()) {
          const userData = userSnapshot.data();
          console.log('userData')
          setUserData(userData);
          setLists(userData.lists || []); 
          console.log(lists)
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUserData();
  }, []);

  const handleCreateList = async () => {
    try {
      const currentUser = auth.currentUser;
      const userEmail = currentUser.email;
      lists.push(newListName);

      setLists(lists);
      console.log(lists)
      
      // Create a new document for the new list
      const newListRef = await addDoc(collection(firestore, 'lists'), {
        name: newListName,
        items: [],
        userId: auth.currentUser.uid,
        userEmail: userEmail, 
      });

      // Update the 'users' document with the new list ID
      const userDoc = doc(firestore, 'users', auth.currentUser.uid);
      await updateDoc(userDoc, {
        lists: arrayUnion(newListRef.id),
      });

      setLists((prevLists) => [...prevLists, newListRef.id]); // Add the new list ID to the lists state
      setNewListName('');
    } catch (error) {
      console.error('Error creating list:', error);
    }
  };

  const handleDeleteList = async (listId) => {
    try {
      // Remove the list ID from the 'users' document
      const userDoc = doc(firestore, 'users', auth.currentUser.uid);
      await updateDoc(userDoc, {
        lists: arrayRemove(listId),
      });

      // Delete the list document from the 'lists' collection
      const listDoc = doc(firestore, 'lists', listId);
      await deleteDoc(listDoc);

      setLists((prevLists) => prevLists.filter((list) => list !== listId)); // Remove the deleted list ID from the lists state
    } catch (error) {
      console.error('Error deleting list:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log('Successfully logged out');
      navigation.navigate('Login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  useEffect(() => {
    console.log('HomeScreen');
    console.log(lists)
  }, [lists]);
  return (
    <View style={styles.container}>
      <Header title="Check-It-Out" onLogout={handleLogout} />
      {isLoading ? (
        <Text style={styles.loadingText}>Loading...</Text>
      ) : (
        <>
          <FlatList
          style={styles.flatList}
            data={lists}
            keyExtractor={(item) => item}
            renderItem={({ item }) => <View style={styles.button} >
              <Text style={styles.buttonText}>{item}</Text>
              </View>}
                   />
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Create a new list"
              value={newListName}
              onChangeText={setNewListName}
            />
            <TouchableOpacity style={styles.button} onPress={handleCreateList}>
              <Text style={styles.buttonText}>Create</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
      <TouchableOpacity 
        style={styles.profileButton}
        onPress={() => navigation.navigate('Profile')}
      >
        <Text style={styles.profileButtonText}>Go to Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    justifyContent: 'flex-start',
    alignContent: 'flex-start',
  },
  emptyText: {
    textAlign: 'center',
    padding: 20,
    backgroundColor: 'blue',
  },
  loadingText: {
    textAlign: 'center',
    padding: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderWidth: 1,
  },
  flatList: {
    flex: 1,
    padding: 20,
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 5,
    borderWidth: 1,
  },

  input: {
    flex: 1,
    padding: 10,
    margin: 10,
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 5,
  },
  button: {
    padding: 10,
    margin: 10,
    backgroundColor: '#333',
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
  },
  profileButton: {
    height: 50,
    backgroundColor: '#4285F4',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    marginTop: 20,
  },
  profileButtonText: {
    color: '#fff',
    fontSize: 16,
    
  },
});

export default HomeScreen;


// import React, { useState, useEffect } from 'react';
// import { View, TextInput, TouchableOpacity, FlatList, StyleSheet, Text, Picker } from 'react-native';
// import { signOut } from 'firebase/auth';
// import { doc, getDoc, updateDoc, arrayUnion, arrayRemove, addDoc, collection, deleteDoc } from 'firebase/firestore';
// import { auth, firestore } from '../utils/firebase';
// import Header from '../components/headers';
// import ListItem from '../components/listItem';

// const HomeScreen = ({ navigation }) => {
//   const [userData, setUserData] = useState(null);
//   const [newListName, setNewListName] = useState('');
//   const [newListType, setNewListType] = useState('TDL'); // Default list type
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
//           setLists(userData.lists || []);
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
//         type: newListType,
//         items: [],
//         userId: auth.currentUser.uid,
//         userEmail: userEmail,
//       });

//       const userDoc = doc(firestore, 'users', auth.currentUser.uid);
//       await updateDoc(userDoc, {
//         lists: arrayUnion(newListRef.id),
//       });

//       setLists((prevLists) => [...prevLists, newListRef.id]);
//       setNewListName('');
//       setNewListType('TDL'); // Reset list type to default
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

//       setLists((prevLists) => prevLists.filter((list) => list !== listId));
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
//       <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
//         <Text style={styles.profileButton}>Go to Profile</Text>
//       </TouchableOpacity>
//       {isLoading ? (
//         <Text style={styles.loadingText}>Loading...</Text>
//       ) : (
//         <>
//           <FlatList
//             data={lists}
//             keyExtractor={(item) => item}
//             renderItem={({ item }) => (
//               <ListItem
//                 title={item}
//                 onDelete={() => handleDeleteList(item)}
//                 onPress={() => navigation.navigate('ListDetails', { listId: item })}
//               />
//             )}
//             ListEmptyComponent={<Text style={styles.emptyText}>You don't have any lists yet.</Text>}
//           />
//           <View style={styles.inputContainer}>
//             <TextInput
//               style={styles.input}
//               placeholder="Create a new list"
//               value={newListName}
//               onChangeText={setNewListName}
//             />
//             <Picker
//               selectedValue={newListType}
//               style={styles.picker}
//               onValueChange={(itemValue) => setNewListType(itemValue)}
//             >
//               <Picker.Item label="To-Do List" value="TDL" />
//               <Picker.Item label="Shopping List" value="Shopping" />
//               <Picker.Item label="Self Notes" value="SelfNotes" />
//             </Picker>
//             <TouchableOpacity style={styles.button} onPress={handleCreateList}>
//               <Text style={styles.buttonText}>Create</Text>
//             </TouchableOpacity>
//           </View>
//         </>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   emptyText: {
//     textAlign: 'center',
//     padding: 20,
//   },
//   loadingText: {
//     textAlign: 'center',
//     padding: 20,
//   },
//   inputContainer: {
//     flexDirection: 'column',
//     alignItems: 'center',
//     padding: 20,
//   },
//   input: {
//     width: '100%',
//     padding: 10,
//     margin: 10,
//     borderWidth: 1,
//     borderColor: '#333',
//     borderRadius: 5,
//   },
//   picker: {
//     width: '100%',
//     height: 50,
//     margin: 10,
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
//     color: '#007BFF',
//     textAlign: 'center',
//     margin: 10,
//     fontSize: 16,
//   },
// });

// export default HomeScreen;
