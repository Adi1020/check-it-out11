from firebase_init import auth_pyrebase, db

def login(email, password):
    try:
        # Sign in with email and password using Pyrebase
        user = auth_pyrebase.sign_in_with_email_and_password(email, password)
        return {'success': True, 'user': user}
    except Exception as e:
        return {'success': False, 'error': str(e)}

def signup(email, password):
    try:
        user = auth_pyrebase.create_user_with_email_and_password(email, password)
        return {'success': True, 'user': user}
    except Exception as e:
        return {'success': False, 'error': str(e)}

# Example usage
if __name__ == '__main__':
    # result = login('JA@mail.com', '123456')
    # if result['success']:
    #     print(f"Login successful for user: {result['user']['localId']}")
    # else:
    #     print(f"Login failed: {result['error']}")
    
