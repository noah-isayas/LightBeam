import express from 'express';
import Media from '../models/Media.js';

const router = express.Router();

// Get all media
router.get('/', async (req, res) => {
    try {
        const media = await Media.find({ status: 'active' });
        res.json(media);
    } catch (err) {
        res.status(500).send(err);
    }
});

export default router;
