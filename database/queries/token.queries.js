const RefreshToken = require('../../models/token.model');

const saveRefreshToken = async (userId, token, expiresAt) => {
  return RefreshToken.create({
    userId,
    token,
    expiresAt
  });
};

const findRefreshToken = async (token) => {
  return RefreshToken.findOne({ token });
};

const removeRefreshToken = async (token) => {
  return RefreshToken.deleteOne({ token });
};

module.exports = {
  saveRefreshToken,
  findRefreshToken,
  removeRefreshToken
};