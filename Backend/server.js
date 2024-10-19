
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const callbackRoutes = require('./routes/callBackRoutes'); // Import callback routes
const authRoutes = require('./routes/auth');
const commentRoutes = require('./routes/commentsRoutes');
const messageRoutes = require('./routes/messageRoutes');


const app = express();
app.use(cors());
app.use(bodyParser.json());

// Load environment variables
require('dotenv').config();


// Connect to MongoDB
connectDB();

// Use user routes
app.use('/api/users', userRoutes);

// Register routes
app.use('/api/callbacks', callbackRoutes);

// Serve uploaded files statically
app.use('/uploads', express.static('uploads'));

// Use authentication routes
app.use('/api/auth', authRoutes);

// comments Routes
app.use('/api/comments', commentRoutes);

// Use the message routes
app.use('/api/message', messageRoutes); 

const PORT = process.env.PORT || 5500;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});