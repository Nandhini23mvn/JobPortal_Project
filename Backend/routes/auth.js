const express = require('express');
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const User = require('../models/User');
const router = express.Router();

// Admin Login
router.post('/admin/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const admin = await Admin.findOne({ email });
        if (!admin) {
            return res.status(401).send({ message: 'Invalid credentials' });
        }

        const isMatch = await admin.comparePassword(password);
        if (!isMatch) {
            return res.status(401).send({ message: 'Invalid credentials' });
        }

        res.send({ message: 'Admin login successful', success: true });
    } catch (error) {
        console.error(error); // Log the error
        res.status(500).send({ message: 'Error logging in' });
    }
});


// User Login
router.post('/user/login', async (req, res) => {
    console.log('Login attempt:', req.body);
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            console.error('User not found');
            return res.status(401).send({ message: 'Invalid credentials' });
        }

        // Directly compare plaintext passwords
        if (user.password !== password) {
            console.error('Password does not match');
            return res.status(401).send({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user._id, role: 'user' }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.send({ message: 'User login successful', success: true, token });
    } catch (error) {
        console.error('Error logging in:', error.message);
        res.status(500).send({ message: 'Error logging in', error: error.message });
    }
});

// Middleware to protect routes
const authenticate = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) return res.status(401).send({ message: 'Access denied. No token provided.' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).send({ message: 'Invalid token.' });
    }
};

// Example protected route
router.get('/protected-route', authenticate, (req, res) => {
    res.send({ message: 'You have accessed a protected route!', user: req.user });
});



module.exports = router;












// // router/auth.js
// const express = require('express');
// const Admin = require('../models/Admin');
// const router = express.Router();

// // Admin Login
// router.post('/admin/login', async (req, res) => {
//     const { email, password } = req.body;

//     try {
//         const admin = await Admin.findOne({ email });
//         if (!admin) {
//             return res.status(401).send({ message: 'Invalid credentials' });
//         }

//         const isMatch = await admin.comparePassword(password);
//         if (!isMatch) {
//             return res.status(401).send({ message: 'Invalid credentials' });
//         }

//         // Successfully logged in
//         res.send({ message: 'Login successful', success: true });
//     } catch (error) {
//         res.status(500).send({ message: 'Error logging in' });
//     }
// });


// // User Login
// router.post('/user/login', async (req, res) => {
//     const { email, password } = req.body;

//     try {
//         const user = await User.findOne({ email });
//         if (!user) {
//             return res.status(401).send({ message: 'Invalid credentials' });
//         }

//         const isMatch = await bcrypt.compare(password, user.password); // Compare password
//         if (!isMatch) {
//             return res.status(401).send({ message: 'Invalid credentials' });
//         }

//         // Optionally, generate a JWT for user
//         const token = jwt.sign({ id: user._id, role: 'user' }, process.env.JWT_SECRET, { expiresIn: '1h' });

//         res.send({ message: 'Login successful', success: true, token });
//     } catch (error) {
//         res.status(500).send({ message: 'Error logging in' });
//     }
// });

// module.exports = router;