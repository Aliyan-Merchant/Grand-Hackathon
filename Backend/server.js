// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const User = require('./models/User');  // User model for MongoDB
const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/authApp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// User Registration Route (Sign Up)
app.post('/api/auth/signup', async (req, res) => {
  const { name, email, password } = req.body;
  
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).send('Email is already in use.');
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ name, email, password: hashedPassword });
  
  await newUser.save();
  res.status(201).send('User created successfully!');
});

// User Login Route
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).send('Invalid email or password');
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).send('Invalid email or password');
  }

  const token = jwt.sign({ id: user._id, name: user.name }, 'secretkey');
  res.json({ token, user: { name: user.name } });
});

// Password Reset Route
app.post('/api/auth/reset-password', async (req, res) => {
  const { email } = req.body;
  
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).send('Email not found');
  }
  
  // Generate reset link and send via email
  const resetToken = jwt.sign({ id: user._id }, 'secretkey', { expiresIn: '1h' });
  
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'your-email@gmail.com',
      pass: 'your-email-password',
    },
  });

  const mailOptions = {
    from: 'your-email@gmail.com',
    to: email,
    subject: 'Password Reset Link',
    text: `Click here to reset your password: http://localhost:5000/reset/${resetToken}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send('Error sending email');
    }
    res.send('Password reset link sent!');
  });
});

// Start Server
app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});
