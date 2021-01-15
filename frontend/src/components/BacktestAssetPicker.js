import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getBacktestAssetsFromAPI } from "../actions/backtest";

const BacktestAssetPicker = () => {
  const exchange = useSelector((st) => st.currentUser.currentAccount.exchange);
  const backtestAssets = useSelector((st) => st.backtest.backtestAssets);
  const dispatch = useDispatch();

  //   useEffect(() => {
  //     async function getAssets() {
  //       dispatch(getBacktestAssetsFromAPI(exchange));
  //     }
  //     getAssets();
  //   }, []);
  return (
    <div>{backtestAssets && backtestAssets.map((a) => <p>{a.symbol}</p>)}</div>
  );
};

export default BacktestAssetPicker;
