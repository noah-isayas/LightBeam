import React from 'react';

function ImageTemplate({ imageUrl }) {
    return (
        <div style={{ width: '100vw', height: '100vh', overflow: 'hidden' }}>
            <img src={imageUrl} alt="Full Screen" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
    );
}

export default ImageTemplate;
