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
    <div className="BalancesTable text-center justify-content-center align-items-center">
      <Toggle
        handleToggle={handleToggleUSD}
        initialValue={usdValueSelected}
        textPrimary="USD"
        textSecondary="Native"
      />
      <Table>
        <thead>
          <tr>
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
