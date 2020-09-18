import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import { useSelector } from "react-redux";

function Home() {
  const { user } = useSelector((st) => st.currentUser);

  return (
    <div className="Home">
      <div className="container text-center">
        <h1 className="mb-4 font-weight-bold">CFinance</h1>
        <p className="lead">Cryptocurrency Investing Made Easy</p>
        {user.username ? (
          <h2>Welcome Back {user.username}!</h2>
        ) : (
          <Link className="btn btn-outline-dark font-weight-bold" to="/login">
            Log in
          </Link>
        )}
      </div>
    </div>
  );
}

export default Home;
