import express from 'express';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();
const users = []; // In-memory storage for users
const secret = process.env.JWT_SECRET || 'your_secret_key';

// Register user
router.post('/register', async (req, res) => {
    const { username, password, role, email, name } = req.body;

    const existingUser = users.find(user => user.username === username);
    if (existingUser) {
        return res.status(400).json({ msg: 'Username already exists' });
    }

    const newUser = new User({ username, password: bcrypt.hashSync(password, 10), role, email, name });
    await newUser.save();

    users.push(newUser);
    res.status(201).json(newUser);
});

// Login user
router.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(user => user.username === username);
    if (!user) {
        return res.status(404).json({ msg: 'User not found' });
    }

    const isMatch = bcrypt.compareSync(password, user.password);
    if (isMatch) {
        const payload = { id: user.id, username: user.username, role: user.role };
        const token = jwt.sign(payload, secret, { expiresIn: 3600 });
        res.json({ success: true, token: 'Bearer ' + token });
    } else {
        return res.status(400).json({ msg: 'Password incorrect' });
    }
});

// Fetch current user
router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.json(req.user);
});

// Fetch all users (Admin use)
router.get('/', passport.authenticate('jwt', { session: false }), async (req, res) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ msg: 'Unauthorized' });
    }
    const users = await User.find();
    res.json(users);
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
