const jwt = require('jsonwebtoken');
const RefreshToken = require('../models/token.model');

const _createRefreshToken = async (userId, resp) => {
  const token = jwt.sign(
    { userId },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );

  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 7);

  try {
    await RefreshToken.create({
      userId,
      token,
      expiresAt
    });

    resp.data = { token };
  } catch (error) {
    resp.error = true;
    resp.error_message = 'Failed to create refresh token';
  }

  return resp;
};

const createRefreshToken = async (userId) => {
  let resp = {
    error: false,
    error_message: '',
    data: {}
  };

  resp = await _createRefreshToken(userId, resp);
  return resp;
};

const _verifyRefreshToken = async (token, resp) => {
  const refreshToken = await RefreshToken.findOne({ token });
  if (!refreshToken) {
    resp.error = true;
    resp.error_message = 'Invalid refresh token';
    return resp;
  }

  if (new Date(refreshToken.expiresAt) < new Date()) {
    resp.error = true;
    resp.error_message = 'Refresh token expired';
    return resp;
  }

  resp.data = { userId: refreshToken.userId };
  return resp;
};

const verifyRefreshToken = async (token) => {
  let resp = {
    error: false,
    error_message: '',
    data: {}
  };

  resp = await _verifyRefreshToken(token, resp);
  return resp;
};

const _deleteRefreshToken = async (token, resp) => {
  try {
    await RefreshToken.deleteOne({ token });
  } catch (error) {
    resp.error = true;
    resp.error_message = 'Failed to delete refresh token';
  }
  return resp;
};

const deleteRefreshToken = async (token) => {
  let resp = {
    error: false,
    error_message: '',
    data: {}
  };

  resp = await _deleteRefreshToken(token, resp);
  return resp;
};

module.exports = {
  createRefreshToken,
  verifyRefreshToken,
  deleteRefreshToken
};