import { FETCH_EXCHANGES } from "./types";
import BackendAPI from "../components/BackendAPI";
import { startLoad, stopLoad } from "./general";

export function getExchangesFromAPI() {
  return async function (dispatch) {
    dispatch(startLoad());
    const response = await BackendAPI.getExchanges();
    dispatch(fetchExchanges(response));
    return dispatch(stopLoad());
  };
}

function fetchExchanges(exchanges) {
  return {
    type: FETCH_EXCHANGES,
    exchanges,
  };
}
