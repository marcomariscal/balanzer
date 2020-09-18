import React from "react";
import { useSelector } from "react-redux";
import ExchangeAsset from "./ExchangeAsset";
import Spinner from "./Spinner";

const ExchangeAssets = () => {
  const assets = useSelector((st) => st.assets);
  const { loading } = useSelector((st) => st.general);

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
