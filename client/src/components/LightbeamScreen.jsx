import React, { useState } from 'react';
import '../style/LightbeamScreen.css';

const LightbeamScreen = () => {
    const [images, setImages] = useState({
        screen1: null,
        screen2: null,
        screen3: null,
    });

    const handleImageChange = (event, screen) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setImages((prevImages) => ({
                    ...prevImages,
                    [screen]: reader.result,
                }));
            };
            reader.readAsDataURL(file);
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
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => handleImageChange(e, screen)}
                                        className="file-input"
                                    />
                                    {images[screen] ? (
                                        <img src={images[screen]} alt={screen} />
                                    ) : (
                                        <p className="title">{screen.replace('screen', 'Screen ')}</p>
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
