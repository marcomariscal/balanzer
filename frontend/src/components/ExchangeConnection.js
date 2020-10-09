import React from "react";
import { useParams } from "react-router-dom";
import ExchangeConnectionForm from "./ExchangeConnectionForm";

const ExchangeConnection = () => {
  const { exchangeName } = useParams();

  return (
    <div className="ExchangeConnection text-center justify-content-center">
      <ExchangeConnectionForm exchangeName={exchangeName} />
    </div>
  );
};

export default ExchangeConnection;
