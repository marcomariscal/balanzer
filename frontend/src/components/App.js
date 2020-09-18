import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { decode } from "jsonwebtoken";
import useLocalStorage from "./hooks/useLocalStorage";
import Navigation from "./Navigation";
import Routes from "./Routes";
import "./App.scss";
import { logoutUserInState, syncUserData } from "../actions/currentUser";
import { getExchangeAssetsFromAPI } from "../actions/assets";

export const TOKEN_STORAGE_ID = "cfinance-token";

function App() {
  const dispatch = useDispatch();

  const { token } = useSelector((st) => st.currentUser);

  const { currentAccount } = useSelector((st) => st.currentUser);

  useEffect(() => {
    async function syncUserInfo() {
      if (token) {
        const { username } = decode(token);
        dispatch(syncUserData(username));
      }
    }
    syncUserInfo();
  }, [token, dispatch]);

  const handleLogout = () => {
    dispatch(logoutUserInState());
    setToken(null);
  };

  return (
    <div className="App">
      <Navigation logout={handleLogout} />
      <Routes setToken={setToken} />
    </div>
  );
}

export default App;
