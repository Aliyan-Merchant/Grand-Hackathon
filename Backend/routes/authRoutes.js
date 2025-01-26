const express = require('express');
const { login, signup, resetPassword } = require('../controllers/authController.js');
const router = express.Router();

router.post('/login', login);
router.post('/signup', signup);
router.post('/reset-password', resetPassword);

module.exports = router;
