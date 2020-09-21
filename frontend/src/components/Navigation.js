import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap/";
import ExchangeDropDown from "./ExchangeDropDown";
import "./Navigation.scss";

const Navigation = ({ logout }) => {
  const { user } = useSelector((state) => state.currentUser);

  const loggedInRender = (
    <>
      <Nav className="mr-auto">
        <Nav.Link as={Link} to="/dashboard">
          Dashboard
        </Nav.Link>
        <Nav.Link as={Link} to="/automate">
          Automate
        </Nav.Link>
        <Nav.Link as={Link} to="/trade">
          Trade
        </Nav.Link>
        <Nav.Link as={Link} to="/backtest">
          Backtest
        </Nav.Link>
      </Nav>

      <Nav className="navbar right-side">
        <ExchangeDropDown />

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
