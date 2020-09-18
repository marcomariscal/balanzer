import { FETCH_EXCHANGE_ASSETS } from "../actions/types";

const INITIAL_STATE = [];

function sortByExchangeAssetNames(assets) {
  return assets.sort((a, b) => b.asset - a.asset);
}

export default function rootReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_EXCHANGE_ASSETS:
      return sortByExchangeAssetNames([...action.assets]);
    default:
      return state;
  }
}
