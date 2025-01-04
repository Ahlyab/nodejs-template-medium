const jwt = require("jsonwebtoken");
const { createUser, validateCredentials } = require("../services/user.service");
const {
  createRefreshToken,
  verifyRefreshToken,
  deleteRefreshToken,
} = require("../services/token.service");

const register = async (req, res, next) => {
  try {
    const userResp = await createUser(req.body);
    if (userResp.error) {
      return res.status(400).json({
        status: "error",
        message: userResp.error_message,
      });
    }

    const accessToken = jwt.sign(
      { userId: userResp.data.user.id },
      process.env.JWT_SECRET,
      { expiresIn: "15m" }
    );

    const refreshTokenResp = await createRefreshToken(userResp.data.user.id);
    if (refreshTokenResp.error) {
      return res.status(500).json({
        status: "error",
        message: refreshTokenResp.error_message,
      });
    }

    res.status(201).json({
      status: "success",
      data: {
        user: userResp.data.user,
        accessToken,
        refreshToken: refreshTokenResp.data.token,
      },
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const userResp = await validateCredentials(req.body);
    if (userResp.error) {
      return res.status(401).json({
        status: "error",
        message: userResp.error_message,
      });
    }

    const accessToken = jwt.sign(
      { userId: userResp.data.user.id },
      process.env.JWT_SECRET,
      { expiresIn: "15m" }
    );

    const refreshTokenResp = await createRefreshToken(userResp.data.user.id);
    if (refreshTokenResp.error) {
      return res.status(500).json({
        status: "error",
        message: refreshTokenResp.error_message,
      });
    }

    res.json({
      status: "success",
      data: {
        user: userResp.data.user,
        accessToken,
        refreshToken: refreshTokenResp.data.token,
      },
    });
  } catch (error) {
    next(error);
  }
};

const refreshToken = async (req, res, next) => {
  try {
    const verifyResp = await verifyRefreshToken(req.body.refreshToken);
    if (verifyResp.error) {
      return res.status(401).json({
        status: "error",
        message: verifyResp.error_message,
      });
    }

    const accessToken = jwt.sign(
      { userId: verifyResp.data.userId },
      process.env.JWT_SECRET,
      { expiresIn: "15m" }
    );

    const newRefreshTokenResp = await createRefreshToken(
      verifyResp.data.userId
    );
    if (newRefreshTokenResp.error) {
      return res.status(500).json({
        status: "error",
        message: newRefreshTokenResp.error_message,
      });
    }

    await deleteRefreshToken(req.body.refreshToken);

    res.json({
      status: "success",
      data: {
        accessToken,
        refreshToken: newRefreshTokenResp.data.token,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  login,
  refreshToken,
};
