import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import {
  showRebalanceAssetSelectModalInState,
  closeRebalanceAssetSelectModal,
} from "../actions/rebalance";
import EditBarTableItem from "./EditBarTableItem";
import AssetImage from "./AssetImage";
import Toggle from "./Toggle";
import AssetPickerModal from "./AssetPickerModal";
import PrimaryButton from "./PrimaryButton";
import "./EditRebalanceStrategyForm.scss";

const EditRebalanceStrategyForm = ({
  cancelEdit,
  rebalanceStrategyForm,
  setRebalanceStrategy,
  handleAddAsset,
  submitStrategy,
}) => {
  const dispatch = useDispatch();
  const { showRebalanceAssetSelectModal } = useSelector((st) => st.rebalance);
  const { loading } = useSelector((st) => st.general);

  // handle invalid form in state
  const [isInvalidForm, setIsInvalidForm] = useState(true);

  const handleChange = (name, value) => {
    // update the resepective asset in state when using the range slider
    setRebalanceStrategy(
      rebalanceStrategyForm.map((detail) =>
        detail.symbol === name
          ? { ...detail, symbol: name, allocationPct: value }
          : detail
      )
    );
  };

  // only handle checking for valid form when the user stop dragging the range input
  const handleChangeComplete = (name, value) => {
    // check new strategy percent total
    const pctTotal = rebalanceStrategyForm.reduce((total, curr) => {
      return total + curr.allocationPct;
    }, 0);

    pctTotal === 100 ? setIsInvalidForm(false) : setIsInvalidForm(true);
  };

  const handleShowModal = () => {
    dispatch(showRebalanceAssetSelectModalInState());
  };

  const handleCloseModal = () => dispatch(closeRebalanceAssetSelectModal());

  const addAsset = (e) => {
    handleAddAsset(e.target.value);
  };

  return (
    <div className="barchart-wrapper">
      <form autoComplete="false">
        <div className="barchart-header">
          <Toggle
            handleToggle={cancelEdit}
            initialValue={"Cancel"}
            textPrimary={`Cancel`}
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
            <EditBarTableItem
              key={bal.symbol}
              asset={bal.symbol}
              icon={<AssetImage symbol={bal.symbol} />}
              targetAllocation={bal.allocationPct}
              actualAllocation={bal.actualPctOfTotal}
              handleChange={handleChange}
              handleChangeComplete={handleChangeComplete}
              name={bal.symbol}
              value={bal.allocationPct}
            />
          ))}
        </div>
        <AssetPickerModal
          showModal={showRebalanceAssetSelectModal}
          closeModal={handleCloseModal}
          handleAssetSelect={addAsset}
        />
        <PrimaryButton
          submitFunc={submitStrategy}
          textDisabled="Percentages must add up to 100%"
          textPrimary="Edit Strategy"
          loadingText="Editing Strategy"
          disabled={isInvalidForm}
          loading={loading}
        />
      </form>
    </div>
  );
};

export default EditRebalanceStrategyForm;
