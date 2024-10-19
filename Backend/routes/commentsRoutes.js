// routes/comments.js

const express = require('express');
const Comment = require('../models/Comment');

const router = express.Router();

// POST: Create a new comment
router.post('/', async (req, res) => {
    const { name, email, website, comment } = req.body;

    console.log('Received comment:', req.body); // Log the incoming data

    try {
        const newComment = new Comment({ name, email, website, comment });
        await newComment.save();
        res.status(201).json(newComment);
    } catch (error) {
        console.error('Error saving comment:', error); // Log the error
        res.status(400).json({ message: 'Error saving comment', error });
    }
});

// GET: Retrieve all comments
router.get('/', async (req, res) => {
    try {
        const comments = await Comment.find();
        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching comments', error });
    }
});

// DELETE: Delete a comment by ID
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const deletedComment = await Comment.findByIdAndDelete(id);
        if (!deletedComment) {
            return res.status(404).json({ message: 'Comment not found' });
        }
        res.status(200).json({ message: 'Comment deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting comment', error });
    }
});

module.exports = router;
