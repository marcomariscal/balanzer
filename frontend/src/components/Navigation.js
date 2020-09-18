import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap/";
import ExchangeDropDown from "./ExchangeDropDown";

const Navigation = ({ logout }) => {
  const { username } = useSelector((state) => state.currentUser.user);

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

      <Nav className="ml-auto">
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
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand as={Link} to="/">
          CFinance
        </Navbar.Brand>
        {username ? loggedInRender : loggedOutRender}
      </Navbar>
    </div>
  );
};

export default Navigation;
