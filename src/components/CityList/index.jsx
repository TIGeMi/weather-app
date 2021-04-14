import React from "react";
import PropTypes from "prop-types";
import { Button, Card, CardContent } from "@material-ui/core";
import "./CityItem.css";

CityList.propTypes = {
  cities: PropTypes.array,
  onSelect: PropTypes.func,
};

CityList.defaultProps = {
  cities: [],
  onSelect: null,
};

function CityList(props) {
  const { cities, onSelect } = props;

  const handleClick = (cityName) => {
    if (onSelect) onSelect(cityName);
  };
  return (
    <div className="city-list__inner">
      {cities.map((city) => (
        <div className="city-item">
          <button type="button" onClick={() => handleClick(city.name)}>
            <Card className="city-item__card">
              <img src={city.image} alt={city.name} />
            </Card>
            <h3>{city.name}</h3>
          </button>
        </div>
      ))}
    </div>
  );
}

export default CityList;
