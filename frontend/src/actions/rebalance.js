import {
  SHOW_REBALANCE_ASSET_SELECT_MODAL,
  SHOW_REBALANCE_PERIOD_MODAL,
  CLOSE_REBALANCE_ASSET_SELECT_MODAL,
  CLOSE_REBALANCE_PERIOD_MODAL,
} from "./types";

export function showRebalancePeriodModalInState() {
  return async function (dispatch) {
    return dispatch(showRebalPeriodModal());
  };
}

function showRebalPeriodModal() {
  return {
    type: SHOW_REBALANCE_PERIOD_MODAL,
  };
}

export function showRebalanceAssetSelectModalInState() {
  return async function (dispatch) {
    return dispatch(showRebalAssetSelectModal());
  };
}

function showRebalAssetSelectModal() {
  return {
    type: SHOW_REBALANCE_ASSET_SELECT_MODAL,
  };
}

export function closeRebalancePeriodModal() {
  return async function (dispatch) {
    return dispatch(closeRebalPeriodModal());
  };
}

function closeRebalPeriodModal() {
  return {
    type: CLOSE_REBALANCE_PERIOD_MODAL,
  };
}

export function closeRebalanceAssetSelectModal() {
  return async function (dispatch) {
    return dispatch(closeRebalAssetSelectModal());
  };
}

function closeRebalAssetSelectModal() {
  return {
    type: CLOSE_REBALANCE_ASSET_SELECT_MODAL,
  };
}
