import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap/";
import ExchangeDropDown from "./ExchangeDropDown";
import SettingsDropDown from "./SettingsDropDown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLayerGroup,
  faExchangeAlt,
  faDatabase,
  faBolt,
} from "@fortawesome/free-solid-svg-icons";
import "./Navigation.scss";

const Navigation = ({ logout }) => {
  const { user } = useSelector((state) => state.currentUser);

  const loggedInRender = (
    <>
      <Nav className="mr-auto">
        <Nav.Link as={Link} to="/dashboard">
          <span>
            <FontAwesomeIcon className="mr-1" icon={faLayerGroup} />
          </span>
          Dashboard
        </Nav.Link>
        <Nav.Link as={Link} to="/automate">
          <span>
            <FontAwesomeIcon className="mr-1" icon={faBolt} />
          </span>
          Automate
        </Nav.Link>
        <Nav.Link as={Link} to="/trade">
          <span>
            <FontAwesomeIcon className="mr-1" icon={faExchangeAlt} />
          </span>
          Trade
        </Nav.Link>
        <Nav.Link as={Link} to="/backtest">
          <span>
            <FontAwesomeIcon className="mr-1" icon={faDatabase} />
          </span>
          Backtest
        </Nav.Link>
      </Nav>

      <Nav className="navbar right-side">
        <ExchangeDropDown />

        <SettingsDropDown />

        <Nav.Link as={Link} to="/logout" onClick={logout}>
          Logout
        </Nav.Link>
      </Nav>
    </>
  );

  const loggedOutRender = (
    <Nav className="ml-auto">
      <Nav.Link as={Link} to="/login">
        Login
      </Nav.Link>
    </Nav>
  );

  return (
    <div className="Navigation">
      <Navbar>
        <Navbar.Brand as={Link} to="/">
          CFinance
        </Navbar.Brand>
        {user ? loggedInRender : loggedOutRender}
      </Navbar>
    </div>
  );
};

export default Navigation;
