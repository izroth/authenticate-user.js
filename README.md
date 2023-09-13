
# authenticate-user.js

`authenticate-user.js` is a lightweight Node.js module for user authentication and JSON Web Token (JWT) generation. It provides basic authentication functionality for your Node.js applications.

## Installation

You can install `authenticate-user.js` using npm:

```bash
npm install authenticate-user.js
```

## Usage

To use `authenticate-user.js` in your Node.js application, follow these steps:

1. Import the module into your application:

   ```javascript
   const createAuthPackage = require('authenticate-user.js');
   ```

2. Create an instance of `AuthPackage` by calling the `createAuthPackage` function with your secret key and optional user storage:

   ```javascript
   const secretKey = 'your_secret_key'; // Replace with a strong, secret key
   const userStorage = []; // You can provide your own user storage array or use an empty one
   const auth = createAuthPackage(secretKey, userStorage);
   ```

3. Register a new user:

   ```javascript
   const username = 'newUser';
   const password = 'password123';
   try {
     const user = auth.register(username, password);
     console.log('User registered:', user);
   } catch (error) {
     console.error('Registration failed:', error.message);
   }
   ```

4. Authenticate a user and generate a JWT token:

   ```javascript
   const username = 'existingUser';
   const password = 'password123';
   try {
     const token = auth.authenticate(username, password);
     console.log('Authentication successful. JWT token:', token);
   } catch (error) {
     console.error('Authentication failed:', error.message);
   }
   ```

5. Verify a JWT token:

   ```javascript
   const token = 'your_jwt_token_here';
   const decoded = auth.verifyToken(token);
   if (decoded) {
     console.log('Token verified. User data:', decoded);
   } else {
     console.error('Token verification failed.');
   }
   ```

## Methods

- `register(username, password)`: Registers a new user with the provided username and password. Throws an error if the username already exists.

- `authenticate(username, password)`: Authenticates a user with the provided username and password. Returns a JWT token upon successful authentication.

- `verifyToken(token)`: Verifies a JWT token and returns the decoded user data. Returns `null` if the token is invalid.

- `hashPassword(password)`: Hashes a plain text password using bcrypt.

- `comparePasswords(plainPassword, hashedPassword)`: Compares a plain text password with a hashed password.

## Security

Please ensure that you use a strong and secure secret key for JWT token generation. In a production environment, consider integrating this module with a secure database for user management.
