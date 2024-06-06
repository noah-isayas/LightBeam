import React from 'react';
import '../style/LightbeamScreen.css';

const LightbeamScreen = () => {
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
                            <div className="item">
                                <img src="Screen1.png" alt="Screen 1" width="150" height="100" />
                            </div>
                            <div className="item">
                                <p className="title">Screen 2</p>
                            </div>
                            <div className="item">
                                <p className="title">SCREEN 3</p>
                            </div>
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
