import { FETCH_EXCHANGE } from "../actions/types";

export default function rootReducer(state = {}, action) {
  switch (action.type) {
    case FETCH_EXCHANGES:
      return { ...state, [action.exchange.exchange_id]: action.exchange };

    default:
      return state;
  }
}
