import 'dotenv/config';
import express from 'express';
import passport from 'passport';
import dotenv from 'dotenv';
import path from 'path';
import cors from 'cors';
import mongoose from 'mongoose';
import { fileURLToPath } from 'url';
import usersRoutes from './routes/users.js';
import mediaRoutes from './routes/media.js';
import uploadRoutes from './routes/upload.js';
import passportConfig from './config/passport.js';

dotenv.config();

console.log('JWT_SECRET:', process.env.JWT_SECRET); // Debug statement to check environment variable
console.log('MONGODB_URI:', process.env.MONGODB_URI); // Debug statement to check MongoDB URI

const app = express();
const port = process.env.PORT || 3000;

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(express.json());
app.use(cors());  // Enable CORS for cross-origin requests

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Initialize Passport.js
app.use(passport.initialize());
passportConfig(passport);

// Routes
app.use('/api/users', usersRoutes);
app.use('/api/media', mediaRoutes);
app.use('/api/upload', uploadRoutes); // Use the upload route

// Serve static files from the 'client/dist' directory
app.use(express.static(path.join(__dirname, '../client/dist')));

// Serve the upload HTML page
app.get('/upload', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/upload.html'));
});

// Serve uploaded files
app.use('/uploads', express.static('uploads'));

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/dist')));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../client/dist', 'index.html'));
    });
} else {
    // For development, serve a simple response
    app.get('/', (req, res) => {
        res.send('API Running');
    });
}

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

