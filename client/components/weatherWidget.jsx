import React, { useState, useEffect } from 'react';
import axios from 'axios';


const WeatherWidget = () => {
    const [weather, setWeather] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchWeather = async () => {
            try {
                const apiKey = process.env.REACT_APP_WEATHER_API_KEY;;
                const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=Oslo&units=metric&appid=${apiKey}`);
                setWeather(response.data);
            } catch (error) {
                setError('Failed to fetch weather data');
            }
        };

        fetchWeather();
    }, []);

    if (error) {
        return <div className="weather-widget">Error: {error}</div>;
    }

    if (!weather) {
        return <div className="weather-widget">Loading...</div>;
    }

    return (
        <div className="weather-widget">
            <h4>Weather in Oslo</h4>
            <p>Temperature: {weather.main.temp}°C</p>
            <p>Condition: {weather.weather[0].description}</p>
        </div>
    );
};

export default WeatherWidget;