import { FETCH_EXCHANGE_ASSETS, LOGOUT_CURRENT_USER } from "../actions/types";

const INITIAL_STATE = [];

function sortByExchangeAssetSymbols(assets) {
  return assets.sort((a, b) => b.symbol - a.symbol);
}

export default function rootReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_EXCHANGE_ASSETS:
      return sortByExchangeAssetSymbols([...action.assets]);
    case LOGOUT_CURRENT_USER:
      return INITIAL_STATE;
    default:
      return state;
  }
}
