import { FETCH_EXCHANGE_ASSETS } from "./types";
import BackendAPI from "../components/BackendAPI";
import { startLoad, stopLoad } from "./general";

export function getExchangeAssetsFromAPI(exchange) {
  return async function (dispatch) {
    dispatch(startLoad());
    try {
      const response = await BackendAPI.getExchangeAssets(exchange);
      dispatch(fetchExchangeAssets(response));
      return dispatch(stopLoad());
    } catch (error) {
      dispatch(stopLoad());
    }
  };
}

function fetchExchangeAssets(assets) {
  return {
    type: FETCH_EXCHANGE_ASSETS,
    assets,
  };
}
