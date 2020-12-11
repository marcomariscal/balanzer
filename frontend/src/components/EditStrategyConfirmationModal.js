import React from "react";

const EditStrategyConfirmationModal = () => {
  const { rebalanceStrategy } = useSelector((st) => st.currentUser);

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

export default EditStrategyConfirmationModal;
