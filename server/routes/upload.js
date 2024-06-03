import express from 'express';
import multer from 'multer';
import path from 'path';
import Media from '../models/Media.js';

const router = express.Router();

// Set up storage for uploaded files
const storage = multer.diskStorage({
    destination: './uploads/',
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

// Init upload
const upload = multer({
    storage: storage,
    limits: { fileSize: 1000000 }, // Limit file size to 1MB
    fileFilter: (req, file, cb) => {
        checkFileType(file, cb);
    }
}).single('image');

// Check file type
function checkFileType(file, cb) {
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Error: Images Only!');
    }
}

// Upload route
router.post('/upload', (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            res.status(400).send(err);
        } else {
            if (req.file == undefined) {
                res.status(400).send('No file selected');
            } else {
                const newMedia = new Media({
                    type: 'image',
                    content: req.file.path,
                    duration: 0,
                    validuntil: new Date(),
                    createdby: null, // Set the user who uploaded the file
                    status: 'active'
                });
                await newMedia.save();
                res.send(`<h2>File uploaded successfully</h2><img src="/${req.file.path}" alt="Uploaded Image"/>`);
            }
        }
    });
});

export default router;
