import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import PrimaryButton from "./PrimaryButton";
import SwapAsset from "./SwapAsset";
import { submitTradeInAPI } from "../actions/trades";
import "./TradeWidget.scss";

const TradeWidget = () => {
  const dispatch = useDispatch();
  const { accountBalances } = useSelector((st) => st.currentUser);
  const { input, output } = useSelector((st) => st.trades);

  const inputNativeValue = accountBalances.filter(
    (acc) => acc.symbol === input
  );

  console.log(input, inputNativeValue);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("trade submitted");
  };

  //   useEffect(() => {
  //     async function getExchangeValue() {
  //       const outputValue = 1;
  //       return outputValue;
  //       //   dispatch(getExchangeValueFromAPI(input))
  //     }
  //     getExchangeValue();
  //   }, [input, output]);

  //   useEffect(() => {
  //     async function updateTradeDetails() {
  //       dispatch(updateTradeDetails());
  //       //   dispatch(getExchangeValueFromAPI(input))
  //     }
  //     getExchangeValue();
  //   }, [input, output]);

  const derivedNativeValue = 1;

  const submitTrade = (e) => {
    e.preventDefault();

    const data = {};
    dispatch(submitTradeInAPI(data));
    console.log("form submitted");
  };

  return (
    <div className="TradeWidget">
      <form>
        <SwapAsset
          asset={input}
          directionText="From"
          type="input"
          balance={inputNativeValue}
        />
        <SwapAsset
          asset={output}
          type="output"
          directionText="To (estimate)"
          balance={derivedNativeValue}
        />
        <PrimaryButton dispatchFunc={handleSubmit} text="Swap" />
      </form>
    </div>
  );
};

export default TradeWidget;
