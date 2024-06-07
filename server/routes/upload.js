import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
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
    console.log("Upload request received");
    upload(req, res, async (err) => {
        if (err) {
            console.error("Upload error:", err);
            res.status(400).send(err);
        } else {
            if (req.file == undefined) {
                console.log("No file selected");
                res.status(400).send('No file selected');
            } else {
                const { screen } = req.body; // Get screen type from request body

                // Delete the previous image from the filesystem and database
                const previousMedia = await Media.findOne({ type: screen });
                if (previousMedia) {
                    fs.unlink(previousMedia.content, (err) => {
                        if (err) {
                            console.error("Error deleting the previous image:", err);
                        } else {
                            console.log("Previous image deleted:", previousMedia.content);
                        }
                    });
                    await Media.deleteOne({ _id: previousMedia._id });
                }

                const newMedia = new Media({
                    type: screen || 'image',
                    content: req.file.path,
                    duration: 15,
                    validuntil: new Date(),
                    createdby: null, // Set the user who uploaded the file
                    status: 'active'
                });
                await newMedia.save();
                res.json(newMedia); // Respond with the saved media document
            }
        }
    });
});

export default router;



