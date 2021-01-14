import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { decode } from "jsonwebtoken";
import useLocalStorage from "./hooks/useLocalStorage";
import Navigation from "./Navigation";
import Routes from "./Routes";
import "./App.scss";
import { logoutUserInState, syncUserData } from "../actions/currentUser";
import SocialLogos from "./SocialLogos";
import Toast from "./Toast";

export const TOKEN_STORAGE_ID = "cfinance-token";

function App() {
  const dispatch = useDispatch();
  const [token, setToken] = useLocalStorage(TOKEN_STORAGE_ID);

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
      <p className="text-center lead mt-3">
        This project is in beta. Use at your own risk.
      </p>
      <Routes setToken={setToken} />
      <SocialLogos />
      <Toast />
    </div>
  );
}

export default App;
