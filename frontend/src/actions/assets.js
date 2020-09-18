import { FETCH_EXCHANGE_ASSETS } from "./types";
import BackendAPI from "../components/BackendAPI";

export function getExchangeAssetsFromAPI(exchange) {
  return async function (dispatch) {
    const response = await BackendAPI.getExchangeAssets(exchange);
    return dispatch(fetchExchangeAssets(response));
  };
}

function fetchExchangeAssets(assets) {
  return {
    type: FETCH_EXCHANGE_ASSETS,
    assets,
  };
}
