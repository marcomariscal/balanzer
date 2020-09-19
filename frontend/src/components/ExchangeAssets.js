import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getExchangeAssetsFromAPI } from "../actions/assets";
import ExchangeAsset from "./ExchangeAsset";
import Spinner from "./Spinner";

const ExchangeAssets = () => {
  const dispatch = useDispatch();

  const assets = useSelector((st) => st.assets);
  const { currentAccount } = useSelector((st) => st.currentUser);
  const { loading } = useSelector((st) => st.general);

  useEffect(() => {
    async function getAssets() {
      dispatch(getExchangeAssetsFromAPI(currentAccount.exchange));
    }
    getAssets();
  }, [currentAccount, dispatch]);

  return (
    <div>
      {loading ? (
        <Spinner />
      ) : (
        assets.map((a) => (
          <ExchangeAsset key={a.id} name={a.name} icon={a.icon} />
        ))
      )}
    </div>
  );
};

export default ExchangeAssets;
