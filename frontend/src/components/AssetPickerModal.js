import React from "react";
import { useSelector } from "react-redux";
import { Modal, Button } from "react-bootstrap";
import AssetImage from "./AssetImage";
import "./AssetPickerModal.scss";

const AssetPickerModal = ({ handleAssetChange, showModal, closeModal }) => {
  const assets = useSelector((st) => st.assets);
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
            <AssetImage symbol={a.symbol} />
            <Button
              name={modalType}
              value={a.symbol}
              onClick={handleAssetChange}
            >
              {a.symbol}
            </Button>
          </div>
        ))}
      </Modal.Body>
    </Modal>
  );
};

export default AssetPickerModal;
