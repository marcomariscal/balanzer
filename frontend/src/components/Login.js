import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import "./Login.scss";
import Alert from "./Alert";
import { registerUserWithAPI, loginUserWithAPI } from "../actions/currentUser";
import BackendApi from "./BackendAPI";

function Login({ setToken }) {
  const dispatch = useDispatch();
  const history = useHistory();

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

    try {
      if (endpoint === "login") {
        res = await BackendApi.login(data);
        dispatch(loginUserWithAPI(data));
      } else {
        res = await BackendApi.register(data);
        dispatch(registerUserWithAPI(data));
      }

      setToken(res.token);
      history.push("/dashboard");
    } catch (errors) {
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
      <div className="container col-md-6 offset-md-3 col-lg-4 offset-lg-4">
        <div className="d-flex justify-content-end">
          <div className="btn-group">
            <button
              className={`btn btn-dark ${loginActive ? "active" : ""} `}
              onClick={setLoginView}
            >
              Login
            </button>
            <button
              className={`btn btn-outline-dark ${loginActive ? "" : "active"} `}
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
              {loginInfo.formErrors.length ? (
                <Alert type="danger" messages={loginInfo.formErrors} />
              ) : null}

              <button
                type="submit"
                className="btn btn-dark float-right"
                onSubmit={handleSubmit}
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
