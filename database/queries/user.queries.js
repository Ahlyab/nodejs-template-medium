const User = require('../../models/user.model');

const findUserByEmail = async (email) => {
  return User.findOne({ email });
};

const createNewUser = async (userData) => {
  return User.create(userData);
};

const findUserById = async (id) => {
  return User.findById(id).select('-password');
};

module.exports = {
  findUserByEmail,
  createNewUser,
  findUserById
};