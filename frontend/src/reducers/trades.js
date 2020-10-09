import {
  FETCH_TRADES,
  TRADE_SELECT_INPUT,
  TRADE_SELECT_OUTPUT,
  SHOW_TRADE_MODAL,
  CLOSE_TRADE_MODAL,
  LOGOUT_CURRENT_USER,
  UPDATE_TRADE_DETAILS,
  UPDATE_MODAL_TYPE,
  TRADE_SELECT_INPUT_VALUE,
  TRADE_SELECT_OUTPUT_VALUE,
  UPDATE_LATEST_TRADE,
  SUBMIT_TRADE_END,
  SUBMIT_TRADE_START,
} from "../actions/types";

const INITIAL_STATE = {};

export default function rootReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SHOW_TRADE_MODAL:
      return { ...state, showTradeModal: true };
    case CLOSE_TRADE_MODAL:
      return { ...state, showTradeModal: false };
    case TRADE_SELECT_INPUT:
      return { ...state, input: { ...state.input, symbol: action.symbol } };
    case TRADE_SELECT_INPUT_VALUE:
      return { ...state, input: { ...state.input, valueNative: action.value } };
    case TRADE_SELECT_OUTPUT:
      return { ...state, output: { ...state.output, symbol: action.symbol } };
    case TRADE_SELECT_OUTPUT_VALUE:
      return {
        ...state,
        output: { ...state.output, valueNative: action.value },
      };
    case UPDATE_TRADE_DETAILS:
      return { ...state, tradeDetails: action.tradeDetails };
    case UPDATE_MODAL_TYPE:
      return { ...state, modalType: action.modalType };
    case FETCH_TRADES:
      return { ...state, filledTrades: action.trades };
    case UPDATE_LATEST_TRADE:
      return { ...state, latestTrade: action.trade };
    case SUBMIT_TRADE_START:
      return { ...state, submittingTrade: true };
    case SUBMIT_TRADE_END:
      return { ...state, submittingTrade: false };
    case LOGOUT_CURRENT_USER:
      return INITIAL_STATE;
    default:
      return state;
  }
}
