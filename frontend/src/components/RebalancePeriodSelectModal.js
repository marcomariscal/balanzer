import React from "react";
import { Modal, Button } from "react-bootstrap";
import { rebalancePeriodTimeframes } from "../helpers/timeframes";
import "./RebalancePeriodSelectModal.scss";

const RebalancePeriodSelectModal = ({
  handleSubmit,
  showModal,
  closeModal,
}) => {
  return (
    <Modal
      scrollable={true}
      className="RebalancePeriodSelectModal"
      show={showModal}
      onHide={closeModal}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Choose Rebalance Period</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {[...rebalancePeriodTimeframes.values()].map((val) => (
          <div className="asset-picker-modal-row" key={val}>
            <Button name={val} value={val} onClick={handleSubmit}>
              <span className="symbol mx-1">{val}</span>
            </Button>
          </div>
        ))}
      </Modal.Body>
    </Modal>
  );
};

export default RebalancePeriodSelectModal;
