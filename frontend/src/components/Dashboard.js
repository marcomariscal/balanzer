import React from "react";
import { useSelector } from "react-redux";
import Summary from "./Summary";
import BalancesTable from "./BalancesTable";
import BalanceChart from "./BalanceChart";
import Spinner from "./Spinner";
import "./Dashboard.scss";

const Dashboard = () => {
  const { currentAccount, totalBalanceUSD, balances } = useSelector(
    (st) => st.currentUser
  );
  const { loading } = useSelector((st) => st.general);

  if (!currentAccount) {
    return (
      <div className="Dashboard container text-center pt-5">
        <h2>Please connect to an account</h2>
      </div>
    );
  }

  if (!balances.length && !loading) {
    return (
      <div className="Dashboard container text-center pt-5">
        <h2>
          Please deposit funds into your {currentAccount.exchange} account
        </h2>
      </div>
    );
  }

  return (
    <div className="Dashboard container text-center">
      {loading ? (
        <Spinner />
      ) : (
        <>
          <Summary title={totalBalanceUSD} subTitle={"Portfolio Balance"} />

          <div className="balances-table-wrapper mt-3">
            {balances.length ? (
              <>
                <BalancesTable />
                <BalanceChart />
              </>
            ) : null}
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
