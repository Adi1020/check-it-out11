// import React, { useState, useEffect } from 'react';
// import { View, TextInput, TouchableOpacity, FlatList, StyleSheet, Text } from 'react-native';
// import { doc, updateDoc, arrayUnion, arrayRemove, onSnapshot } from 'firebase/firestore';
// import { firestore } from '../utils/firebase';

// const ListDetails = ({ route }) => {
//   const { listId } = route.params;
//   const [listName, setListName] = useState('');
//   const [items, setItems] = useState([]);
//   const [newItem, setNewItem] = useState('');
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const listDocRef = doc(firestore, 'lists', listId);
    
//     const unsubscribe = onSnapshot(listDocRef, (docSnapshot) => {
//       if (docSnapshot.exists()) {
//         const listData = docSnapshot.data();
//         setListName(listData.name);
//         setItems(listData.items || []);
//         setIsLoading(false);
//       }
//     }, (error) => {
//       console.error('Error fetching list details:', error);
//       setIsLoading(false);
//     });

//     return () => unsubscribe(); // Cleanup listener on unmount
//   }, [listId]);

//   const handleAddItem = async () => {
//     if (!newItem.trim()) return;
//     try {
//       const listDoc = doc(firestore, 'lists', listId);
//       await updateDoc(listDoc, {
//         items: arrayUnion(newItem.trim()),
//       });
//       setNewItem('');
//     } catch (error) {
//       console.error('Error adding item:', error);
//     }
//   };

//   const handleDeleteItem = async (item) => {
//     try {
//       const listDoc = doc(firestore, 'lists', listId);
//       await updateDoc(listDoc, {
//         items: arrayRemove(item),
//       });
//     } catch (error) {
//       console.error('Error deleting item:', error);
//     }
//   };

//   const handleUpdateListName = async () => {
//     try {
//       const listDoc = doc(firestore, 'lists', listId);
//       await updateDoc(listDoc, {
//         name: listName,
//       });
//     } catch (error) {
//       console.error('Error updating list name:', error);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       {isLoading ? (
//         <Text style={styles.loadingText}>Loading...</Text>
//       ) : (
//         <>
//           <View style={styles.headerContainer}>
//             <TextInput
//               style={styles.input}
//               value={listName}
//               onChangeText={setListName}
//               onEndEditing={handleUpdateListName}
//               placeholder="List Name"
//             />
//           </View>
//           <FlatList
//             data={items}
//             keyExtractor={(item, index) => `${item}-${index}`}
//             renderItem={({ item }) => (
//               <View style={styles.itemContainer}>
//                 <Text style={styles.itemText}>{item}</Text>
//                 <TouchableOpacity onPress={() => handleDeleteItem(item)}>
//                   <Text style={styles.deleteText}>Delete</Text>
//                 </TouchableOpacity>
//               </View>
//             )}
//             ListEmptyComponent={<Text style={styles.emptyText}>Your list is empty.</Text>}
//           />
//           <View style={styles.inputContainer}>
//             <TextInput
//               style={styles.input}
//               placeholder="Add a new item"
//               value={newItem}
//               onChangeText={setNewItem}
//             />
//             <TouchableOpacity style={styles.button} onPress={handleAddItem}>
//               <Text style={styles.buttonText}>Add</Text>
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
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: 20,
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
//   headerContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: 20,
//   },
//   itemContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     padding: 10,
//     borderBottomWidth: 1,
//     borderBottomColor: '#ccc',
//   },
//   itemText: {
//     fontSize: 16,
//   },
//   deleteText: {
//     color: 'red',
//   },
// });

// working code
// export default ListDetails;
import React, { useState, useEffect, useCallback } from 'react';
import { View, TextInput, TouchableOpacity, FlatList, StyleSheet, Text, Picker, Alert } from 'react-native';
import { doc, updateDoc, deleteDoc, arrayUnion, arrayRemove, onSnapshot } from 'firebase/firestore';
import { firestore } from '../utils/firebase';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../contexts/themeContext';

const ListDetails = ({ route }) => {
  const navigation = useNavigation();
  const { listId, lists, onListDeleted } = route.params;
  const { theme } = useTheme();
  const [selectedListId, setSelectedListId] = useState(listId);
  const [listData, setListData] = useState({ name: '', items: [] });
  const [newItem, setNewItem] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const listDocRef = doc(firestore, 'lists', selectedListId);

    const unsubscribe = onSnapshot(listDocRef, (docSnapshot) => {
      if (docSnapshot.exists()) {
        setListData(docSnapshot.data());
        setIsLoading(false);
      } else {
        Alert.alert("List not found", "The list you are trying to access no longer exists.");
        navigation.navigate('Home');
      }
    }, (error) => {
      console.error('Error fetching list details:', error);
      setIsLoading(false);
    });

    return () => unsubscribe(); // Cleanup listener on unmount
  }, [selectedListId]);

  const handleAddItem = useCallback(async () => {
    if (!newItem.trim()) return;
    try {
      const listDoc = doc(firestore, 'lists', selectedListId);
      await updateDoc(listDoc, {
        items: arrayUnion(newItem.trim()),
      });
      setNewItem('');
    } catch (error) {
      console.error('Error adding item:', error);
      Alert.alert("Error", "Could not add item to the list.");
    }
  }, [newItem, selectedListId]);

  const handleDeleteItem = useCallback(async (item) => {
    try {
      const listDoc = doc(firestore, 'lists', selectedListId);
      await updateDoc(listDoc, {
        items: arrayRemove(item),
      });
    } catch (error) {
      console.error('Error deleting item:', error);
      Alert.alert("Error", "Could not delete item from the list.");
    }
  }, [selectedListId]);

  const handleDeleteList = useCallback(async () => {
    try {
      const listDoc = doc(firestore, 'lists', selectedListId);
      await deleteDoc(listDoc);
      if (onListDeleted) {
        onListDeleted();
      }
      navigation.navigate('Home'); // Navigate back to Home screen
    } catch (error) {
      console.error('Error deleting list:', error);
      Alert.alert("Error", "Could not delete the list.");
    }
  }, [selectedListId, navigation, onListDeleted]);

  const handleListChange = useCallback((listId) => {
    setSelectedListId(listId);
    setIsLoading(true);
  }, []);

  const handleGoBack = useCallback(() => {
    navigation.navigate('Home');
  }, [navigation]);

  const placeholderTextColor = theme.text === '#000' ? '#555' : '#aaa';

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {isLoading ? (
        <Text style={[styles.loadingText, { color: theme.text }]}>Loading...</Text>
      ) : (
        <>
          <View style={styles.headerContainer}>
            <Picker
              selectedValue={selectedListId}
              onValueChange={(itemValue) => handleListChange(itemValue)}
              style={[styles.picker, { color: theme.text, backgroundColor: theme.background }]}
            >
              {lists.map((list) => (
                <Picker.Item key={list.id} label={list.name} value={list.id} />
              ))}
            </Picker>
            <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
              <Text style={styles.backButtonText}>Go back</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={listData.items}
            keyExtractor={(item, index) => `${item}-${index}`}
            renderItem={({ item }) => (
              <View style={[styles.itemContainer, { backgroundColor: theme.background }]}>
                <Text style={[styles.itemText, { color: theme.text }]}>{item}</Text>
                <TouchableOpacity onPress={() => handleDeleteItem(item)}>
                  <Text style={styles.deleteText}>Delete</Text>
                </TouchableOpacity>
              </View>
            )}
            ListEmptyComponent={<Text style={[styles.emptyText, { color: theme.text }]}>Your list is empty.</Text>}
          />
          <View style={styles.inputContainer}>
            <TextInput
              style={[styles.Iteminput, { color: theme.text, borderColor: theme.text, backgroundColor: theme.inputBackground }]}
              placeholder="Add a new item"
              placeholderTextColor={placeholderTextColor} // Adjusted placeholder text color
              value={newItem}
              onChangeText={setNewItem}
              onSubmitEditing={handleAddItem}
            />
            <TouchableOpacity style={[styles.button, { backgroundColor: theme.button }]} onPress={handleAddItem}>
              <Text style={[styles.buttonText, { color: theme.buttonText }]}>Add</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={[styles.deleteListButton, { backgroundColor: theme.button }]} onPress={handleDeleteList}>
            <Text style={[styles.buttonText, { color: theme.buttonText }]}>Delete List</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  emptyText: {
    textAlign: 'center',
    padding: 20,
  },
  loadingText: {
    textAlign: 'center',
    padding: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    // backgroundColor: 'yellow',
  },
  input: {
    flex: 1,
    padding: 10,
    margin: 10,
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: 'pink',
  },
  Iteminput: {
    flex: 1,
    padding: 10,
    margin: 10,
    borderWidth: 1,
    borderRadius: 5,
  },
  button: {
    padding: 10,
    margin: 10,
    borderRadius: 5,
  },
  buttonText: {
    textAlign: 'center',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  itemText: {
    fontSize: 16,
  },
  deleteText: {
    color: 'red',
  },
  picker: {
    flex: 1,
    height: 50,
    width: '100%',
    marginBottom: 20,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  backButton: {
    backgroundColor: '#dc3545',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 14,
  },
  deleteListButton: {
    padding: 10,
    margin: 10,
    borderRadius: 5,
  },
});

export default ListDetails;


