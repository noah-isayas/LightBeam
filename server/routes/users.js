import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import passport from 'passport';
import User from '../models/User.js';

const router = express.Router();

// Register
router.post('/register', (req, res) => {
    const { username, password } = req.body;
    User.findOne({ username }).then(user => {
        if (user) {
            return res.status(400).json({ msg: 'Username already exists' });
        } else {
            const newUser = new User({
                username,
                password
            });

            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser.save()
                        .then(user => res.json(user))
                        .catch(err => console.log(err));
                });
            });
        }
    });
});

// Login
router.post('/login', (req, res) => {
    const { username, password } = req.body;
    User.findOne({ username }).then(user => {
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        bcrypt.compare(password, user.password).then(isMatch => {
            if (isMatch) {
                const payload = { id: user.id, username: user.username, role: user.role };
                jwt.sign(
                    payload,
                    process.env.SECRET_OR_KEY,
                    { expiresIn: 3600 },
                    (err, token) => {
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

// Protected Route Example
router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.json({
        id: req.user.id,
        username: req.user.username
    });
});

// Fetch all users (Admin use)
router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ msg: 'Unauthorized' });
    }

    User.find()
        .select('-password')  // Exclude passwords from the response
        .then(users => res.json(users))
        .catch(err => res.status(500).json({ error: err.message }));
});

export default router;
