import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, FlatList, StyleSheet, Text, Picker } from 'react-native';
import { doc, getDoc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { firestore } from '../utils/firebase';

const predefinedItems = {
  TDL: ['Task 1', 'Task 2', 'Task 3'],
  Shopping: ['Milk', 'Bread', 'Eggs'],
  SelfNotes: ['Note 1', 'Note 2', 'Note 3'],
};

const ListDetails = ({ route, navigation }) => {
  const { listId } = route.params;
  const [listName, setListName] = useState('');
  const [listType, setListType] = useState('');
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPredefinedItem, setSelectedPredefinedItem] = useState('');

  useEffect(() => {
    const fetchListDetails = async () => {
      try {
        const listDoc = doc(firestore, 'lists', listId);
        const listSnapshot = await getDoc(listDoc);
        if (listSnapshot.exists()) {
          const listData = listSnapshot.data();
          setListName(listData.name);
          setListType(listData.type);
          setItems(listData.items || []);
        }
      } catch (error) {
        console.error('Error fetching list details:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchListDetails();
  }, [listId]);

  const handleAddItem = async () => {
    if (!newItem.trim() && !selectedPredefinedItem) return;
    const itemToAdd = newItem.trim() || selectedPredefinedItem;
    try {
      const listDoc = doc(firestore, 'lists', listId);
      await updateDoc(listDoc, {
        items: arrayUnion(itemToAdd),
      });
      setItems((prevItems) => [...prevItems, itemToAdd]);
      setNewItem('');
      setSelectedPredefinedItem('');
    } catch (error) {
      console.error('Error adding item:', error);
    }
  };

  const handleDeleteItem = async (item) => {
    try {
      const listDoc = doc(firestore, 'lists', listId);
      await updateDoc(listDoc, {
        items: arrayRemove(item),
      });
      setItems((prevItems) => prevItems.filter((i) => i !== item));
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  const handleUpdateListName = async () => {
    try {
      const listDoc = doc(firestore, 'lists', listId);
      await updateDoc(listDoc, {
        name: listName,
      });
    } catch (error) {
      console.error('Error updating list name:', error);
    }
  };

  const handleUpdateListType = async () => {
    try {
      const listDoc = doc(firestore, 'lists', listId);
      await updateDoc(listDoc, {
        type: listType,
      });
    } catch (error) {
      console.error('Error updating list type:', error);
    }
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <Text style={styles.loadingText}>Loading...</Text>
      ) : (
        <>
          <View style={styles.headerContainer}>
            <TextInput
              style={styles.input}
              value={listName}
              onChangeText={setListName}
              onEndEditing={handleUpdateListName}
              placeholder="List Name"
            />
            <Picker
              selectedValue={listType}
              style={styles.picker}
              onValueChange={async (itemValue) => {
                setListType(itemValue);
                await handleUpdateListType(itemValue);
              }}
            >
              <Picker.Item label="To-Do List" value="TDL" />
              <Picker.Item label="Shopping List" value="Shopping" />
              <Picker.Item label="Self Notes" value="SelfNotes" />
            </Picker>
          </View>
          <FlatList
            data={items}
            keyExtractor={(item, index) => `${item}-${index}`}
            renderItem={({ item }) => (
              <ListItem
                title={item}
                onDelete={() => handleDeleteItem(item)}
              />
            )}
            ListEmptyComponent={<Text style={styles.emptyText}>Your list is empty.</Text>}
          />
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Add a new item"
              value={newItem}
              onChangeText={setNewItem}
            />
            <Picker
              selectedValue={selectedPredefinedItem}
              style={styles.picker}
              onValueChange={(itemValue) => setSelectedPredefinedItem(itemValue)}
            >
              <Picker.Item label="Predefined Items" value="" />
              {predefinedItems[listType].map((item, index) => (
                <Picker.Item key={index} label={item} value={item} />
              ))}
            </Picker>
            <TouchableOpacity style={styles.button} onPress={handleAddItem}>
              <Text style={styles.buttonText}>Add</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
  },
  input: {
    flex: 1,
    padding: 10,
    margin: 10,
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 5,
  },
  picker: {
    flex: 1,
    height: 50,
    margin: 10,
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
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
});

export default ListDetails;