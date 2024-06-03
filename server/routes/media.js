import express from 'express';
import multer from 'multer';
import passport from 'passport';
import AWS from 'aws-sdk';
import Media from '../models/Media.js';

const router = express.Router();

// Create media
router.post('/', async (req, res) => {
    try {
        const media = new Media(req.body);
        await media.save();
        res.status(201).send(media);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Get all media
router.get('/', async (req, res) => {
    try {
        const media = await Media.find();
        res.send(media);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Get media by ID
router.get('/:id', async (req, res) => {
    try {
        const media = await Media.findById(req.params.id);
        if (!media) {
            return res.status(404).send();
        }
        res.send(media);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Update media
router.patch('/:id', async (req, res) => {
    try {
        const media = await Media.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!media) {
            return res.status(404).send();
        }
        res.send(media);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Delete media
router.delete('/:id', async (req, res) => {
    try {
        const media = await Media.findByIdAndDelete(req.params.id);
        if (!media) {
            return res.status(404).send();
        }
        res.send(media);
    } catch (error) {
        res.status(500).send(error);
    }
});

export default router;