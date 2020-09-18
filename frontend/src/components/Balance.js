import React from "react";
import "./Balance.scss";

const Balance = ({ balance }) => {
  return (
    <div className="Balance text-right">
      <p>Current Portfolio Balance</p>
      <p className="total-balance">
        <span>{balance}</span>
      </p>
    </div>
  );
};

export default Balance;
