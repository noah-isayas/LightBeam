import express from 'express';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import passport from 'passport';
import jwt from 'jsonwebtoken';

const router = express.Router();

// Register user
router.post('/register', async (req, res) => {
    try {
        const { username, password, role, email, name } = req.body;
        const user = new User({ username, password, role, email, name });
        await user.save();
        res.status(201).send(user);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Login user
router.post('/login', (req, res) => {
    const { username, password } = req.body;
    User.findOne({ username }).then(user => {
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        // Check password
        bcrypt.compare(password, user.password).then(isMatch => {
            if (isMatch) {
                // User matched, create JWT Payload
                const payload = {
                    id: user.id,
                    username: user.username,
                    role: user.role
                };

                // Sign token
                jwt.sign(
                    payload,
                    process.env.JWT_SECRET,
                    { expiresIn: 3600 }, // 1 hour
                    (err, token) => {
                        if (err) throw err;
                        res.json({
                            success: true,
                            token: 'Bearer ' + token
                        });
                    }
                );
            } else {
                return res.status(400).json({ msg: 'Password incorrect' });
            }
        });
    });
});

// Get all users
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.send(users);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Get user by ID
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).send();
        }
        res.send(user);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Update user
router.patch('/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!user) {
            return res.status(404).send();
        }
        res.send(user);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Delete user
router.delete('/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).send();
        }
        res.send(user);
    } catch (error) {
        res.status(500).send(error);
    }
});

export default router;