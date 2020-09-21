import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import _ from "lodash";
import { getExchangeRateValue } from "../helpers/exchangeRates";
import PrimaryButton from "./PrimaryButton";
import SwapAsset from "./SwapAsset";
import { submitTradeInAPI, closeModal } from "../actions/trades";
import { getTokenBalance } from "../helpers/balanceHelpers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";
import "./TradeWidget.scss";

const TradeWidget = () => {
  const dispatch = useDispatch();
  const { balances } = useSelector((st) => st.currentUser);
  const { currentAccount } = useSelector((st) => st.currentUser);

  const [tradeDetails, setTradeDetails] = useState({
    input: { asset: "ETH", value: "0.0" },
    output: { asset: "Select a token", value: "0.0" },
  });

  const [isInvalidForm, setIsInvalidForm] = useState(true);

  const { input, output } = tradeDetails;

  // delay the conversion function on user input
  const delayedGetExchangeRateValue = useCallback(
    _.debounce(getExchangeRateValue, 3000),
    [input.asset, input.value, output.asset]
  );

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
    setIsInvalidForm(false);
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

  const handleMaxValueSelect = (e) => {
    setTradeDetails((fData) => ({
      ...fData,
      input: {
        ...input,
        value: getTokenBalance(balances, input.asset),
      },
    }));
  };

  const inputBalance = getTokenBalance(balances, tradeDetails.input.asset);
  const outputBalance = getTokenBalance(balances, tradeDetails.output.asset);

  useEffect(() => {
    async function getOutputValue() {
      if (!isInvalidForm) {
        const value = await getExchangeRateValue(
          input.asset,
          output.asset,
          input.value,
          currentAccount.exchange
        );

        setTradeDetails((fData) => ({
          ...fData,
          output: { ...output, value },
        }));
      }
    }
    getOutputValue();
  }, [input.asset, output.asset, input.value]);

  return (
    <div className="TradeWidget">
      <form autoComplete="off">
        <SwapAsset
          asset={input.asset}
          type={"input"}
          value={input.value}
          balance={inputBalance}
          onValueChange={handleValueChange}
          onAssetChange={handleAssetChange}
          onMaxValueSelect={handleMaxValueSelect}
        />

        <div className="arrow-break my-2">
          <FontAwesomeIcon icon={faArrowDown} />
        </div>

        <SwapAsset
          asset={output.asset}
          type={"output"}
          value={output.value}
          balance={outputBalance}
          onValueChange={handleValueChange}
          onAssetChange={handleAssetChange}
          disabled={true}
        />
        <PrimaryButton
          dispatchFunc={handleSubmit}
          text="Swap"
          disabled={isInvalidForm}
        />
      </form>
    </div>
  );
};

export default TradeWidget;
