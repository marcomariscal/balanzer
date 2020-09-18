import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { NavDropdown } from "react-bootstrap";
import { updateCurrentAccountInState } from "../actions/currentUser";

const ExchangeDropDown = () => {
  const dispatch = useDispatch();

  const { accounts, currentAccount, notCurrentAccounts } = useSelector(
    (st) => st.currentUser
  );

  const updateCurrentAccount = (e) => {
    const accountName = e.target.value;
    dispatch(updateCurrentAccountInState(accountName));
  };

  const accountsWithoutCurrentRender = notCurrentAccounts.map((a) => (
    <NavDropdown.Item
      key={a.id}
      onClick={updateCurrentAccount}
      title={a.exchange}
      className="text-center"
      value={a.exchange}
    >
      {a.exchange}
    </NavDropdown.Item>
  ));

  const render =
    currentAccount && accounts.length ? (
      <NavDropdown title={currentAccount.exchange} id="collasible-nav-dropdown">
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
    );

  return render;
};

export default ExchangeDropDown;
