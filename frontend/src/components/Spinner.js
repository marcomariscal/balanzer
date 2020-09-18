import React from "react";
import { Spinner as Loading } from "react-bootstrap";

const Spinner = () => {
  return (
    <div className="Spinner">
      <Loading animation="grow" />
    </div>
  );
};

export default Spinner;
