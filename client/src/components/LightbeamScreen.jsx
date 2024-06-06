import React, { useState } from 'react';
import axios from 'axios';
import '../style/LightbeamScreen.css';

const LightbeamScreen = () => {
    const [images, setImages] = useState({
        screen1: null,
        screen2: null,
        screen3: null,
    });

    const handleImageChange = async (event, screen) => {
        const file = event.target.files[0];
        if (file) {
            const formData = new FormData();
            formData.append('image', file);

            try {
                const response = await axios.post('http://localhost:3000/api/upload/upload', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                setImages((prevImages) => ({
                    ...prevImages,
                    [screen]: response.data.content, // Assuming response.data.content contains the file path
                }));
            } catch (error) {
                console.error('Error uploading the image:', error);
            }
        }
    };

    return (
        <div className="lightbeam-screen">
            <div className="content">
                <div className="header">
                    <h1>Team Feed</h1>
                    <div className="icon">
                        {/* Icon content */}
                    </div>
                </div>
                <div className="add">
                    <h3>ADD</h3>
                    <div className="add-options">
                        <button>Text</button>
                        <button>Image</button>
                        <button>Video</button>
                    </div>
                    <button>Create</button>
                </div>
                <div className="feed">
                    <div className="pinned">
                        <h3>PINNED / IMPORTANT</h3>
                        <div className="pinned-items">
                            {['screen1', 'screen2', 'screen3'].map((screen) => (
                                <div key={screen} className="item">
                                    {screen === 'screen3' ? (
                                        <>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={(e) => handleImageChange(e, screen)}
                                                className="file-input"
                                            />
                                            {images[screen] ? (
                                                <img src={`http://localhost:3000/${images[screen]}`} alt={screen} />
                                            ) : (
                                                <p className="title">{screen.replace('screen', 'Screen ')}</p>
                                            )}
                                        </>
                                    ) : (
                                        <p className="title">Template for {screen.replace('screen', 'Screen ')}</p>
                                    )}
                                </div>
                            ))}
                        </div>
                        <div className="more">
                            {/* More content */}
                        </div>
                    </div>
                    <div className="recent">
                        <h3>RECENT</h3>
                        <div className="add-item">
                            {/* Recent items content */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LightbeamScreen;









