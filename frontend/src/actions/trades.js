import {
  SUBMIT_TRADE_SUCCESS,
  FETCH_TRADES,
  TRADE_SELECT_INPUT,
  TRADE_SELECT_OUTPUT,
  SHOW_TRADE_MODAL,
  CLOSE_TRADE_MODAL,
  TRADE_SELECT_INPUT_VALUE,
  TRADE_SELECT_OUTPUT_VALUE,
  UPDATE_MODAL_TYPE,
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

export function fetchActiveTrades(username, account) {
  return async function (dispatch) {
    dispatch(startLoad());
    const response = await BackendAPI.getTrades(username, account);
    dispatch(activeTradesFetched(response));
    return dispatch(stopLoad());
  };
}

function activeTradesFetched(activeTrades) {
  return {
    type: FETCH_TRADES,
    activeTrades,
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

export function updateTradeInputValue(value) {
  return async function (dispatch) {
    return dispatch(tradeInputValueSelected(value));
  };
}

function tradeInputValueSelected(value) {
  return {
    type: TRADE_SELECT_INPUT_VALUE,
    value,
  };
}

export function updateTradeOutputValue(value) {
  return async function (dispatch) {
    return dispatch(tradeOutputValueSelected(value));
  };
}

function tradeOutputValueSelected(value) {
  return {
    type: TRADE_SELECT_OUTPUT_VALUE,
    value,
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

export function updateModalType(type) {
  return async function (dispatch) {
    return dispatch(syncModalType(type));
  };
}

function syncModalType(modalType) {
  return {
    type: UPDATE_MODAL_TYPE,
    modalType,
  };
}
