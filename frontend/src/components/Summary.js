import React from "react";
import Spinner from "./Spinner";
import "./Summary.scss";

const Summary = ({ loading, title, subTitle }) => {
  return (
    <div className="Summary">
      <>
        <div className="subtitle">{subTitle}</div>
        {loading ? <Spinner /> : <div className="title">{title}</div>}
      </>
    </div>
  );
};

export default Summary;
