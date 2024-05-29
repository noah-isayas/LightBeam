import express from 'express';
import multer from 'multer';
import passport from 'passport';
import AWS from 'aws-sdk';
import Media from '../models/Media.js';

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// AWS S3 Configuration
const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
    region: process.env.AWS_REGION
});

// Upload Media
router.post('/upload', passport.authenticate('jwt', { session: false }), upload.single('file'), (req, res) => {
    const file = req.file;
    const s3Params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: `${Date.now()}_${file.originalname}`,
        Body: file.buffer,
        ContentType: file.mimetype
    };

    s3.upload(s3Params, (err, data) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        const newMedia = new Media({
            type: req.body.type,
            content: data.Location,
            duration: req.body.duration,
            validUntil: req.body.validUntil,
            createdBy: req.user.id
        });

        newMedia.save().then(media => res.json(media)).catch(err => res.status(500).json({ error: err.message }));
    });
});

// Get All Media
router.get('/', (req, res) => {
    Media.find({ status: 'active' })
        .populate('createdBy', ['username'])
        .then(media => res.json(media))
        .catch(err => res.status(500).json({ error: err.message }));
});

// Fetch a single media item by ID
router.get('/:id', (req, res) => {
    Media.findById(req.params.id)
        .populate('createdBy', ['username'])
        .then(media => {
            if (!media) {
                return res.status(404).json({ msg: 'Media not found' });
            }
            res.json(media);
        })
        .catch(err => res.status(500).json({ error: err.message }));
});

// Archive Expired Media
router.put('/archive', (req, res) => {
    Media.updateMany(
        { validUntil: { $lt: new Date() } },
        { status: 'archived' }
    ).then(result => res.json(result)).catch(err => res.status(500).json({ error: err.message }));
});

export default router;
