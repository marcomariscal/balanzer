import { FETCH_BACKTEST_ASSETS } from "../actions/types";
import { sortByAssetSymbol } from "./helpers/helpers";

const INITIAL_STATE = { backtestAssets: null };

export default function rootReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_BACKTEST_ASSETS:
      return {
        ...state,
        backtestAssets: sortByAssetSymbol([...action.assets]),
      };
    default:
      return state;
  }
}
