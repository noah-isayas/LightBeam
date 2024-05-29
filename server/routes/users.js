import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import passport from 'passport';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();
const users = []; // In-memory storage for users
const secret = process.env.JWT_SECRET || 'your_secret_key';

// Register
router.post('/register', (req, res) => {
    const { username, password } = req.body;
    const existingUser = users.find(user => user.username === username);
    if (existingUser) {
        return res.status(400).json({ msg: 'Username already exists' });
    }

    const newUser = {
        id: users.length + 1,
        username,
        password: bcrypt.hashSync(password, 10),
        role: 'user' // Default role
    };

    users.push(newUser);
    res.json(newUser);
});

// Login
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

// Fetch Current User
router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.json(req.user);
});

// Fetch All Users (Admin use)
router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ msg: 'Unauthorized' });
    }
    res.json(users);
});

export default router;
