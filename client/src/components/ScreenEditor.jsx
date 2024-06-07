import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../style/ScreenEditor.css';

function EditableText({ text, onTextChange }) {
    return (
        <input
            type="text"
            value={text}
            onChange={(e) => onTextChange(e.target.value)}
            style={{ border: 'none', backgroundColor: 'transparent', fontSize: 'inherit', textAlign: 'center' }}
        />
    );
}

function ImageUploader({ src, onImageChange }) {
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                onImageChange(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="image-container">
            <img src={src} alt="Upload" onClick={() => document.getElementById(`input-${src}`).click()} />
            <input
                id={`input-${src}`}
                type="file"
                style={{ display: 'none' }}
                onChange={handleImageChange}
            />
        </div>
    );
}

function KPMGDashboard() {
    const [employees, setEmployees] = useState([
        { name: 'Helene', email: 'email@figmasfakedomain.net', src: 'helene.png' },
        { name: 'Mats', email: 'email@figmasfakedomain.net', src: 'mats.png' },
        { name: 'Daniel', email: 'email@figmasfakedomain.net', src: 'daniel.jpg' },
        { name: 'Daniel', email: 'email@figmasfakedomain.net', src: 'dani.png' }
    ]);

    const [dateTime, setDateTime] = useState('24.mai 2024\n12:30');
    const [temperature, setTemperature] = useState('25°C');
    const [events, setEvents] = useState([
        { title: 'Kunstig intelligens - slik kommer du i gang', date: '13 mars 2024' },
        { title: 'ESG & IFRS Konferansen 2024', date: '13 juni 2024' }
    ]);
    const [pressItems, setPressItems] = useState([
        { title: 'Rune Skjelvan tar over lederskapet i KPMG', date: '20.6.2023 07:15:00 CEST | Pressemelding', src: 'rune.jpg' },
        { title: 'Kine Kjaernet tas opp som partner i KPMG', date: '22.4.2020 09:10:36 CEST | Pressemelding', src: 'kine.jpg' }
    ]);

    useEffect(() => {
        // Fetch saved template data on mount
        const fetchTemplateData = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/template/get');
                const data = response.data;
                if (data) {
                    setEmployees(data.employees || employees);
                    setDateTime(data.dateTime || dateTime);
                    setTemperature(data.temperature || temperature);
                    setEvents(data.events || events);
                    setPressItems(data.pressItems || pressItems);
                }
            } catch (error) {
                console.error("Error fetching template data:", error);
            }
        };

        fetchTemplateData();
    }, []);

    const saveTemplateData = async () => {
        const data = {
            employees,
            dateTime,
            temperature,
            events,
            pressItems
        };

        try {
            await axios.post('http://localhost:3000/api/template/save', { data });
        } catch (error) {
            console.error("Error saving template data:", error);
        }
    };

    const handleEmployeeChange = (index, key, value) => {
        const newEmployees = [...employees];
        newEmployees[index][key] = value;
        setEmployees(newEmployees);
        saveTemplateData(); // Save data whenever there is a change
    };

    const handleEventChange = (index, key, value) => {
        const newEvents = [...events];
        newEvents[index][key] = value;
        setEvents(newEvents);
        saveTemplateData(); // Save data whenever there is a change
    };

    const handlePressItemChange = (index, key, value) => {
        const newPressItems = [...pressItems];
        newPressItems[index][key] = value;
        setPressItems(newPressItems);
        saveTemplateData(); // Save data whenever there is a change
    };

    return (
        <div className="container">
            <div className="header">
                <h1>KPMG - Månedesansatte</h1>
            </div>
            <div className="employees">
                {employees.map((employee, index) => (
                    <div className="employee" key={index}>
                        <ImageUploader src={employee.src} onImageChange={(src) => handleEmployeeChange(index, 'src', src)} />
                        <div>
                            <EditableText text={employee.name} onTextChange={(name) => handleEmployeeChange(index, 'name', name)} />
                            <EditableText text={employee.email} onTextChange={(email) => handleEmployeeChange(index, 'email', email)} />
                        </div>
                    </div>
                ))}
            </div>
            <div className="weather">
                <h2>God Dag!</h2>
                <EditableText text={dateTime} onTextChange={setDateTime} />
                <ImageUploader src="vær.jpg" onImageChange={(src) => {}} />
                <ImageUploader src="sol.png" onImageChange={(src) => {}} />
                <EditableText text={temperature} onTextChange={setTemperature} />
            </div>
            <div className="events">
                <h2>Kommende eventer</h2>
                {events.map((event, index) => (
                    <div className="event" key={index}>
                        <EditableText text={event.title} onTextChange={(title) => handleEventChange(index, 'title', title)} />
                        <EditableText text={event.date} onTextChange={(date) => handleEventChange(index, 'date', date)} />
                    </div>
                ))}
            </div>
            <div className="press">
                <h2>Presse</h2>
                {pressItems.map((pressItem, index) => (
                    <div className="press-item" key={index}>
                        <ImageUploader src={pressItem.src} onImageChange={(src) => handlePressItemChange(index, 'src', src)} />
                        <div>
                            <EditableText text={pressItem.title} onTextChange={(title) => handlePressItemChange(index, 'title', title)} />
                            <EditableText text={pressItem.date} onTextChange={(date) => handlePressItemChange(index, 'date', date)} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default KPMGDashboard;

