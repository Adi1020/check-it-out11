from firebase_admin import auth
from firebase_init import firestore_db


def create_user(email, password, first_name, last_name):
    try:
        # Create a new user in Firebase Authentication
        user = auth.create_user(email=email, password=password)
        
        # Prepare user data to store in Firestore
        user_data = {
            'email': email,
            'firstName': first_name,
            'lastName': last_name,
            'lists': []
        }
        # Store user data in Firestore
        firestore_db.collection('users').document(user.uid).set(user_data)
        
        print('User created successfully in both Firebase Auth and Firestore!')
        return {'success': True, 'user': user}
    except Exception as e:
        print(f'Error creating user: {e}')
        return {'success': False, 'error': str(e)}


def read_all_users():
    users = firestore_db.collection('users').stream()
    for user in users:
        print(user.to_dict())


def update_user(uid, first_name=None, last_name=None, lists=None):
    user_ref = firestore_db.collection('users').document(uid)
    user_data = {}
    if first_name:
        user_data['firstName'] = first_name
    if last_name:
        user_data['lastName'] = last_name
    if lists is not None:
        user_data['lists'] = lists
    if user_data:
        try:
            user_ref.update(user_data)
            print('User updated successfully!')
        except Exception as e:
            print(f'Error updating user: {e}')
    else:
        print('No updates provided.')


def delete_user(email):
    try:
        # Delete user from Firebase Authentication
        user = auth.get_user_by_email(email)
        auth.delete_user(user.uid)
        
        # Delete user from Firestore
        firestore_db.collection('users').document(user.uid).delete()
        print('User deleted successfully from both Firebase Auth and Firestore!')
    except Exception as e:
        print(f'Error deleting user: {e}')


if __name__ == '__main__':
    # create_user(email, password, first_name, last_name)
    read_all_users()