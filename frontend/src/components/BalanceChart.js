import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getBalanceHistoryFromAPI } from "../actions/currentUser";
import { LineChart, Line, XAxis, Tooltip } from "recharts";

import "./BalanceChart.scss";

const BalanceChart = () => {
  const timeframes = ["D", "W", "M", "Y", "All"];
  const { balanceHistory, user, currentAccount } = useSelector(
    (st) => st.currentUser
  );
  const [timeframe, setTimeframe] = useState("All");
  const dispatch = useDispatch();

  const handleChange = (e) => {
    e.persist();
    setTimeframe(e.target.value);
  };

  useEffect(() => {
    dispatch(
      getBalanceHistoryFromAPI(user.username, currentAccount.id, timeframe)
    );
  }, [dispatch, timeframe, currentAccount.id, user.username]);

  const periodMenuRender = (
    <div className="period-menu">
      <div>Portfolio Performance</div>
      <div className="period-menu-switcher">
        {timeframes.map((t, i) => (
          <button
            key={i}
            className={`timeframe-button ${timeframe === t ? "active" : ""}`}
            onClick={handleChange}
            value={t}
          >
            {t}
          </button>
        ))}
      </div>
    </div>
  );

  const renderChart = (
    <LineChart
      data={balanceHistory}
      margin={{ right: 5, left: 5 }}
      width={500}
      height={250}
    >
      <XAxis dataKey="date" />
      <Tooltip />
      <Line type="monotone" dataKey="usdValue" stroke="#00d897" />
    </LineChart>
  );

  return (
    <div className="BalanceChart">
      {periodMenuRender}
      {renderChart}
    </div>
  );
};

export default BalanceChart;
