import {
  UPDATE_CURRENT_USER,
  LOGOUT_CURRENT_USER,
  AUTH_SUCCESS,
  ACCOUNT_CREATED,
  ACCOUNT_CREATED_SUCCESS,
  UPDATE_CURRENT_ACCOUNT,
  FETCH_ACCOUNTS,
  FETCH_BALANCES,
} from "../actions/types";
import { totalBalanceUSD } from "../helpers/balanceHelpers";

const INITIAL_STATE = {
  accounts: [],
  notCurrentAccounts: [],
  currentAccount: {},
  user: null,
};

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
        balances: action.balances,
        totalBalanceUSD: totalBalanceUSD([...action.balances]),
      };
    case UPDATE_CURRENT_ACCOUNT:
      return { ...state, ...state.user, currentAccount: action.account };
    case ACCOUNT_CREATED:
      return { ...state, accountId: action.accountId };
    case ACCOUNT_CREATED_SUCCESS:
      return { ...state, accountCreated: action.accountName };
    case LOGOUT_CURRENT_USER:
      return INITIAL_STATE;
    case AUTH_SUCCESS:
      return { ...state, authSuccess: true };
    default:
      return state;
  }
}
