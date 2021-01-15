import React from "react";
import { useSelector } from "react-redux";
import TradeWidget from "./TradeWidget";

const Trade = () => {
  const { currentAccount } = useSelector((st) => st.currentUser);

  if (!currentAccount) {
    return (
      <div className="Dashboard container text-center pt-5">
        <h2>Please connect to an account</h2>
      </div>
    );
  }

  return (
    <div className="Trade pt-5 text-center justify-content-center">
      <TradeWidget />
    </div>
  );
};

export default Trade;
