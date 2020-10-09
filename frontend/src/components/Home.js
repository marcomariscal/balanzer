import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import "./Home.scss";

function Home() {
  const { user } = useSelector((st) => st.currentUser);

  return (
    <div className="Home">
      <div className="container text-center justify-content-center">
        <p className="lead">Cryptocurrency Investing Made Easy</p>
        {user ? null : (
          <Button as={Link} className="login-button" to="/login">
            Log in
          </Button>
        )}
      </div>
    </div>
  );
}

export default Home;
