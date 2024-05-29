import express from 'express';
import passport from 'passport';
import dotenv from 'dotenv';
import path from 'path';
import cors from 'cors';
import { fileURLToPath } from 'url';

dotenv.config();

import passportConfig from './config/passport.js';
import userRoutes from './routes/users.js';

const app = express();
const port = process.env.PORT || 3000;

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(express.json());
app.use(cors());  // Enable CORS for cross-origin requests

// Initialize Passport.js
app.use(passport.initialize());
passportConfig(passport);

// Routes
app.use('/api/users', userRoutes);

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static(path.join(__dirname, 'client/build')));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
