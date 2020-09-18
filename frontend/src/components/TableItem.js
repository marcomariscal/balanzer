import React from "react";
import AssetImage from "./AssetImage";
import "./TableItem.scss";

const TableItem = ({ symbol, value }) => {
  return (
    <tr className="TableItem">
      <td>
        <AssetImage symbol={symbol} />
        <span>{symbol}</span>
      </td>
      <td>{value}</td>
    </tr>
  );
};

export default TableItem;
