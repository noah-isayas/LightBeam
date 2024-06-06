import express from 'express';
import mongoose from 'mongoose';
import passport from 'passport';
import path from 'path';
import cors from 'cors';
import { fileURLToPath } from 'url';
import http from 'http';
import { Server } from 'socket.io';
import dotenv from 'dotenv';

dotenv.config();

import passportConfig from './config/passport.js';
import userRoutes from './routes/users.js';
import mediaRoutes from './routes/media.js';
import uploadRoutes from './routes/upload.js';

const app = express();
const port = process.env.PORT || 3000;

// CORS configuration for Express
app.use(cors({
    origin: "http://localhost:1234", // Ensure this matches your client URL and port
    methods: ["GET", "POST"],
    allowedHeaders: ["Authorization", "Content-Type"],
    credentials: true
}));

app.use(express.json());

// Create HTTP server and setup Socket.IO with CORS
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:1234", // Ensure this matches your client URL and port
        methods: ["GET", "POST"],
        allowedHeaders: ["Authorization", "Content-Type"],
        credentials: true
    }
});


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

app.use(passport.initialize());
passportConfig(passport);

app.use('/api/users', userRoutes);
app.use('/api/media', mediaRoutes);
app.use('/api/upload', uploadRoutes);

// Serve static files from the 'client/dist' directory
app.use(express.static(path.join(__dirname, '../client/dist')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

// Serve the upload HTML page
app.get('/upload', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/upload.html'));
});

// Serve uploaded files
app.use('/uploads', express.static('uploads'));

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/dist')));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../client/dist', 'index.html'));
    });
}

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });

    socket.on('edit-duration', (data) => {
        console.log('Received edit-duration event:', data);
        io.emit('duration-updated', data);
    });
});

server.listen(port, () => {
    console.log(`Server running on port ${port}`);
    console.log(`Server started on http://localhost:${server.address().port}`);
});
