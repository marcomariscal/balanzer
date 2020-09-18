import React from "react";
import { useSelector } from "react-redux";
import { Modal, Button } from "react-bootstrap";
import AssetImage from "./AssetImage";
import "./AssetPickerModal.scss";

const AssetPickerModal = ({ handleChooseAsset, showModal, closeModal }) => {
  const assets = useSelector((st) => st.assets);
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
            <Button value={a.symbol} onClick={handleChooseAsset}>
              {a.symbol}
            </Button>
          </div>
        ))}
      </Modal.Body>
    </Modal>
  );
};

export default AssetPickerModal;
