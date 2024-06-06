import React, { useState } from 'react';
import Modal from './Modal';
import '../style/Feed.css';

const Feed = () => {
    const [showModal, setShowModal] = useState(false);
    const [template, setTemplate] = useState(null);

    const openModal = (template) => {
        setTemplate(template);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setTemplate(null);
    };

    return (
        <div className="feed">
            <div className="pinned">
                <h3>PINNED / IMPORTANT</h3>
                <div className="pinned-items">
                    <div className="item" onClick={() => openModal('template1')}>
                        <img src="Screen1.png" alt="Screen 1" width="150" height="100" />
                    </div>
                    <div className="item" onClick={() => openModal('template2')}>
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
            {showModal && <Modal closeModal={closeModal} template={template} />}
        </div>
    );
};

export default Feed;
