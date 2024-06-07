import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header.jsx';
import IntroScreen from './components/IntroScreen';
import Dashboard from './components/Dashboard';
import Calendar from './components/Calendar';
import Login from './components/Login';
import LightbeamScreen from './components/LightbeamScreen';
import ScreenEditor from "./components/ScreenEditor";

const App = () => {
    return (
        <Router>
            <div className="App">
                <Header />
                <Routes>
                    <Route path="/" element={<IntroScreen />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/calendar" element={<Calendar />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/lightbeam" element={<LightbeamScreen />} />
                    <Route path="/screen-editor" element={<ScreenEditor />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
