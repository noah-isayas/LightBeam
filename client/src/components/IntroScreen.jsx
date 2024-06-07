import React from 'react';
import { Link } from 'react-router-dom';
import '../style/IntroScreen.css';

const IntroScreen = () => {
    return (
        <div className="intro-screen">
            <img src="kpmg.png" alt="KPMG Log5o" className="kpmg-logo" />
            <p className="intro-text">
                <u>Select an option below</u>
            </p>
            <div className="button-container">
                <Link to="/watch-screen">
                    <button className="btn btn-primary" id="watch-btn">
                        <span role="img" aria-label="watch">📺</span>
                        Watch
                    </button>
                </Link>
                <Link to="/lightbeam">
                    <button className="btn btn-secondary" id="upload-btn">
                        <span role="img" aria-label="upload">⬆️</span>
                        Upload
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default IntroScreen;
