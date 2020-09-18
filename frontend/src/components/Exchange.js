import React from "react";
import { Card, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Exchange.scss";

const Exchange = ({ name, icon }) => {
  return (
    <div className="Exchange">
      <Link to={`/exchanges/${name}`}>
        <Card>
          <Image
            className="exchange-img"
            src={icon}
            alt={name}
            style={{ width: "32px", height: "32px" }}
          />
          <Card.Body>{name}</Card.Body>
        </Card>
      </Link>
    </div>
  );
};

export default Exchange;
