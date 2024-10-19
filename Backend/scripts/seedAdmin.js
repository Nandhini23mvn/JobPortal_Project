// scripts/seedAdmin.js
const mongoose = require('mongoose');
const Admin = require('../models/Admin'); // Adjust the path as necessary
const bcrypt = require('bcrypt');
const connectDB = require('../config/db'); // Import your connection logic

const seedAdmin = async () => {
    try {
        // Connect to MongoDB using the existing connection logic
        await connectDB();

        // Check if admin already exists
        const adminExists = await Admin.findOne({ email: 'adminlogin@example.com' });
        if (adminExists) {
            console.log('Admin user already exists.');
            return;
        }

        const hashedPassword = await bcrypt.hash('admin_password', 10);
        const adminUser = new Admin({
            email: 'adminlogin@example.com',
            password: hashedPassword,
        });

        await adminUser.save();
        console.log('Admin user created successfully.');
    } catch (error) {
        console.error('Error creating admin user:', error);
    } finally {
        await mongoose.connection.close(); // Close the connection
    }
};

seedAdmin();
