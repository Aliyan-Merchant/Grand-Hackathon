const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User.js');
const nodemailer = require('nodemailer');

// JWT Secret
const JWT_SECRET = 'your-jwt-secret-key';

// Login
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: 'Invalid email or password' });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid email or password' });

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ user: { name: user.name }, token });
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Sign Up
exports.signup = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ error: 'Email already in use' });

    const newUser = new User({ name, email, password });
    await newUser.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Reset Password
exports.resetPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: 'User not found' });

    const resetLink = `http://localhost:3000/reset-password/${email}`;
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'your-email@gmail.com',
        pass: 'your-email-password',
      },
    });

    await transporter.sendMail({
      to: email,
      subject: 'Password Reset',
      text: `Click here to reset your password: ${resetLink}`,
    });

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
