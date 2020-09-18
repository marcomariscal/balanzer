import { FETCH_EXCHANGES } from "../actions/types";

const INITIAL_STATE = [];

function sortByExchangeName(exchanges) {
  return exchanges.sort((a, b) => b.exchange - a.exchange);
}

export default function rootReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_EXCHANGES:
      return sortByExchangeName([...action.exchanges]);
    default:
      return state;
  }
}
