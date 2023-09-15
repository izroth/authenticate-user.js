const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const createAuthPackage = (secretKey, userStorage = []) => {
  const generateToken = (user) => jwt.sign(user, secretKey);

  const verifyToken = (token) => {
    try {
      return jwt.verify(token, secretKey);
    } catch (error) {
      return null;
    }
    
  };

  const hashPassword = (password) => bcrypt.hashSync(password, 10);

  const comparePasswords = (plainPassword, hashedPassword) => bcrypt.compareSync(plainPassword, hashedPassword);

  const register = (username, password) => {
    const existingUser = userStorage.find((user) => user.username === username);
    if (existingUser) {
      throw new Error('Username already exists');
    }

    const hashedPassword = hashPassword(password);
    const user = { username, password: hashedPassword };
    userStorage.push(user);

    return user;
  };

  const authenticate = (username, password) => {
    const user = userStorage.find((u) => u.username === username);

    if (!user) {
      throw new Error('User not found');
    }

    if (!comparePasswords(password, user.password)) {
      throw new Error('Incorrect password');
    }

    return generateToken({ username: user.username });
  };

  return {
    generateToken,
    verifyToken,
    hashPassword,
    comparePasswords,
    register,
    authenticate,
  };
};

module.exports = createAuthPackage;
