import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  NavLink,
} from "react-router-dom";
import CurrentWeather from "./screen/CurrentWeather";
import ForecastWeather from "./screen/ForecastWeather";
import { Card, CardContent, Grid } from "@material-ui/core";
import DashboardIcon from "@material-ui/icons/Dashboard";
import "./App.css";
function App() {
  return (
    <div className="container">
      <Router>
        <Card className="card">
          <CardContent>
            <Grid container spacing={0}>
              <Grid className="navbar" item md={3}>
                <div className="logo">
                  <img
                    src="https://icon-library.com/images/weather-app-icon/weather-app-icon-25.jpg"
                    alt="logo"
                  />
                  <h2>WEATHER APP</h2>
                </div>
                <ul>
                  <li>
                    <NavLink exact to="/" activeClassName="selected">
                      <DashboardIcon />
                      Current Weather
                    </NavLink>
                  </li>
                  <li>
                    <NavLink exact to="/forecast" activeClassName="selected">
                      Forecast Weather
                    </NavLink>
                  </li>
                  <li>
                    <NavLink exact to="/historical" activeClassName="selected">
                      Historical Weather
                    </NavLink>
                  </li>
                  <li>
                    <NavLink exact to="/air" activeClassName="selected">
                      Air Polution
                    </NavLink>
                  </li>
                  <li>
                    <NavLink exact to="/maps" activeClassName="selected">
                      Weather Maps
                    </NavLink>
                  </li>
                </ul>
              </Grid>
              <Grid item md={9}>
                <Switch>
                  <Route exact path="/">
                    <CurrentWeather />
                  </Route>
                  <Route exact path="/forecast">
                    <ForecastWeather />
                  </Route>
                </Switch>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Router>
    </div>
  );
}

export default App;
