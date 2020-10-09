import React from "react";
import { useSelector } from "react-redux";
import "./Balance.scss";

const Balance = () => {
  const { totalBalanceUSD } = useSelector((st) => st.currentUser);
  return (
    <div className="Balance text-right">
      <p>Portfolio Balance</p>
      <p className="total-balance">
        <span>{totalBalanceUSD}</span>
      </p>
    </div>
  );
};

export default Balance;
