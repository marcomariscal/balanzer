import React from "react";
import { useSelector } from "react-redux";
import BacktestAssetPicker from "./BacktestAssetPicker";

const Backtest = () => {
  const { currentAccount } = useSelector((st) => st.currentUser);

  if (!currentAccount) {
    return (
      <div className="Dashboard container text-center pt-5">
        <h2>Please connect to an account</h2>
      </div>
    );
  }
  return (
    <div className="container text-center pt-5">
      <h2>Coming soon...</h2>
      <BacktestAssetPicker />
    </div>
  );
};

export default Backtest;
