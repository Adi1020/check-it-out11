import uuid
from firebase_init import firestore_db

def create_list(user_uid, list_name):
    try:
        list_id = str(uuid.uuid4())
        list_data = {
            'name': list_name,
            'items': [],
            'userId': user_uid,
            'list_id': list_id,
        }
        firestore_db.collection('lists').document(list_id).set(list_data)
        print('List created successfully!')

        # Update the 'users' document with the new list ID
        user_doc = firestore_db.collection('users').document(user_uid).get()
        user_data = user_doc.to_dict()
        existing_lists = user_data.get('lists', [])
        existing_lists.append(list_id)
        firestore_db.collection('users').document(user_uid).update({'lists': existing_lists})

        return list_id
    except Exception as e:
        print(f"Error creating shopping list: {e}")
        raise e

def get_lists(user_uid):
    try:
        lists_ref = firestore_db.collection('lists').where('userId', '==', user_uid).select(['name', 'list_id'])
        user_lists = [list_doc.to_dict() for list_doc in lists_ref.stream()]
        return user_lists
    except Exception as e:
        print(f"Error getting shopping lists: {e}")
        raise e

def add_item_to_list(list_id, item_name, item_quantity):
    try:
        # Input validation
        if not item_name or not item_quantity:
            raise ValueError("Item name and quantity are required.")

        item_id = str(uuid.uuid4())
        item_data = {
            'item_name': item_name,
            'item_quantity': item_quantity,
            'item_id': item_id,
        }
        firestore_db.collection('lists').document(list_id).collection('items').document(item_id).set(item_data)
        return item_id
    except Exception as e:
        print(f"Error adding item to list: {e}")
        raise e

if __name__ == '__main__':
    # user_uid = 'your_user_uid'
    # list_name = 'Sample List'
    
    # list_id = create_list(user_uid, list_name)
    # print(f'Created list ID: {list_id}')
    
    # print('Current lists:')
    # lists = get_lists(user_uid)
    # for l in lists:
    #     print(l)
    
    # item_name = 'Sample Item'
    # item_quantity = 3
    # add_item_to_list(list_id, item_name, item_quantity)
    # print(f'Added item {item_name} to list ID: {list_id}')
    
    
    
