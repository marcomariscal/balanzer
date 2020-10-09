import {
  SHOW_REBALANCE_ASSET_SELECT_MODAL,
  SHOW_REBALANCE_PERIOD_MODAL,
  CLOSE_REBALANCE_ASSET_SELECT_MODAL,
  CLOSE_REBALANCE_PERIOD_MODAL,
} from "../actions/types";

const INITIAL_STATE = {};

export default function rootReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SHOW_REBALANCE_PERIOD_MODAL:
      return { ...state, showRebalancePeriodModal: true };
    case CLOSE_REBALANCE_PERIOD_MODAL:
      return { ...state, showRebalancePeriodModal: false };
    case SHOW_REBALANCE_ASSET_SELECT_MODAL:
      return { ...state, showRebalanceAssetSelectModal: true };
    case CLOSE_REBALANCE_ASSET_SELECT_MODAL:
      return { ...state, showRebalanceAssetSelectModal: false };
    default:
      return state;
  }
}
