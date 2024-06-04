import React from 'react';
import '../style/IntroScreen.css';

const IntroScreen = () => {
    return (
        <div className="intro-screen">
            <img src="kpmg.png" alt="KPMG Logo" className="kpmg-logo" />
            <p className="intro-text">
                <u>Select an option below</u>
            </p>
            <div className="button-container">
                <button className="btn btn-primary" id="watch-btn">
                    <span role="img" aria-label="watch">📺</span>
                    Watch
                </button>
                <a href="lightbeam.html">
                    <button className="btn btn-secondary" id="upload-btn">
                        <span role="img" aria-label="upload">⬆️</span>
                        Upload
                    </button>
                </a>
            </div>
        </div>
    );
};

export default IntroScreen;
