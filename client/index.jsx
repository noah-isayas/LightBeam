import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import io from 'socket.io-client';

const socket = io('http://localhost:3000'); // Ensure this matches your server URL and port

function Application() {
    const [counter, setCounter] = useState(0);
    const [duration, setDuration] = useState(null);

    useEffect(() => {
        // Listen for 'duration-updated' events
        socket.on('duration-updated', (data) => {
            console.log('Duration updated:', data);
            setDuration(data.duration);
        });

        // Cleanup on unmount
        return () => {
            socket.off('duration-updated');
        };
    }, []);

    const updateDuration = (newDuration) => {
        // Emit 'edit-duration' event with the new duration
        socket.emit('edit-duration', { duration: newDuration });
    };

    return (
        <>
            <h2>Welcome to my application</h2>
            <button onClick={() => setCounter(prev => prev + 1)}>Click me</button>
            <div>You have clicked {counter} times</div>
            <div>Current Duration: {duration}</div>
            <button onClick={() => updateDuration(60)}>Set Duration to 60</button>
        </>
    );
}

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);
root.render(<Application />);
