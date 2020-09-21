import {
  UPDATE_CURRENT_USER,
  LOGOUT_CURRENT_USER,
  AUTH_SUCCESS,
  UPDATE_CURRENT_ACCOUNT,
  FETCH_ACCOUNTS,
  ACCOUNT_CREATED_SUCCESS,
  FETCH_BALANCES,
} from "./types";
import { showErrors, resetErrors, startLoad, stopLoad } from "./general";
import BackendAPI from "../components/BackendAPI";

export function registerUserWithAPI(data) {
  return async function (dispatch) {
    dispatch(startLoad());

    try {
      const { user } = await BackendAPI.register(data);
      const newUser = await BackendAPI.getUser(user.username);
      dispatch(updateCurrentUserInStore(newUser));
      dispatch(authSuccess());
      return dispatch(stopLoad());
    } catch (err) {
      dispatch(showErrors(err));
      dispatch(stopLoad());
    }
  };
}

export function loginUserWithAPI(data) {
  return async function (dispatch) {
    dispatch(startLoad());

    try {
      const { user } = await BackendAPI.login(data);

      // update the user in state
      const loggedUser = await BackendAPI.getUser(user.username);
      dispatch(updateCurrentUserInStore(loggedUser));

      // update all relevant user data
      dispatch(syncUserData(user.username));

      dispatch(authSuccess());
      return dispatch(stopLoad());
    } catch (err) {
      dispatch(showErrors(err));
      dispatch(stopLoad());
    }
  };
}

function authSuccess() {
  return {
    type: AUTH_SUCCESS,
  };
}

export function updateCurrentUserInStore(user) {
  return async function (dispatch) {
    return dispatch(updateCurrentUser(user));
  };
}

function updateCurrentUser(user) {
  return {
    type: UPDATE_CURRENT_USER,
    user,
  };
}

export function logoutUserInState() {
  return async function (dispatch) {
    dispatch(resetErrors());
    return dispatch(logoutUser());
  };
}

function logoutUser(user) {
  return {
    type: LOGOUT_CURRENT_USER,
  };
}

export function getAccountsFromAPI(username) {
  return async function (dispatch) {
    try {
      dispatch(startLoad());
      const response = await BackendAPI.getAccounts(username);
      dispatch(fetchAccounts(response));
      return dispatch(stopLoad());
    } catch (error) {
      dispatch(showErrors());
      return dispatch(stopLoad());
    }
  };
}

function fetchAccounts(accounts) {
  return {
    type: FETCH_ACCOUNTS,
    accounts,
  };
}

export function updateCurrentAccountInState(account) {
  return async function (dispatch) {
    return dispatch(updateCurrentAccount(account));
  };
}

function updateCurrentAccount(account) {
  return {
    type: UPDATE_CURRENT_ACCOUNT,
    account,
  };
}

export function createAccountInAPI(username, data) {
  return async function (dispatch) {
    dispatch(startLoad());
    try {
      const accountId = await BackendAPI.createAccount(username, data);
      const accounts = await BackendAPI.getAccounts(username);
      const newAccount = accounts.filter((a) => a.id === accountId);
      dispatch(updateCurrentAccountInState(newAccount));
      dispatch(createAccountSuccessInState(newAccount.exchange));

      dispatch(stopLoad());
    } catch (err) {
      dispatch(stopLoad());
      dispatch(showErrors(err));
    }
  };
}

export function createAccountSuccessInState(accountName) {
  return async function (dispatch) {
    dispatch(createAccountSuccess(accountName));
  };
}

function createAccountSuccess(accountName) {
  return {
    type: ACCOUNT_CREATED_SUCCESS,
    accountName,
  };
}

export function getAccountBalancesFromAPI(username, accountName, date = null) {
  return async function (dispatch) {
    dispatch(startLoad());
    try {
      const response = await BackendAPI.getAccountBalances(
        username,
        accountName,
        date
      );
      dispatch(fetchBalances(response));
      return dispatch(stopLoad());
    } catch (error) {
      dispatch(showErrors());
      return dispatch(stopLoad());
    }
  };
}

function fetchBalances(balances) {
  return {
    type: FETCH_BALANCES,
    balances,
  };
}

// gets all relevant user's account data at this moment for the current user and current account
export function syncUserData(username, account = null) {
  return async function (dispatch) {
    dispatch(startLoad());
    try {
      // sync user
      const user = await BackendAPI.getUser(username);
      dispatch(updateCurrentUserInStore(user));

      // sync accounts
      const accounts = await BackendAPI.getAccounts(username);
      dispatch(fetchAccounts(accounts));

      // sync account balances
      const accountToUse = account ? account : accounts[0];
      const balances = await BackendAPI.getAccountBalances(
        user.username,
        accountToUse.exchange
      );
      dispatch(fetchBalances(balances));

      // update current account
      dispatch(updateCurrentAccountInState(accountToUse));

      return dispatch(stopLoad());
    } catch (error) {
      dispatch(showErrors());
      return dispatch(stopLoad());
    }
  };
}