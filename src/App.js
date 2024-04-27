import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Axios from "axios";
import CityComponent from "./modules/CityComponent.js";
import WeatherComponent from "./modules/WeatherInfoComponent";

export const WeatherIcons = {
  "01d": "/icons/sunny.svg",
  "01n": "/icons/night.svg",
  "02d": "/icons/day.svg",
  "02n": "/icons/cloudy-night.svg",
  "03d": "/icons/cloudy.svg",
  "03n": "/icons/cloudy.svg",
  "04d": "/icons/perfect-day.svg",
  "04n": "/icons/cloudy-night.svg",
  "09d": "/icons/rain.svg",
  "09n": "/icons/rain-night.svg",
  "10d": "/icons/rain.svg",
  "10n": "/icons/rain-night.svg",
  "11d": "/icons/storm.svg",
  "11n": "/icons/storm.svg",
};

const Container = styled.div`
  position: relative; 
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 380px;
  padding: 20px 10px;
  margin: auto;
  border-radius: 4px;
  box-shadow: 0 3px 6px 0 #555;
  background: white;
  font-family: Montserrat;
  justify-content: center;
`;


const CloseButton = styled.span`
  padding: 2px 3px;
  background-color: black;
  border-radius: 50%;
  color: white;
  position: absolute;
  top: 10px;
  right: 10px; 
  cursor: pointer; 
`;

const WeatherContainer = styled.div`
  margin-top: 20px; 
`;

function App() {
  const [city, updateCity] = useState();
  const [weather, updateWeather] = useState();

  useEffect(() => {
    let weatherConditionClass = "default-weather"; // Default background class

    if (weather) {
      // Determine the weather condition and set the corresponding background class
      const weatherCondition = weather.weather[0].main.toLowerCase();
      weatherConditionClass = weatherCondition;
    }

    document.body.className = weatherConditionClass;
  }, [weather]);



  const fetchWeather = async (e) => {
    e.preventDefault();
    if (!city) {
      alert("Please enter a city name.");
      return;
    }
    try {
      const response = await Axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=737ed1b71bd76e30b33bf346bdda63f2`,
      );
      updateWeather(response.data);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        alert("City not found. Please enter a valid city name.");
      } else {
        alert("An error occurred while fetching weather data. Please try again later.");
      }
    }
  };

  const handleClearWeather = () => {
    // Clear city and weather when close button is clicked
    updateCity(null);
    updateWeather(null);
  };

  return (
    <Container>
      <CityComponent updateCity={updateCity} fetchWeather={fetchWeather} />
      {weather && (
        <>
          <CloseButton onClick={handleClearWeather}>X</CloseButton>
          <WeatherContainer>
            <WeatherComponent weather={weather} />
          </WeatherContainer>
        </>
      )}
    </Container>
  );
}

export default App;