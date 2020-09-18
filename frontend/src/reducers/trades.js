import {
  FETCH_TRADES,
  TRADE_SELECT_INPUT,
  TRADE_SELECT_OUTPUT,
  SHOW_TRADE_MODAL,
  CLOSE_TRADE_MODAL,
} from "../actions/types";

const INITIAL_STATE = {
  input: "select",
  output: "select",
};

export default function rootReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SHOW_TRADE_MODAL:
      return { ...state, showTradeModal: true };
    case CLOSE_TRADE_MODAL:
      return { ...state, showTradeModal: false };
    case TRADE_SELECT_INPUT:
      return { ...state, input: action.symbol };
    case TRADE_SELECT_OUTPUT:
      return { ...state, output: action.symbol };
    case FETCH_TRADES:
      return { ...state, filledTrades: action.trades };
    default:
      return state;
  }
}
