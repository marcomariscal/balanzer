import { FETCH_EXCHANGE_ASSETS, LOGOUT_CURRENT_USER } from "../actions/types";
import { sortByAssetSymbol } from "./helpers/helpers";

const INITIAL_STATE = [];

export default function rootReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_EXCHANGE_ASSETS:
      return sortByAssetSymbol([...action.assets]);
    case LOGOUT_CURRENT_USER:
      return INITIAL_STATE;
    default:
      return state;
  }
}
