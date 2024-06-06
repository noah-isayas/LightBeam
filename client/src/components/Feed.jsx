import React from 'react';

const Feed = () => {
    return (
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
    );
};

export default Feed;
