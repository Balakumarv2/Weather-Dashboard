import React, { useState } from 'react';
import axios from 'axios';
import { Search, MapPin, Wind, Droplets, Sun } from 'lucide-react';
import './App.css';

const App = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(''); 
                                                         
  const API_KEY = "80b32aa24c5e9d0d4e8957c0202b387d"; // https://api.openweathermap.org/data/2.5/weather?q=London&appid=80b32aa24c5e9d0d4e8957c0202b387d 

  const fetchWeather = async (e) => {
    e.preventDefault();
    if (!city) return;
    
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;
      const response = await axios.get(url);
      setWeather(response.data);
      setError('');
    } catch (err) {
      setError('City not found. Please try again.');
      setWeather(null);
    }
  };

  return (
    <div className={`app-container ${weather?.main.temp > 20 ? 'warm' : 'cold'}`}>
      <div className="search-box">
        <form onSubmit={fetchWeather}>
          <input 
            type="text" 
            placeholder="Search city..." 
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button type="submit"><Search size={20} /></button>
        </form>
      </div>

      {error && <p className="error-msg">{error}</p>}

      {weather && (
        <div className="weather-display">
          <div className="main-info">
            <h2><MapPin size={24} /> {weather.name}, {weather.sys.country}</h2>
            <h1>{Math.round(weather.main.temp)}°C</h1>
            <p className="description">{weather.weather[0].description}</p>
          </div>

          <div className="details-grid">
            <div className="detail-card">
              <Droplets />
              <p>Humidity</p>
              <span>{weather.main.humidity}%</span>
            </div>
            <div className="detail-card">
              <Wind />
              <p>Wind Speed</p>
              <span>{weather.wind.speed} m/s</span>
            </div>
            <div className="detail-card">
              <Sun />
              <p>Feels Like</p>
              <span>{Math.round(weather.main.feels_like)}°C</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;