const express = require('express');
// const Message = require('../models/Message');
const Message = require('../models/Message');

const router = express.Router();

// POST endpoint to submit a message
router.post('/submit', async (req, res) => {
  try {
    const newMessage = new Message(req.body);
    // console.log('Request body:', req.body);
    await newMessage.save();
    res.status(201).json({ message: 'Data saved successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Error saving data', error });
  }
});
// GET endpoint to fetch all messages
router.get('/', async (req, res) => {
  try {
    const messages = await Message.find(); // Fetch all messages from the database
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching messages', error });
  }
});


module.exports = router;