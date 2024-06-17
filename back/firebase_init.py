import os
from firebase_admin import credentials, initialize_app, get_app, firestore
import pyrebase
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Initialize Firebase Admin SDK
FIREBASE_ADMIN_SDK = os.environ.get('FIREBASE_ADMIN_SDK')

if FIREBASE_ADMIN_SDK is None:
    raise ValueError("FIREBASE_ADMIN_SDK environment variable is not set or is None.")

cred = credentials.Certificate(FIREBASE_ADMIN_SDK)
try:
    # Try to get the default app, if it does not exist, initialize it
    get_app()
except ValueError:
    initialize_app(cred)

# Initialize Firestore client
firestore_db = firestore.client()

# Initialize Firebase Web API
firebaseConfig = {
    "apiKey": os.environ.get("API_KEY"),
    "authDomain": os.environ.get("AUTH_DOMAIN"),
    "projectId": os.environ.get("PROJECT_ID"),
    "storageBucket": os.environ.get("STORAGE_BUCKET"),
    "messagingSenderId": os.environ.get("MESSAGING_SENDER_ID"),
    "appId": os.environ.get("APP_ID"),
    "measurementId": os.environ.get("MEASUREMENT_ID"),
    'databaseURL': os.environ.get("DATABASE_URL", ""),
}

firebase = pyrebase.initialize_app(firebaseConfig)
auth_pyrebase = firebase.auth()
db = firebase.database()