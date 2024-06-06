import React, { useState } from 'react';
import '../style/Modal.css';

const Modal = ({ closeModal, template }) => {
    const [employees, setEmployees] = useState([
        { name: 'Daniel', email: 'email1@example.com', imgSrc: 'placeholder.png' },
        { name: 'Daniel', email: 'email2@example.com', imgSrc: 'placeholder.png' },
        { name: 'Daniel', email: 'email3@example.com', imgSrc: 'placeholder.png' },
        { name: 'Daniel', email: 'email4@example.com', imgSrc: 'placeholder.png' }
    ]);
    const [events, setEvents] = useState([
        { title: 'Event Title 1', date: 'Event Date 1' },
        { title: 'Event Title 2', date: 'Event Date 2' }
    ]);
    const [press, setPress] = useState([
        { title: 'Press Title 1', date: 'Press Date 1', imgSrc: 'placeholder.png' },
        { title: 'Press Title 2', date: 'Press Date 2', imgSrc: 'placeholder.png' }
    ]);

    const handleImageChange = (e, index, section) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            const newData = [...(section === 'employees' ? employees : press)];
            newData[index].imgSrc = reader.result;
            section === 'employees' ? setEmployees(newData) : setPress(newData);
        };
        reader.readAsDataURL(file);
    };

    const handleTextChange = (e, index, section, field) => {
        const newData = [...(section === 'employees' ? employees : section === 'events' ? events : press)];
        newData[index][field] = e.target.value;
        section === 'employees' ? setEmployees(newData) : section === 'events' ? setEvents(newData) : setPress(newData);
    };

    return (
        <div className="modal-overlay" onClick={closeModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="container">
                    <div className="header">
                        <h1>KPMG - Månedesansatte</h1>
                    </div>
                    <div className="employees">
                        {employees.map((employee, index) => (
                            <div className="employee" key={index}>
                                <input type="file" onChange={(e) => handleImageChange(e, index, 'employees')} />
                                <img src={employee.imgSrc} alt={employee.name} />
                                <div>
                                    <input type="text" value={employee.name} onChange={(e) => handleTextChange(e, index, 'employees', 'name')} />
                                    <input type="text" value={employee.email} onChange={(e) => handleTextChange(e, index, 'employees', 'email')} className="employee-email" />
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="weather">
                        <h2>God Dag!</h2>
                        <div className="date-time">24.mai 2024<br />12:30</div>
                        <img src="vær.jpg" alt="Sun" />
                        <img src="sol.png" alt="Sun" />
                        <div className="temperature">25°C</div>
                    </div>
                    <div className="events">
                        <h2>Kommende eventer</h2>
                        {events.map((event, index) => (
                            <div className="event" key={index}>
                                <input type="text" value={event.title} onChange={(e) => handleTextChange(e, index, 'events', 'title')} className="event-title" />
                                <input type="text" value={event.date} onChange={(e) => handleTextChange(e, index, 'events', 'date')} className="event-date" />
                            </div>
                        ))}
                    </div>
                    <div className="press">
                        <h2>Presse</h2>
                        {press.map((item, index) => (
                            <div className="press-item" key={index}>
                                <input type="file" onChange={(e) => handleImageChange(e, index, 'press')} />
                                <img src={item.imgSrc} alt={item.title} />
                                <div>
                                    <input type="text" value={item.title} onChange={(e) => handleTextChange(e, index, 'press', 'title')} className="press-title" />
                                    <input type="text" value={item.date} onChange={(e) => handleTextChange(e, index, 'press', 'date')} className="press-date" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <button className="close-button" onClick={closeModal}>Close</button>
            </div>
        </div>
    );
};

export default Modal;
