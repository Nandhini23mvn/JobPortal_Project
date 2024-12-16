
const express = require('express');
const multer = require('multer');
const path = require('path');
// const User = require('../models/User');
const User = require('../models/User');

const router = express.Router();
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Ensure this directory exists
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique file name
  },
});

const upload = multer({ storage });

router.post('/check-unique', async (req, res) => {
  const { email, phoneno, excludeId } = req.body;

  try {
    const existingUser = await User.findOne({
      $or: [{ email }, { phoneno }],
      ...(excludeId && { _id: { $ne: excludeId } }),
    });

    if (existingUser) {
      return res.json({
        isEmailUnique: existingUser.email !== email,
        isPhoneNoUnique: existingUser.phoneno !== phoneno,
      });
    }

    res.json({ isEmailUnique: true, isPhoneNoUnique: true });
  } catch (error) {
    console.error('Error checking uniqueness:', error);
    res.status(500).json({ error: 'Server error while checking uniqueness' });
  }
});

router.post('/', upload.single('avatar'), async (req, res) => {
  console.log("Received user data:", req.body);
  console.log("Received file:", req.file);

  try {
    const formattedDob = req.body.dob ? new Date(req.body.dob).toLocaleDateString('en-US') : null;
    const newUser = new User({
      ...req.body,
      dob: formattedDob,
      avatar: req.file ? req.file.path : null,
    });

    await newUser.save();
    res.status(201).send({ message: 'User added successfully', user: newUser });
  } catch (error) {
    console.error('Error saving user:', error);
    res.status(400).send({ error: 'Failed to save user' });
  }
});

router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).send({ error: 'Failed to fetch users' });
  }
});

router.put('/:id', upload.single('avatar'), async (req, res) => {
  try {
    const userId = req.params.id;
    const existingUser = await User.findById(userId);
    if (!existingUser) {
      return res.status(404).send({ error: 'User not found' });
    }

    const updatedUserData = {
      fname: req.body.fname || existingUser.fname,
      lname: req.body.lname || existingUser.lname,
      dob: req.body.dob || existingUser.dob,
      gender: req.body.gender || existingUser.gender,
      email: req.body.email || existingUser.email,
      phoneno: req.body.phoneno || existingUser.phoneno,
      city: req.body.city || existingUser.city,
      avatar: req.file ? req.file.path : existingUser.avatar,
    };

    if (req.body.password) {
      updatedUserData.password = req.body.password;
    }

    const updatedUser = await User.findByIdAndUpdate(userId, updatedUserData, { new: true });
    res.send({ message: 'User updated successfully', user: updatedUser });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(400).send({ error: 'Failed to update user' });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await User.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).send({ error: 'User not found' });
    }
    res.status(204).send({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).send({ error: 'Server error' });
  }
});

module.exports = router;
