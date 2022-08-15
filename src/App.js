import { useEffect, useState } from "react";
import CurrentWeather from "./components/CurrentWeather";
import Header from "./components/Header";
import Search from "./components/Search";
import { WEATHER_API_KEY, WEATHER_API_URL } from "./config";
import "./styles/style.scss";

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [units, setUnits] = useState("imperial");
  const [deviceLocation, setDeviceLocation] = useState([]);
  // const [forecast, setForecast] = useState(null);

  useEffect(() => {
    const loadFromLocalStorage = () => {
      if (localStorage.getItem("weather") === null) {
        localStorage.setItem("weather", JSON.stringify([]));
      } else {
        const savedWeather = JSON.parse(localStorage.getItem("weather"));
        setCurrentWeather(savedWeather);
      }
    };
    loadFromLocalStorage();
  }, []);

  useEffect(() => {
    function getUserLocation() {
      navigator.geolocation.getCurrentPosition((position) => {
        const ps = [position.coords.latitude, position.coords.longitude];
        setDeviceLocation(ps);
      });
    }
    getUserLocation();
  }, []);

  useEffect(() => {
    if (deviceLocation.length !== 0) {
      const currentWeatherFetch =
        fetch(`${WEATHER_API_URL}/weather?lat=${deviceLocation[0]}&lon=${deviceLocation[1]}&appid=${WEATHER_API_KEY}&units=imperial
    `);

      Promise.all([currentWeatherFetch /*, forecastFetch */])
        .then(async (response) => {
          const weatherResponse = await response[0].json();
          // const forecastResponse = await response[1].json();
          setCurrentWeather({
            city: weatherResponse.name,
            ...weatherResponse,
          });
          // setForecast({ city: searchData.label, ...forecastResponse });
        })
        .catch((err) => console.log(err));
    }
  }, [deviceLocation]);

  useEffect(() => {
    const saveToLocalStorage = () => {
      localStorage.setItem("weather", JSON.stringify(currentWeather));
    };
    saveToLocalStorage();
  }, [currentWeather && deviceLocation]);

  const handleOnSearchChange = (searchData) => {
    const [lat, lon] = searchData.value.split(" ");

    const currentWeatherFetch =
      fetch(`${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=imperial
    `);
    // const forecastFetch =
    //   fetch(`${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=imperial
    // `);

    Promise.all([currentWeatherFetch /*, forecastFetch */])
      .then(async (response) => {
        const weatherResponse = await response[0].json();
        // const forecastResponse = await response[1].json();

        setCurrentWeather({ city: searchData.label, ...weatherResponse });
        // setForecast({ city: searchData.label, ...forecastResponse });
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="App">
      <Header units={units} setUnits={setUnits} />
      <main className="main">
        <Search onSearchChange={handleOnSearchChange} />
        {currentWeather && (
          <CurrentWeather data={currentWeather} units={units} />
        )}
      </main>
    </div>
  );
}

export default App;
