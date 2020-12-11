import React, { useState, useEffect } from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
// import _ from "lodash";
import { getExchangeRateValue } from "../helpers/exchangeRates";
import PrimaryButton from "./PrimaryButton";
import SwapAsset from "./SwapAsset";
import Spinner from "./Spinner";
import Alert from "./Alert";
import { submitTradeInAPI, closeModal } from "../actions/trades";
import { getTokenBalance } from "../helpers/balanceHelpers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";
import "./TradeWidget.scss";

const TradeWidget = () => {
  const dispatch = useDispatch();
  const { balances } = useSelector((st) => st.currentUser);
  const { submittingTrade } = useSelector((st) => st.trades);
  const { loading } = useSelector((st) => st.general);

  const currentUser = useSelector((st) => st.currentUser, shallowEqual);

  const [tradeDetails, setTradeDetails] = useState({
    input: { asset: "ETH", value: "0.0" },
    output: { asset: "Select a token", value: "0.0" },
    tradeErrors: [],
  });

  const [isInvalidForm, setIsInvalidForm] = useState(true);

  const { input, output } = tradeDetails;

  // delay the conversion function on user input
  // const delayedGetExchangeRateValue = useCallback(
  //   _.debounce(getExchangeRateValue, 3000),
  //   [input.asset, input.value, output.asset]
  // );

  const handleSubmit = (e) => {
    e.preventDefault();

    // submit with proper trade details
    const trade = {
      userId: currentUser.shrimpy_user_id,
      accountId: currentUser.currentAccount.id,
      fromSymbol: input.asset,
      toSymbol: output.asset,
      amount: input.value,
    };

    try {
      dispatch(
        submitTradeInAPI(
          currentUser.user.username,
          currentUser.currentAccount.id,
          trade
        )
      );
    } catch (errors) {
      setTradeDetails((trade) => ({
        ...trade,
        tradeErrors: [errors],
      }));
    }
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
    setIsInvalidForm(false);
  };

  const inputBalance = balances
    ? getTokenBalance(balances, tradeDetails.input.asset)
    : 0;

  const outputBalance = balances
    ? getTokenBalance(balances, tradeDetails.output.asset)
    : 0;

  useEffect(() => {
    async function getOutputValue() {
      if (!isInvalidForm) {
        const value = await getExchangeRateValue(
          input.asset,
          output.asset,
          input.value,
          currentUser.currentAccount.exchange
        );

        setTradeDetails((fData) => ({
          ...fData,
          output: { ...output, value },
        }));
      }
    }
    getOutputValue();
  }, [input.asset, input.value, currentUser, isInvalidForm, output.asset]);

  if (!balances.length && !loading) {
    return (
      <div className="container text-center">
        <h2>
          Please deposit funds into your {currentUser.currentAccount.exchange}{" "}
          account
        </h2>
      </div>
    );
  }

  return loading ? (
    <Spinner />
  ) : (
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

        <div
          className={`arrow-break my-2 ${isInvalidForm ? "invalid" : "valid"}`}
        >
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

        {tradeDetails.tradeErrors.length ? (
          <Alert danger="danger" messages={tradeDetails.tradeErrors} />
        ) : null}

        <PrimaryButton
          submitFunc={handleSubmit}
          textDisabled="Swap"
          textPrimary="Swap"
          loadingText="Swapping..."
          disabled={isInvalidForm}
          loading={submittingTrade}
        />
      </form>
    </div>
  );
};

export default TradeWidget;
