import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import "./Login.scss";
import PrimaryButton from "./PrimaryButton";
import { registerUserWithAPI, loginUserWithAPI } from "../actions/currentUser";
import BackendApi from "./BackendAPI";
import { showErrors } from "../actions/general";

function Login({ setToken }) {
  const dispatch = useDispatch();
  const history = useHistory();

  const [isLoading, setIsLoading] = useState(false);
  const [activeView, setActiveView] = useState("login");
  const [loginInfo, setLoginInfo] = useState({
    username: "",
    password: "",
    email: "",
    formErrors: [],
  });

  function setLoginView() {
    setActiveView("login");
  }

  function setSignupView() {
    setActiveView("signup");
  }

  async function handleSubmit(e) {
    e.preventDefault();
    let data;
    let endpoint;

    if (activeView === "signup") {
      data = {
        username: loginInfo.username,
        password: loginInfo.password,
        email: loginInfo.email,
      };
      endpoint = "register";
    } else {
      data = {
        username: loginInfo.username,
        password: loginInfo.password,
      };
      endpoint = "login";
    }

    let res;
    setIsLoading(true);
    try {
      if (endpoint === "login") {
        res = await BackendApi.login(data);
        dispatch(loginUserWithAPI(data));
      } else {
        res = await BackendApi.register(data);
        dispatch(registerUserWithAPI(data));
      }

      setToken(res.token);
      setIsLoading(false);
      history.push("/dashboard");
    } catch (errors) {
      setIsLoading(false);
      dispatch(showErrors(errors));
      return setLoginInfo((l) => ({ ...l, formErrors: errors }));
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setLoginInfo((l) => ({ ...l, [name]: value }));
  }

  let loginActive = activeView === "login";

  const signupFields = (
    <div>
      <div className="form-group">
        <label>Email</label>
        <input
          type="email"
          name="email"
          className="form-control"
          value={loginInfo.email}
          onChange={handleChange}
        />
      </div>
    </div>
  );

  return (
    <div className="Login">
      <div className="login-signup-buttons">
        <div className="btn-group">
          <button
            className={`btn btn-login ${loginActive ? "active" : ""} `}
            onClick={setLoginView}
          >
            Login
          </button>
          <button
            className={`btn btn-signup ${loginActive ? "" : "active"} `}
            onClick={setSignupView}
          >
            Sign up
          </button>
        </div>
      </div>
      <div className="card">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Username</label>
              <input
                name="username"
                className="form-control"
                value={loginInfo.username}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                className="form-control"
                value={loginInfo.password}
                onChange={handleChange}
              />
            </div>
            {loginActive ? "" : signupFields}

            <PrimaryButton
              submitFunc={handleSubmit}
              textDisabled={loginActive ? "Log in" : "Sign Up"}
              textPrimary={loginActive ? "Log in" : "Sign Up"}
              loadingText={loginActive ? "Logging in" : "Signing Up"}
              disabled={false}
              loading={isLoading}
            />
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
