import React from "react";
import { Spinner as Loading } from "react-bootstrap";

const Spinner = () => {
  return (
    <div className="Spinner">
      <Loading className="loading-icon" animation="grow" />
    </div>
  );
};

export default Spinner;
