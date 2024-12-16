
const express = require('express');
const CallbackRequest = require('../models/CallBackRequest');
const router = express.Router();

// Submit Callback Request
router.post('/submit', async (req, res) => {
  console.log('Received request:', req.body);
  try {
    const { yourname, youremail, message, callbackdate, callbacktime } = req.body;

    const newRequest = new CallbackRequest({
      yourname,
      youremail,
      message,
      callbackdate,
      callbacktime,
    });

    await newRequest.save();
    res.status(201).json({ message: 'Callback request submitted successfully!' });
  } catch (error) {
    console.error('Error saving callback request:', error);
    res.status(500).json({ error: 'Internal server error', details: error.message }); // Include error details
  }
});

// Get All Callback Requests
router.get('/', async (req, res) => {
  console.log('GET /api/callbacks called'); // Log when the endpoint is hit
  try {
    const requests = await CallbackRequest.find();
    res.json({ callbacks: requests });
  } catch (error) {
    console.error('Error fetching callback requests:', error);
    res.status(500).json({ error: 'Failed to fetch callback requests' });
  }
});

module.exports = router;
