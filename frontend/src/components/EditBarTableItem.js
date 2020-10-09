import React, { useState } from "react";
import InputRange from "react-input-range";
import "./EditBarTableItem.scss";
import "react-input-range/lib/css/index.css";

const EditBarTableItem = ({
  asset,
  icon,
  targetAllocation,
  actualAllocation,
  name,
  value,
  handleChange,
  handleChangeComplete,
}) => {
  const [data, setData] = useState({
    name,
    value: targetAllocation,
  });

  const onChange = (value) => {
    setData((fData) => ({ ...fData, value }));
    handleChange(name, value);
  };

  return (
    <div className="EditBarTableItem">
      <div className="title">
        <div>{icon}</div>
        <div>{asset}</div>
      </div>
      <div className="bar">
        <InputRange
          maxValue={100}
          minValue={0}
          name={name}
          value={data.value}
          onChange={onChange}
          onChangeComplete={handleChangeComplete}
        />
      </div>
      <div className="bar-value">
        <div className="bar-actual-value">{`${actualAllocation}%`}</div>
        <div className="bar-target-value">{`${value}%`}</div>
      </div>
    </div>
  );
};

export default EditBarTableItem;
