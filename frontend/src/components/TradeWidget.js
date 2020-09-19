import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import PrimaryButton from "./PrimaryButton";
import SwapAsset from "./SwapAsset";
import { submitTradeInAPI, closeModal } from "../actions/trades";
import { getTokenBalance } from "../helpers/balanceHelpers";
import "./TradeWidget.scss";

const TradeWidget = () => {
  const dispatch = useDispatch();
  const { balances } = useSelector((st) => st.currentUser);

  const [tradeDetails, setTradeDetails] = useState({
    input: { asset: "ETH", value: "0.0" },
    output: { asset: "Select a token", value: "0.0" },
  });

  const { input, output } = tradeDetails;

  const handleSubmit = (e) => {
    e.preventDefault();
    const tradeDetails = {};
    dispatch(submitTradeInAPI(tradeDetails));
    console.log("trade submitted");
  };

  const handleValueChange = (e) => {
    const { name, value } = e.target;

    setTradeDetails((fData) => ({
      ...fData,
      [name]: {
        ...fData[name],
        value: value,
      },
    }));
  };

  const handleAssetChange = (e) => {
    const { name, value } = e.target;
    setTradeDetails((fData) => ({
      ...fData,
      [name]: {
        ...fData[name],
        asset: value,
      },
    }));
    dispatch(closeModal());
  };
  const inputBalance = getTokenBalance(balances, tradeDetails.input.asset);
  const outputBalance = getTokenBalance(balances, tradeDetails.output.asset);

  useEffect(() => {
    function updateBalances() {
      const outputBalance = getTokenBalance(balances, output.asset);
    }
    updateBalances();
  }, [input.asset, output.asset]);

  return (
    <div className="TradeWidget">
      <form>
        <SwapAsset
          asset={input.asset}
          type={"input"}
          value={input.value}
          balance={inputBalance}
          onValueChange={handleValueChange}
          onAssetChange={handleAssetChange}
        />
        <SwapAsset
          asset={output.asset}
          type={"output"}
          value={output.value}
          balance={outputBalance}
          onValueChange={handleValueChange}
          onAssetChange={handleAssetChange}
        />
        <PrimaryButton dispatchFunc={handleSubmit} text="Swap" />
      </form>
    </div>
  );
};

export default TradeWidget;
