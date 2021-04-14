import React, { useCallback } from "react";
import PropTypes from "prop-types";
import { Card, CardContent } from "@material-ui/core";
import "./DailyList.css";

DailyList.propTypes = {
  data: PropTypes.array,
};

DailyList.defaultProp = {
  data: [],
};

function DailyList(props) {
  const { data } = props;
  const timeConverter = useCallback(
    (dt) => {
      var a = new Date(dt * 1000);
      var months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
      var year = a.getFullYear();
      var month = months[a.getMonth()];
      var date = a.getDate();
      var hour = a.getHours();
      var min = a.getMinutes();
      var sec = a.getSeconds();
      var time = date + " " + month;
      return time;
    },
    [data]
  );
  return (
    <div className="daily-list__inner">
      {data.map((daily) => (
        <Card className="daily-card">
          <CardContent className="daily-card__inner">
            <img
              src={`http://openweathermap.org/img/w/${daily.weather[0].icon}.png`}
              alt="weather-icon"
            />
            <p>
              {Math.round(daily.temp.min)}°C - {Math.round(daily.temp.max)}
              °C
            </p>
            <p className="daily-dt"> {timeConverter(daily.dt)}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default DailyList;
