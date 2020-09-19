import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAccountBalancesFromAPI } from "../actions/currentUser";
import Balance from "./Balance";
import BalancesTable from "./BalancesTable";
import BalanceHistoryChart from "./BalanceHistoryChart";
import Spinner from "./Spinner";

const Exchanges = () => {
  const { currentAccount, totalBalanceUSD, user } = useSelector(
    (st) => st.currentUser
  );
  const { loading } = useSelector((st) => st.general);

  const dispatch = useDispatch();

  useEffect(() => {
    async function getAccountBalances() {
      if (currentAccount) {
        dispatch(
          getAccountBalancesFromAPI(user.username, currentAccount.exchange)
        );
      }
    }
    getAccountBalances();
  }, []);

  if (!currentAccount) {
    return (
      <div className="Dashboard container">
        <p>Please connect to an account</p>
      </div>
    );
  }

  return (
    <div className="Dashboard container">
      {loading ? (
        <Spinner />
      ) : (
        <>
          <Balance balance={totalBalanceUSD} />
          <BalancesTable />
          <BalanceHistoryChart />
        </>
      )}
    </div>
  );
};

export default Exchanges;
