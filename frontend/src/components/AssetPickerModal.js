import React from "react";
import { useSelector } from "react-redux";
import { getTokenBalance } from "../helpers/balanceHelpers";
import { Modal, Button } from "react-bootstrap";
import AssetImage from "./AssetImage";
import "./AssetPickerModal.scss";

const AssetPickerModal = ({ handleAssetSelect, showModal, closeModal }) => {
  const assets = useSelector((st) => st.assets);
  const { balances } = useSelector((st) => st.currentUser);
  const modalType = useSelector((st) => st.trades.modalType);
  return (
    <Modal
      scrollable={true}
      className="AssetPickerModal"
      show={showModal}
      onHide={closeModal}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Choose Asset</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {assets.map((a) => (
          <div className="asset-picker-modal-row" key={a.id}>
            <Button
              name={modalType}
              value={a.symbol}
              onClick={handleAssetSelect}
            >
              <AssetImage symbol={a.symbol} />
              <span className="symbol mx-1">{a.symbol}</span>
              <span className="token-balance mx-3">
                {getTokenBalance(balances, a.symbol)}
              </span>
            </Button>
          </div>
        ))}
      </Modal.Body>
    </Modal>
  );
};

export default AssetPickerModal;
