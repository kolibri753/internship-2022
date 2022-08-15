import React from "react";

function CurrentWeather({ units, data }) {

  const getDegreeFormat = () => (units === "imperial" ? "°F" : "°C");
  const getWindSpeedFormat = () => (units === "imperial" ? "m/h" : "m/s");

  const getTemp = (temp) =>
    units === "imperial"
      ? Math.round(temp)
      : Math.round(((temp-32)*5)/9);
  
  return (
    <div className="weather">
      <div className="weather__top">
        <h2 className="weather__city">
          {data.city.split(",").shift()},
          <span className="weather__city-code">{data.sys.country}</span>
        </h2>
        <p className="weather__city-name">{data.name}</p>
        <p className="weather__description">{data.weather[0].description}</p>
      </div>
      <div className="weather__center">
        <div className="weather__img-container">
          <img
            className="weather__img"
            src={`img/icons/${data.weather[0].icon}.png`}
            alt="icon"
          />
        </div>
        <h3 className="weather__temp">
          {getTemp(data.main.temp)}
          {getDegreeFormat()}
        </h3>
        <div className="weather__info">
          <span className="weather__info-param">
            Feels like: {getTemp(data.main.feels_like)}
            {getDegreeFormat()}
          </span>
          <span className="weather__info-param">
            Humidity: {data.main.humidity}
          </span>
          <span className="weather__info-param">
            Wind speed: {data.wind.speed}
            {getWindSpeedFormat()}
          </span>
        </div>
      </div>
      <div className="weather__bottom">
        <span className="weather__sun">
          <span>Sunrise:</span>{" "}
          {new Date(data.sys.sunrise * 1000).toLocaleTimeString()}
        </span>
        <span className="weather__sun">
          <span>Sunset:</span>{" "}
          {new Date(data.sys.sunset * 1000).toLocaleTimeString()}
        </span>
      </div>
    </div>
  );
}

export default CurrentWeather;
