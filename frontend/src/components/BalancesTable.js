import React, { useState } from "react";
import { useSelector } from "react-redux";
import { formatUSD, formatNative } from "../helpers/currencyHelpers";
import { Table } from "react-bootstrap";
import TableItem from "./TableItem";
import Toggle from "./Toggle";
import "./BalancesTable.scss";

const BalancesTable = () => {
  const [usdValueSelected, toggleUsdValueSelected] = useState(true);
  const { balances } = useSelector((st) => st.currentUser);

  const tableRender =
    balances &&
    balances.map((bal) => (
      <TableItem
        key={bal.symbol}
        symbol={bal.symbol}
        value={
          usdValueSelected
            ? formatUSD(bal.usdValue)
            : formatNative(bal.nativeValue)
        }
      />
    ));

  const handleToggleUSD = () => {
    toggleUsdValueSelected(!usdValueSelected);
  };

  return (
    <div className="BalancesTable">
      <Toggle
        handleToggle={handleToggleUSD}
        initialValue={usdValueSelected}
        textPrimary={`Toggle Native`}
        textSecondary={`Toggle USD`}
      ></Toggle>
      <Table>
        <thead>
          <tr className="thead-tr">
            <th>Symbol</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>{tableRender}</tbody>
      </Table>
    </div>
  );
};

export default BalancesTable;
