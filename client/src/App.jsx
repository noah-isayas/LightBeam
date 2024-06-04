import React from 'react';
import './App.css';
import Header from './components/Header.jsx';
import IntroScreen from './components/IntroScreen';

const App = () => {
    return (
        <div className="App">
            <Header />
            <IntroScreen />
        </div>
    );
};

export default App;
