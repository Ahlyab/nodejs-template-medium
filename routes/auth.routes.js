const express = require('express');
const { register, login, refreshToken } = require('../controllers/auth.controller');
const { validateRequest } = require('../middleware/validation');
const { registerSchema, loginSchema, refreshTokenSchema } = require('../validation/auth.schema');

const router = express.Router();

router.post('/register', validateRequest(registerSchema), register);
router.post('/login', validateRequest(loginSchema), login);
router.post('/refresh-token', validateRequest(refreshTokenSchema), refreshToken);

module.exports = router;