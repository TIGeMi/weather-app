import { Card } from "@material-ui/core";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import SearchBar from "material-ui-search-bar";
import React, { useEffect, useState } from "react";
import currentApi from "../../api/currentApi";
import CityList from "../../components/CityList";
import { API_KEY } from "../../constants";
import { cityList } from "./cityList";
import "./CurrentWeather.css";

CurrentWeather.propTypes = {};

function CurrentWeather(props) {
  const [currentData, setCurrentData] = useState({
    clouds: {},
    main: {},
    name: "",
    weather: [{ icon: "" }],
    wind: {},
  });
  const { clouds, main, name, weather, wind } = currentData;
  const [city, setCity] = useState("Hanoi");
  const [searchText, setSearchText] = useState("");
  const [validSearch, setValidSearch] = useState(true);

  useEffect(() => {
    console.log("chayj lai use effect");
    const fetchCurrentData = async () => {
      try {
        if (localStorage.getItem("weather/cityName")) {
          const cityName = localStorage.getItem("weather/cityName");
          const params = { q: cityName, appid: API_KEY, units: "metric" };
          const response = await currentApi.get(params);
          console.log(response);
          setCurrentData(response);
        } else {
          const params = { q: city, appid: API_KEY, units: "metric" };
          const response = await currentApi.get(params);
          console.log(response);
          setCurrentData(response);
        }
        setValidSearch(true);
      } catch (error) {
        setValidSearch(false);
        console.log("Failed to fetch data: ", error);
      }
    };
    fetchCurrentData();
    return () => {
      console.log("un mount");
    };
  }, [city]);

  const handleCityClick = (cityName) => {
    localStorage.setItem("weather/cityName", cityName);
    setCity(cityName);
  };
  return (
    <div>
      <div className="search-bar">
        <SearchBar
          value={searchText}
          onChange={(newValue) => {
            setSearchText(newValue);
          }}
          onRequestSearch={() => {
            console.log(searchText);
            localStorage.setItem("weather/cityName", searchText);
            setCity(searchText);
          }}
        />
      </div>
      <div className="city-list">
        <CityList cities={cityList} onSelect={handleCityClick} />
      </div>
      {validSearch ? (
        <div className="city-current">
          <Card className="city-current__card">
            <div className="card-row card-row-more">
              <h2 className="city-name">{name}</h2>
              <img
                src={`http://openweathermap.org/img/w/${weather[0].icon}.png`}
                alt=""
              />
            </div>
            <div className="card-row">
              <h2 className="temp">{main.temp}°C</h2>
            </div>
            <div className="card-row card-row-more">
              <p className="temp_min">
                {" "}
                <ExpandMoreIcon />
                {main.temp_min}°C
              </p>
              <p className="temp_max">
                <ExpandLessIcon />
                {main.temp_max}°C
              </p>
            </div>
          </Card>
          <Card className="city-current__card">
            <div className="card-row-col">
              <div className="property">
                <p>Humidity</p>
                <p>{main.humidity}%</p>
              </div>
              <div className="property-container">
                <div
                  className="property-value"
                  style={{ width: `${main.humidity}%` }}
                ></div>
              </div>
            </div>
            <div className="card-row-col">
              <div className="property">
                <p>Cloudiness</p>
                <p>{clouds.all}%</p>
              </div>
              <div className="property-container">
                <div
                  className="property-value"
                  style={{ width: `${clouds.all}%` }}
                ></div>
              </div>
            </div>
            <div className="card-row">
              <div className="property">
                <p>Wind</p>
                <div className="wind-meter">
                  <svg height="20" width="20">
                    <path d="M10 0 L7 11 L10 16 L13 11 Z" />
                  </svg>
                </div>

                <p>{wind.speed}km/h</p>
              </div>
            </div>
          </Card>
        </div>
      ) : (
        <div className="error-result">
          <h2>!Oops...This city not found</h2>
        </div>
      )}
    </div>
  );
}

export default CurrentWeather;
