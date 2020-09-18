import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { InputGroup, FormControl, Button } from "react-bootstrap";
import {
  showModal as dispatchShowModal,
  closeModal,
  tradeSelectInput,
  tradeSelectOutput,
} from "../actions/trades";
import AssetPickerModal from "./AssetPickerModal";
import "./SwapAsset.scss";

const SwapAsset = ({
  asset,
  directionText,
  type,
  balance,
  handleAssetValueChange,
}) => {
  const { showTradeModal } = useSelector((st) => st.trades);
  const dispatch = useDispatch();

  // handling the modal showing and closing and sending data to store
  const handleShowModal = () => dispatch(dispatchShowModal());
  const handleCloseModal = () => dispatch(closeModal());

  // handling when the user selects an asset in the modal
  const handleChooseAsset = (e) => {
    const { value: symbol } = e.target;
    console.log(type === "input");
    type === "input"
      ? dispatch(tradeSelectInput(symbol))
      : dispatch(tradeSelectOutput(symbol));
    closeModal();
  };

  return (
    <div className="SwapAsset">
      <div className="top-wrapper">
        <p>{directionText}</p>
        <p>Balance: {balance}</p>
      </div>
      <div className="bottom-wrapper">
        <InputGroup className="token-amount">
          <FormControl
            className="token-amount-input"
            placeholder="0.0"
            name={type}
            value={handleAssetValueChange}
          />
        </InputGroup>
        {type === "input" && <Button className="max-button">Max</Button>}
        <Button className="asset-select-button" onClick={handleShowModal}>
          {asset}
        </Button>
      </div>
      <AssetPickerModal
        showModal={showTradeModal}
        closeModal={handleCloseModal}
        handleChooseAsset={handleChooseAsset}
      />
    </div>
  );
};

export default SwapAsset;
