import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  showRebalanceAssetSelectModalInState,
  closeRebalanceAssetSelectModal,
} from "../actions/rebalance";
import { Button } from "react-bootstrap";
import BarTableItem from "./BarTableItem";
import AssetPickerModal from "./AssetPickerModal";
import "./BarTable.scss";
import AssetImage from "./AssetImage";
import Toggle from "./Toggle";

const BarTable = ({ handleEdit, rebalanceStrategyForm, handleAddAsset }) => {
  const { showRebalanceAssetSelectModal } = useSelector((st) => st.rebalance);
  const dispatch = useDispatch();

  const handleShowModal = () => {
    dispatch(showRebalanceAssetSelectModalInState());
  };

  const handleCloseModal = () => dispatch(closeRebalanceAssetSelectModal());

  const addAsset = (e) => {
    handleAddAsset(e.target.value);
  };

  return (
    <div className="barchart-wrapper">
      <div className="barchart-header">
        <Toggle
          handleToggle={handleEdit}
          initialValue={"Edit Strategy"}
          textPrimary={`Edit Strategy`}
          textSecondary={`Cancel`}
        ></Toggle>
        <Button onClick={handleShowModal} className="add-asset-button">
          Add Asset
        </Button>
        <div className="barchart-right-title">
          <div className="barchart-right-title-item">Actual</div>
          <div className="barchart-right-title-item">Target</div>
        </div>
      </div>
      <div className="BarTable">
        {rebalanceStrategyForm.map((bal) => (
          <BarTableItem
            key={bal.symbol}
            asset={bal.symbol}
            icon={<AssetImage symbol={bal.symbol} />}
            targetAllocation={bal.allocationPct}
            actualAllocation={bal.actualPctOfTotal}
          />
        ))}
        <AssetPickerModal
          showModal={showRebalanceAssetSelectModal}
          closeModal={handleCloseModal}
          handleAssetSelect={addAsset}
        />
      </div>
    </div>
  );
};

export default BarTable;
