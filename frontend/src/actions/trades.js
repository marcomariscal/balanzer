import {
  SUBMIT_TRADE_SUCCESS,
  FETCH_TRADES,
  TRADE_SELECT_INPUT,
  TRADE_SELECT_OUTPUT,
  SHOW_TRADE_MODAL,
  CLOSE_TRADE_MODAL,
} from "./types";
import BackendAPI from "../components/BackendAPI";
import { startLoad, stopLoad } from "./general";

export function submitTradeInAPI(data) {
  return async function (dispatch) {
    dispatch(startLoad());
    // const response = await BackendAPI.createTrade(data);
    dispatch(submitTradeSuccess());
    return dispatch(stopLoad());
  };
}

function submitTradeSuccess() {
  return {
    type: SUBMIT_TRADE_SUCCESS,
  };
}

export function fetchFilledTrades() {
  return async function (dispatch) {
    dispatch(startLoad());
    // const response = await BackendAPI.getTrades(username);
    // dispatch(tradesFetched(response));
    return dispatch(stopLoad());
  };
}

function tradesFetched(trades) {
  return {
    type: FETCH_TRADES,
    trades,
  };
}

export function tradeSelectInput(symbol) {
  return async function (dispatch) {
    return dispatch(tradeInputSelected(symbol));
  };
}

function tradeInputSelected(symbol) {
  return {
    type: TRADE_SELECT_INPUT,
    symbol,
  };
}

export function tradeSelectOutput(symbol) {
  return async function (dispatch) {
    return dispatch(tradeOutputSelected(symbol));
  };
}

function tradeOutputSelected(symbol) {
  return {
    type: TRADE_SELECT_OUTPUT,
    symbol,
  };
}

export function showModal() {
  return {
    type: SHOW_TRADE_MODAL,
  };
}

export function closeModal() {
  return {
    type: CLOSE_TRADE_MODAL,
  };
}
