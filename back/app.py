import os
from flask import Flask, request, jsonify
import firebase_admin
from firebase_admin import credentials, auth, firestore
import bcrypt
from dotenv import load_dotenv

load_dotenv()

# Initialize Firebase Admin SDK
FIREBASE_ADMIN_SDK = os.environ.get('FIREBASE_ADMIN_SDK')
cred = credentials.Certificate(FIREBASE_ADMIN_SDK)
firebase_admin.initialize_app(cred)
db = firestore.client()

app = Flask(__name__)

# Function to handle user login
def login(email, password):
    try:
        user = auth.get_user_by_email(email)
        user_data = db.collection('users').document(user.uid).get().to_dict()
        hashed_password = user_data.get('password')

        # Verify the password hash
        if bcrypt.checkpw(password.encode('utf-8'), hashed_password.encode('utf-8')):
            return {'success': True, 'user': user}
        else:
            return {'success': False, 'error': 'Invalid email or password'}
    except Exception as e:
        return {'success': False, 'error': str(e)}

# Function to handle user signup
def signup(email, password, first_name, last_name):
    try:
        # Check if the email already exists
        user_doc = db.collection('users').where('email', '==', email).get()
        if len(user_doc) > 0:
            return {'success': False, 'error': 'Email already in use'}

        # Hash the password using bcrypt
        hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())

        # Create a new user in Firebase Authentication
        user = auth.create_user(email=email, password=hashed_password.decode('utf-8'))

        # Store user data in Firestore
        user_data = {
            'email': email,
            'password': hashed_password.decode('utf-8'),
            'firstName': first_name,
            'lastName': last_name,
            'lists': []
        }
        db.collection('users').document(user.uid).set(user_data)

        return {'success': True, 'user': user}
    except Exception as e:
        return {'success': False, 'error': str(e)}

# Route for user login
@app.route('/login', methods=['POST'])
def login_route():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    result = login(email, password)

    if result['success']:
        return jsonify({'success': True, 'user': result['user'].uid})
    else:
        return jsonify({'success': False, 'error': result['error']}), 401

# Route for user signup
@app.route('/signup', methods=['POST'])
def signup_route():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    first_name = data.get('firstName')
    last_name = data.get('lastName')

    result = signup(email, password, first_name, last_name)

    if result['success']:
        return jsonify({'success': True, 'user': result['user'].uid})
    else:
        return jsonify({'success': False, 'error': result['error']}), 400

if __name__ == '__main__':
    app.run(debug=True)
    
    

