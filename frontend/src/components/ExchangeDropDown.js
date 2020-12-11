import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { NavDropdown, Image } from "react-bootstrap";
import {
  syncUserData,
  updateCurrentAccountInState,
} from "../actions/currentUser";
import "./ExchangeDropDown.scss";

const ExchangeDropDown = () => {
  const dispatch = useDispatch();

  const { accounts, currentAccount, user } = useSelector(
    (st) => st.currentUser
  );

  const updateCurrentAccount = (e) => {
    const accountId = e;
    const updatedAccount = accounts.filter((a) => a.id === accountId);
    dispatch(updateCurrentAccountInState(updatedAccount));
    dispatch(syncUserData(user.username, accountId));
  };

  const notCurrentAccounts =
    accounts &&
    currentAccount &&
    accounts.filter((a) => a.id !== currentAccount.id);

  const accountsWithoutCurrentRender = notCurrentAccounts
    ? notCurrentAccounts.map((a) => (
        <NavDropdown.Item
          key={a.id}
          eventKey={a.id}
          title={a.exchange}
          className="text-center my-1"
          value={a.exchange}
        >
          <Image
            className="exchange-img mr-3"
            alt={a.exchange}
            style={{ width: "18px", height: "18px" }}
            src={`https://assets.shrimpy.io/exchanges/${a.exchange.toLowerCase()}.png`}
          />
          <span>
            {a.exchange} <small>{a.id}</small>
          </span>
        </NavDropdown.Item>
      ))
    : null;

  const render = (
    <div className="ExchangeDropDown">
      {currentAccount.exchange ? (
        <NavDropdown
          title={currentAccount.exchange}
          id="collasible-nav-dropdown"
          onSelect={updateCurrentAccount}
        >
          {accountsWithoutCurrentRender}
          <NavDropdown.Item as={Link} to="/exchanges" className="text-center">
            + Add Account
          </NavDropdown.Item>
        </NavDropdown>
      ) : (
        <NavDropdown title="Add Exchange" id="collasible-nav-dropdown">
          <NavDropdown.Item as={Link} to="/exchanges" className="text-center">
            + Add Account
          </NavDropdown.Item>
        </NavDropdown>
      )}
    </div>
  );

  return render;
};

export default ExchangeDropDown;
