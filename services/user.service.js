const User = require('../models/user.model');

const _createUser = async (userData, resp) => {
  const existingUser = await User.findOne({ email: userData.email });
  if (existingUser) {
    resp.error = true;
    resp.error_message = 'Email already registered';
    return resp;
  }

  const user = await User.create(userData);
  
  resp.data = {
    user: {
      id: user._id,
      email: user.email,
      name: user.name
    }
  };

  return resp;
};

const createUser = async (userData) => {
  let resp = {
    error: false,
    error_message: '',
    data: {}
  };

  resp = await _createUser(userData, resp);
  return resp;
};

const _validateCredentials = async (credentials, resp) => {
  const user = await User.findOne({ email: credentials.email });
  if (!user) {
    resp.error = true;
    resp.error_message = 'Invalid credentials';
    return resp;
  }

  const isValidPassword = await user.comparePassword(credentials.password);
  if (!isValidPassword) {
    resp.error = true;
    resp.error_message = 'Invalid credentials';
    return resp;
  }

  resp.data = {
    user: {
      id: user._id,
      email: user.email,
      name: user.name
    }
  };

  return resp;
};

const validateCredentials = async (credentials) => {
  let resp = {
    error: false,
    error_message: '',
    data: {}
  };

  resp = await _validateCredentials(credentials, resp);
  return resp;
};

module.exports = {
  createUser,
  validateCredentials
};