import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Spinner from "./Spinner";
import ExchangeConnectionForm from "./ExchangeConnectionForm";

const ExchangeConnection = () => {
  const { exchangeName } = useParams();
  const { loading } = useSelector((st) => st.general);

  return (
    <div className="ExchangeConnection text-center justify-content-center">
      {loading ? (
        <Spinner />
      ) : (
        <ExchangeConnectionForm exchangeName={exchangeName} />
      )}
    </div>
  );
};

export default ExchangeConnection;
