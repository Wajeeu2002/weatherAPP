import "./styles.css";
import React, { useEffect, useState } from "react";

export default function App() {
  const [weather, setWeather] = useState([]);
  const [location, setLocation] = useState("");
  const [click, setClick] = useState(null);

  let app_key = "8aa17d7ca022cb9cd924abb3527b7a26";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${click}&appid=${app_key}&units=imperial`;
  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setWeather(data);
      });
  }, [click]);

  function handleSubmit(e) {
    if (e.key === "Enter") {
      setClick(location);
      setLocation(" ");
    }
  }
  function handleClick() {
    setClick(location);
    setLocation(" ");
  }
  return (
    <div className="App">
      <input
        className="typing"
        type="text"
        placeholder="Search Location"
        value={location}
        onChange={(event) => setLocation(event.target.value)}
        onKeyPress={handleSubmit}
      />
      <button onClick={handleClick} className="btn">
        Search{" "}
      </button>

      <div className="top">
        <p>{weather.name}</p>
        {weather.main ? <h1>{weather.main.temp.toFixed()}°F</h1> : null}
        {weather.weather ? <p>{weather.weather[0].main}</p> : null}
      </div>

      {weather.name === undefined ? null : (
        <div className="bottom">
          <div>
            {weather.main ? <p>{weather.main.feels_like}</p> : null}
            <p>Feels_like</p>
          </div>
          <div>
            {weather.main ? <p>{weather.main.humidity.toFixed()}%</p> : null}
            <p>Humidity</p>
          </div>
          <div>
            {weather.wind ? <p>{weather.wind.speed.toFixed()}MPH</p> : null}
            <p> Wind </p>
          </div>
        </div>
      )}
    </div>
  );
}
