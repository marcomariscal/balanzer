import {
  UPDATE_CURRENT_USER,
  LOGOUT_CURRENT_USER,
  UPDATE_CURRENT_ACCOUNT,
  FETCH_ACCOUNTS,
  ACCOUNT_CREATED_SUCCESS,
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
  CLEAR_REBALANCE_STRATEGY,
} from "./types";
import {
  showErrors,
  resetErrors,
  startLoad,
  stopLoad,
  showSuccess,
  showMessage,
} from "./general";
import BackendAPI from "../components/BackendAPI";
import { getExchangeAssetsFromAPI } from "./assets";

export function registerUserWithAPI(data) {
  return async function (dispatch) {
    dispatch(startLoad());

    try {
      const { user } = await BackendAPI.register(data);
      const newUser = await BackendAPI.getUser(user.username);
      dispatch(updateCurrentUserInStore(newUser));
      dispatch(stopLoad());
      return dispatch(showSuccess([`Welcome ${user.username}!`]));
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

      // update all relevant user data
      dispatch(syncUserData(loggedUser.username));

      dispatch(stopLoad());
      return dispatch(showSuccess([`Welcome ${loggedUser.username}!`]));
    } catch (err) {
      dispatch(showErrors(err));
      dispatch(stopLoad());
    }
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

export function createAccountInAPI(username, data) {
  return async function (dispatch) {
    dispatch(creatingAccount());
    try {
      const accountId = await BackendAPI.createAccount(username, data);
      const newAccount = await BackendAPI.getAccount(username, accountId);

      syncUserData(username, accountId);
      dispatch(createAccountSuccessInState(newAccount.exchange));
      dispatch(stopCreatingAccount());

      return dispatch(
        showSuccess([`Successfully connected to ${newAccount.exchange}`])
      );
    } catch (err) {
      dispatch(stopCreatingAccount());
      dispatch(showErrors(err));
    }
  };
}

function creatingAccount() {
  return {
    type: START_CREATE_ACCOUNT,
  };
}

export function deleteAccountInAPI(username, accountId) {
  return async function (dispatch) {
    try {
      await BackendAPI.deleteAccount(username, accountId);
      dispatch(accountDeleted(accountId));
      dispatch(showMessage([`Disconnected from exchange`]));
      return dispatch(syncUserData(username));
    } catch (err) {
      dispatch(showErrors(err));
    }
  };
}

function accountDeleted(accountId) {
  return {
    type: ACCOUNT_DELETED,
    accountId,
  };
}

function stopCreatingAccount() {
  return {
    type: END_CREATE_ACCOUNT,
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

export function getBalanceHistoryFromAPI(username, accountId, timeframe) {
  return async function (dispatch) {
    const res = await BackendAPI.getAccountBalanceHistory(
      username,
      accountId,
      timeframe
    );

    dispatch(fetchBalanceHistory(res));
  };
}

function fetchBalanceHistory(balanceHistory) {
  return {
    type: FETCH_BALANCE_HISTORY,
    balanceHistory,
  };
}

// gets all relevant user's account data at this moment for the current user and current account
export function syncUserData(username, accountId = null) {
  return async function (dispatch) {
    dispatch(startLoad());
    dispatch(resetErrors());
    try {
      // sync user
      const user = await BackendAPI.getUser(username);
      dispatch(updateCurrentUserInStore(user));

      // sync accounts
      const accounts = await BackendAPI.getAccounts(user.username);
      // return if there are no accounts
      if (accounts.length === 0) {
        dispatch(resetUserAccountInfo(user.username));
        dispatch(stopLoad());
        return;
      }

      dispatch(fetchAccounts(accounts));

      // update current account
      const accountIdToUse = accountId ? accountId : accounts[0].id;
      const currAccount = await BackendAPI.getAccount(
        user.username,
        accountIdToUse
      );
      dispatch(updateCurrentAccountInState(currAccount));

      // update account balances
      const balances = await BackendAPI.getAccountBalances(
        user.username,
        accountIdToUse
      );
      dispatch(fetchBalances(balances));

      // update permission info
      dispatch(getPermissionsFromAPI(user.username));

      // update asset info
      dispatch(getExchangeAssetsFromAPI(currAccount.exchange));

      dispatch(getRebalancePeriodFromAPI(user.username, accountIdToUse));

      dispatch(getRebalanceStrategyFromAPI(user.username, accountIdToUse));

      // update balance history
      dispatch(getBalanceHistoryFromAPI(user.username, accountIdToUse, "All"));

      dispatch(userDataUpdated());
      return dispatch(stopLoad());
    } catch (error) {
      dispatch(showErrors());
      return dispatch(stopLoad());
    }
  };
}

function resetUserAccountInfo() {
  return {
    type: RESET_USER_ACCOUNT_INFO,
  };
}

function userDataUpdated() {
  return {
    type: USER_DATA_UPDATED,
  };
}

export function getPermissionsFromAPI(username) {
  return async function (dispatch) {
    dispatch(startLoad());
    try {
      const response = await BackendAPI.getPermissions(username);
      dispatch(fetchPermissions(response));
      return dispatch(stopLoad());
    } catch (error) {
      dispatch(stopLoad());
      dispatch(showErrors(error));
    }

    return dispatch(stopLoad());
  };
}

function fetchPermissions(permissions) {
  return {
    type: FETCH_PERMISSIONS,
    permissions,
  };
}

export function updatePermissionsInAPI(username, data) {
  return async function (dispatch) {
    try {
      const response = await BackendAPI.updatePermissions(username, data);
      dispatch(updatePermissions(response));
      return dispatch(
        showSuccess([`Successfully updated permission settings!`])
      );
    } catch (error) {
      showErrors(error);
    }
  };
}

function updatePermissions(permissions) {
  return {
    type: PERMISSIONS_UPDATED,
    permissions,
  };
}

export function updateCurrentAccountInState(account) {
  return async function (dispatch) {
    dispatch(updateCurrentAccount(account));
    return dispatch(
      showMessage([`You are now looking at your ${account.exchange} account`])
    );
  };
}

function updateCurrentAccount(account) {
  return {
    type: UPDATE_CURRENT_ACCOUNT,
    account,
  };
}

/** Rebalance Actions */
export function getRebalancePeriodFromAPI(username, accountId) {
  return async function (dispatch) {
    const res = await BackendAPI.getRebalancePeriod(username, accountId);
    dispatch(fetchRebalancePeriod(res));
  };
}

function fetchRebalancePeriod(rebalancePeriod) {
  return {
    type: FETCH_REBALANCE_PERIOD,
    rebalancePeriod,
  };
}

export function setRebalancePeriodInAPI(username, accountId, rebalancePeriod) {
  return async function (dispatch) {
    dispatch(startLoad());
    try {
      const res = await BackendAPI.setRebalancePeriod(
        username,
        accountId,
        rebalancePeriod
      );
      dispatch(updatedRebalancePeriod(res));
      dispatch(stopLoad());
      return dispatch(showSuccess(["Your rebalance period has been updated!"]));
    } catch (error) {
      dispatch(showErrors(error));
      dispatch(stopLoad());
    }
  };
}

function updatedRebalancePeriod(rebalancePeriod) {
  return {
    type: REBALANCE_PERIOD_UPDATED,
    rebalancePeriod,
  };
}

export function rebalanceInAPI(username, accountId) {
  return async function (dispatch) {
    const res = await BackendAPI.rebalance(username, accountId);
    dispatch(initiateRebalance(res));
  };
}

function initiateRebalance(message) {
  return {
    type: REBALANCE_INITIATED,
    message,
  };
}

export function getRebalanceStrategyFromAPI(username, accountId) {
  return async function (dispatch) {
    const res = await BackendAPI.getRebalanceStrategy(username, accountId);
    dispatch(fetchRebalanceStrategy(res));
  };
}

function fetchRebalanceStrategy(rebalanceStrategy) {
  return {
    type: FETCH_REBALANCE_STRATEGY,
    rebalanceStrategy,
  };
}

export function setRebalanceStrategyInAPI(username, accountId, allocations) {
  return async function (dispatch) {
    try {
      const res = await BackendAPI.setRebalanceStrategy(
        username,
        accountId,
        allocations
      );
      dispatch(setRebalanceStrategy(res));
      return dispatch(showSuccess([`Sucessfully updated strategy!`]));
    } catch (error) {
      showErrors([
        `Hmm something happened and we weren't able to update your strategy`,
      ]);
    }
  };
}

function setRebalanceStrategy(rebalanceStrategy) {
  return {
    type: REBALANCE_STRATEGY_UPDATED,
    rebalanceStrategy,
  };
}

export function clearRebalanceStrategyInAPI(username, accountId) {
  return async function (dispatch) {
    const res = await BackendAPI.clearRebalanceStrategy(username, accountId);
    dispatch(clearRebalanceStrategy(res));
  };
}

function clearRebalanceStrategy(rebalanceStrategy) {
  return {
    type: CLEAR_REBALANCE_STRATEGY,
    rebalanceStrategy,
  };
}
