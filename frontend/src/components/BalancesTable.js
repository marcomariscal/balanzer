import React, { useState } from "react";
import { useSelector } from "react-redux";
import { formatUSD } from "../helpers/currencyHelpers";
import { Table } from "react-bootstrap";
import TableItem from "./TableItem";
import "./BalancesTable.scss";

const BalancesTable = () => {
  const [usdValueSelected, toggleUsdValueSelected] = useState(true);
  const { currAccountBalances } = useSelector((st) => st.userAccounts);

  const tableRender = currAccountBalances.map((bal) => (
    <TableItem
      key={bal.symbol}
      symbol={bal.symbol}
      value={usdValueSelected ? formatUSD(bal.usdValue) : bal.nativeValue}
    />
  ));

  const handleToggleBalanceType = () => {
    toggleUsdValueSelected(!usdValueSelected);
  };

  return (
    <div className="BalancesTable text-center justify-content-center align-items-center">
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
