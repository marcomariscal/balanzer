import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Home from "./Home";
import PrivateRoute from "./PrivateRoute";
import Login from "./Login";
import Exchanges from "./Exchanges";
import ExchangeConnection from "./ExchangeConnection";
import Dashboard from "./Dashboard";
import Automate from "./Automate";
import Trade from "./Trade";
import Backtest from "./Backtest";
import "./Routes.scss";

const Routes = ({ setToken }) => {
  return (
    <div className="Routes pt-5">
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>

        <Route exact path="/login">
          <Login setToken={setToken} />
        </Route>

        <PrivateRoute exact path="/exchanges">
          <Exchanges />
        </PrivateRoute>

        <PrivateRoute exact path="/exchanges/:exchangeName">
          <ExchangeConnection />
        </PrivateRoute>

        <PrivateRoute exact path="/dashboard">
          <Dashboard />
        </PrivateRoute>

        <PrivateRoute exact path="/automate">
          <Automate />
        </PrivateRoute>

        <PrivateRoute exact path="/trade">
          <Trade />
        </PrivateRoute>

        <Route exact path="/backtest">
          <Backtest />
        </Route>

        <Redirect to="/" />
      </Switch>
    </div>
  );
};

export default Routes;
