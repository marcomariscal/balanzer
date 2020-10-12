import {
  UPDATE_CURRENT_USER,
  LOGOUT_CURRENT_USER,
  AUTH_SUCCESS,
  ACCOUNT_CREATED,
  ACCOUNT_CREATED_SUCCESS,
  UPDATE_CURRENT_ACCOUNT,
  FETCH_ACCOUNTS,
  FETCH_BALANCES,
  FETCH_PERMISSIONS,
  PERMISSIONS_UPDATED,
  START_CREATE_ACCOUNT,
  END_CREATE_ACCOUNT,
  ACCOUNT_DELETED,
  USER_DATA_UPDATED,
  RESET_USER_ACCOUNT_INFO,
  FETCH_BALANCE_HISTORY,
  FETCH_REBALANCE_PERIOD,
  REBALANCE_PERIOD_UPDATED,
  REBALANCE_INITIATED,
  FETCH_REBALANCE_STRATEGY,
  REBALANCE_STRATEGY_UPDATED,
} from "../actions/types";
import { totalBalanceUSD } from "../helpers/balanceHelpers";

const INITIAL_STATE = {
  accounts: [],
  notCurrentAccounts: [],
  currentAccount: null,
  user: null,
  permissions: null,
  permissionsUpdated: false,
  balances: [],
  balanceHistory: [],
};

function sortByAssetBalance(balances) {
  return balances.sort((a, b) => b.usdValue - a.usdValue);
}

export default function rootReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case UPDATE_CURRENT_USER:
      return {
        ...state,
        user: action.user,
      };
    case FETCH_ACCOUNTS:
      return {
        ...state,
        accounts: action.accounts,
      };
    case FETCH_BALANCES:
      return {
        ...state,
        balances: sortByAssetBalance(action.balances),
        totalBalanceUSD: totalBalanceUSD([...action.balances]),
      };
    case FETCH_BALANCE_HISTORY:
      return { ...state, balanceHistory: action.balanceHistory };
    case UPDATE_CURRENT_ACCOUNT:
      return { ...state, ...state.user, currentAccount: action.account };
    case START_CREATE_ACCOUNT:
      return { ...state, creatingAccount: true };
    case END_CREATE_ACCOUNT:
      return { ...state, creatingAccount: false };
    case ACCOUNT_CREATED:
      return { ...state, accountId: action.accountId };
    case ACCOUNT_DELETED:
      return { ...state, accountDeleted: action.accountId };
    case ACCOUNT_CREATED_SUCCESS:
      return { ...state, accountCreated: action.accountName };
    case FETCH_PERMISSIONS:
      return { ...state, permissions: action.permissions };
    case PERMISSIONS_UPDATED:
      return { ...state, permissions: action.permissions };
    case LOGOUT_CURRENT_USER:
      return INITIAL_STATE;
    case AUTH_SUCCESS:
      return { ...state, authSuccess: true };
    case USER_DATA_UPDATED:
      return { ...state, userDataUpdatedAt: Date.now() };
    case RESET_USER_ACCOUNT_INFO:
      return {
        ...state,
        accounts: [],
        balances: [],
        balanceHistory: [],
        notCurrentAccounts: [],
        currentAccount: null,
        permissions: null,
        rebalancePeriod: null,
        rebalanceStrategy: null,
      };

    case FETCH_REBALANCE_PERIOD:
      return { ...state, rebalancePeriod: action.rebalancePeriod };
    case REBALANCE_PERIOD_UPDATED:
      return { ...state, rebalancePeriod: action.rebalancePeriod };
    case REBALANCE_INITIATED:
      return { ...state, rebalanceInitiated: action.message };
    case FETCH_REBALANCE_STRATEGY:
      return { ...state, rebalanceStrategy: action.rebalanceStrategy };
    case REBALANCE_STRATEGY_UPDATED:
      return { ...state, rebalanceStrategy: action.rebalanceStrategy };
    default:
      return state;
  }
}
