import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { InputGroup, FormControl, Button } from "react-bootstrap";
import {
  showModal as dispatchShowModal,
  closeModal,
  updateModalType,
} from "../actions/trades";
import AssetPickerModal from "./AssetPickerModal";
import "./SwapAsset.scss";

const SwapAsset = ({
  asset,
  type,
  value,
  balance,
  onValueChange,
  onAssetChange,
}) => {
  const { showTradeModal } = useSelector((st) => st.trades);
  const dispatch = useDispatch();

  // handling the modal showing and closing and sending data to store
  const handleShowModal = () => {
    dispatch(dispatchShowModal());
    dispatch(updateModalType(type));
  };
  const handleCloseModal = () => dispatch(closeModal());

  return (
    <div className="SwapAsset">
      <div className="top-wrapper">
        <p>{type === "input" ? "From" : "To (estimate)"}</p>
        <p>Balance: {balance}</p>
      </div>
      <div className="bottom-wrapper">
        <InputGroup className="token-amount">
          <FormControl
            className="token-amount-input"
            placeholder="0.0"
            name={type}
            value={value}
            asset={asset}
            onChange={onValueChange}
          />
        </InputGroup>
        {type === "input" && <Button className="max-button">Max</Button>}
        <Button
          className={
            asset === "Select a token"
              ? "asset-not-selected-button"
              : "asset-select-button"
          }
          onClick={handleShowModal}
        >
          {asset}
        </Button>
      </div>
      <AssetPickerModal
        showModal={showTradeModal}
        closeModal={handleCloseModal}
        handleAssetChange={onAssetChange}
      />
    </div>
  );
};

export default SwapAsset;
