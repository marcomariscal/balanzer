import React from "react";
import "./BarTableItem.scss";

const BarTableItem = ({ asset, icon, targetAllocation, actualAllocation }) => {
  return (
    <div className="BarTableItem">
      <div className="title">
        <div>{icon}</div>
        <div>{asset}</div>
      </div>
      <div className="bar">
        <div
          className="bar-fill"
          style={{ width: `${actualAllocation}%` }}
        ></div>
      </div>
      <div className="bar-value">
        <div className="bar-actual-value">{`${actualAllocation}%`}</div>
        <div className="bar-target-value">{`${targetAllocation}%`}</div>
      </div>
    </div>
  );
};

export default BarTableItem;
