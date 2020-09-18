import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getExchangesFromAPI } from "../actions/exchanges";
import Exchange from "./Exchange";
import Spinner from "./Spinner";
import "./Exchanges.scss";
import { CardDeck } from "react-bootstrap";

const Exchanges = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((st) => st.general);
  const exchanges = useSelector((st) => st.exchanges);

  useEffect(() => {
    async function getExchanges() {
      dispatch(getExchangesFromAPI());
    }
    getExchanges();
  }, [dispatch]);

  return (
    <div className="Exchanges container text-center justify-content-center">
      {loading ? (
        <Spinner />
      ) : (
        <CardDeck>
          {exchanges.length
            ? exchanges.map((e, i) => (
                <Exchange key={i} name={e.exchange} icon={e.icon} />
              ))
            : null}
        </CardDeck>
      )}
    </div>
  );
};

export default Exchanges;
