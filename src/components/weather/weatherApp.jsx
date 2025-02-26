/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import "./style.css";
import Weathercard from "./weathercard";

const WeatherApp = () => {
  const [searchValue, setSearchValue] = useState("pune");
  const [tempInfo, setTempInfo] = useState({});
  const [recentSearches, setRecentSearches] = useState([]);

  const getWeatherInfo = async (city) => {
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=d39fb70974e9ea2deec193e3a1c786f1`;
      const res = await fetch(url);
      const data = await res.json();

      const { temp, pressure, humidity } = data.main;
      const { main: weathermood } = data.weather[0];
      const { speed } = data.wind;
      const { name } = data;
      const { country, sunset } = data.sys;

      const myNewWeatherInfo = {
        temp,
        pressure,
        humidity,
        speed,
        weathermood,
        name,
        country,
        sunset,
      };

      setTempInfo(myNewWeatherInfo);
      updateRecentSearches(city);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getWeatherInfo(searchValue);
  }, []);

  const updateRecentSearches = (city) => {
    setRecentSearches((prevSearches) => {
      const updatedSearches = [city, ...prevSearches.filter((c) => c !== city)].slice(0, 5);
      return updatedSearches;
    });
  };

  return (
    <>
      <div className="wrap">
        <div className="search">
          <input
            type="search"
            placeholder="search..."
            autoFocus
            id="search"
            className="searchTerm"
            value={searchValue}
            onChange={(e) => {
              setSearchValue(e.target.value);
            }}
          />

          <button
            className="searchButton"
            type="button"
            onClick={() => getWeatherInfo(searchValue)}
          >
            Search
          </button>
        </div>

        <div className="recent-searches">
          <h3>Recent Searches</h3>
          <ul>
            {recentSearches.map((city, index) => (
              <li key={index} onClick={() => getWeatherInfo(city)}>
                {city}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <Weathercard {...tempInfo} />
    </>
  );
};

export default WeatherApp;