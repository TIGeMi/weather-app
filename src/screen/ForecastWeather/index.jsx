import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import SearchBar from "material-ui-search-bar";
import CityList from "../../components/CityList";
import { Card } from "@material-ui/core";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import currentApi from "../../api/currentApi";
import dailyApi from "../../api/dailyApi";
import { API_KEY } from "../../constants";
import { cityList } from "../CurrentWeather/cityList";
import DailyList from "../../components/DailyList";
import "./ForecastWeather.css";
ForecastWeather.propTypes = {};

function ForecastWeather(props) {
  const [daily, setDaily] = useState([]);
  const [city, setCity] = useState("");
  const [searchText, setSearchText] = useState("");
  const [validSearch, setValidSearch] = useState(true);

  useEffect(() => {
    const fetchDailyData = async () => {
      try {
        if (localStorage.getItem("weather/cityName")) {
          const cityName = localStorage.getItem("weather/cityName");
          const params = { q: cityName, appid: API_KEY, units: "metric" };
          const response = await currentApi.get(params);
          const { coord } = response;

          const dailyParams = {
            lat: coord.lat,
            lon: coord.lon,
            exclude: "hourly,minutely,current",
            appid: API_KEY,
            units: "metric",
          };
          const dailyRes = await dailyApi.get(dailyParams);
          setDaily(dailyRes.daily);
        } else {
          console.log("khong co city");
          const params = { q: city, appid: API_KEY, units: "metric" };
          const response = await currentApi.get(params);
          const { coord } = response;

          const dailyParams = {
            lat: coord.lat,
            lon: coord.lon,
            exclude: "hourly,minutely,current",
            appid: API_KEY,
            units: "metric",
          };
          const dailyRes = await dailyApi.get(dailyParams);
          setDaily(dailyRes);
        }
        setValidSearch(true);
        setCity(localStorage.getItem("weather/cityName"));
      } catch (error) {
        setValidSearch(false);
        console.log("Failed to fetch data: ", error);
      }
    };
    fetchDailyData();
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
        <div className="success-result">
          <h2>{city}</h2>
          <DailyList data={daily} />
        </div>
      ) : (
        <div className="error-result">
          <h2>!Oops...This city not found</h2>
        </div>
      )}
    </div>
  );
}

export default ForecastWeather;
