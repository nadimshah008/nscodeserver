'use strict';
const express = require('express');
const router = express.Router();
const User = require('../models/user');


router.post('/user', async (req, res) => {
    try {
        const { name, email, phoneNumber } = req.body;
        
        const user = new User({
            name,
            email,
            phoneNumber
        });

        await user.save();

        res.status(201).json({
            message: "User created successfully",
            user
        });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({
                message: "Email or phone number already exists",
                error: error.message
            });
        }
        res.status(500).json({
            message: "Error creating user",
            error: error.message
        });
    }
});


router.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({
            message: "Error fetching users",
            error: error.message
        });
    }
});


router.get('/user/:email', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.params.email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({
            message: "Error fetching user",
            error: error.message
        });
    }
});

module.exports = router;