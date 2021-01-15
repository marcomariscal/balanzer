import { FETCH_EXCHANGES } from "../actions/types";
import { sortByExchangeName } from "./helpers/helpers";

const INITIAL_STATE = [];

export default function rootReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_EXCHANGES:
      return sortByExchangeName([...action.exchanges]);
    default:
      return state;
  }
}
