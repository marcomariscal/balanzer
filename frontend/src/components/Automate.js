import React from "react";
import { useSelector } from "react-redux";
import ExchangeAssets from "./ExchangeAssets";

const Automate = () => {
  const { currentAccount } = useSelector((st) => st.currentUser);

  return (
    <div className="text-center">
      {currentAccount ? (
        <ExchangeAssets />
      ) : (
        <h2>
          Please add an exchange connection to automate portfolio rebalancing
        </h2>
      )}
    </div>
  );
};

export default Automate;
