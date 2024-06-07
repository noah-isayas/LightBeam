import React from 'react';
import '../style/WatchScreen.css';

function WatchScreen() {
    const employees = [
        { name: 'Helene', email: 'email@figmasfakedomain.net', src: 'helene.png' },
        { name: 'Mats', email: 'email@figmasfakedomain.net', src: 'mats.png' },
        { name: 'Daniel', email: 'email@figmasfakedomain.net', src: 'daniel.jpg' },
        { name: 'Daniel', email: 'email@figmasfakedomain.net', src: 'dani.png' }
    ];

    const dateTime = '24.mai 2024\n12:30';
    const temperature = '25°C';
    const events = [
        { title: 'Kunstig intelligens - slik kommer du i gang', date: '13 mars 2024' },
        { title: 'ESG & IFRS Konferansen 2024', date: '13 juni 2024' }
    ];
    const pressItems = [
        { title: 'Rune Skjelvan tar over lederskapet i KPMG', date: '20.6.2023 07:15:00 CEST | Pressemelding', src: 'rune.jpg' },
        { title: 'Kine Kjaernet tas opp som partner i KPMG', date: '22.4.2020 09:10:36 CEST | Pressemelding', src: 'kine.jpg' }
    ];

    return (
        <div className="container">
            <div className="header">
                <h1>KPMG - Månedesansatte</h1>
            </div>
            <div className="employees">
                {employees.map((employee, index) => (
                    <div className="employee" key={index}>
                        <div className="image-container">
                            <img src={employee.src} alt={employee.name} />
                        </div>
                        <div>
                            <div className="employee-name">{employee.name}</div>
                            <div className="employee-email">{employee.email}</div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="weather">
                <h2>God Dag!</h2>
                <div className="date-time">{dateTime}</div>
                <div className="image-container">
                    <img src="vær.jpg" alt="Weather" />
                </div>
                <div className="image-container">
                    <img src="sol.png" alt="Sun" />
                </div>
                <div className="temperature">{temperature}</div>
            </div>
            <div className="events">
                <h2>Kommende eventer</h2>
                {events.map((event, index) => (
                    <div className="event" key={index}>
                        <div className="event-title">{event.title}</div>
                        <div className="event-date">{event.date}</div>
                    </div>
                ))}
            </div>
            <div className="press">
                <h2>Presse</h2>
                {pressItems.map((pressItem, index) => (
                    <div className="press-item" key={index}>
                        <div className="image-container">
                            <img src={pressItem.src} alt={pressItem.title} />
                        </div>
                        <div>
                            <div className="press-title">{pressItem.title}</div>
                            <div className="press-date">{pressItem.date}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default WatchScreen;
