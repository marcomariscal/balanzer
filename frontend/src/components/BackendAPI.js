import axios from "axios";
import { TOKEN_STORAGE_ID } from "./App";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

class BackendAPI {
  static async request(endpoint, params = {}, verb = "get") {
    let _token = localStorage.getItem(TOKEN_STORAGE_ID);

    console.debug("API Call:", endpoint, params, verb);

    let q;

    if (verb === "get") {
      q = axios.get(`${BASE_URL}/${endpoint}`, {
        params: { _token, ...params },
      });
    } else if (verb === "post") {
      q = axios.post(`${BASE_URL}/${endpoint}`, { _token, ...params });
    } else if (verb === "patch") {
      q = axios.patch(`${BASE_URL}/${endpoint}`, { _token, ...params });
    } else if (verb === "delete") {
      q = axios.delete(`${BASE_URL}/${endpoint}`, { _token, ...params });
    }
    try {
      return (await q).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // exchange endpoints
  static async getExchanges() {
    let res = await this.request("exchanges");
    return res.exchanges;
  }

  static async getExchangeAssets(exchange) {
    let res = await this.request(`exchanges/${exchange}/assets`);
    return res.assets;
  }

  static async getExchangeTickers(exchange) {
    let res = await this.request(`exchanges/${exchange}/tickers`);
    return res.tickers;
  }

  // auth endpoints
  static async login(data) {
    let res = await this.request(`login`, data, "post");
    return res;
  }

  // user endpoints
  static async register(data) {
    let res = await this.request(`users`, data, "post");
    return res;
  }

  static async getUser(username) {
    let res = await this.request(`users/${username}`);
    return res.user;
  }

  static async getUsers() {
    let res = await this.request(`users`);
    return res.users;
  }

  // userAccount endpoints
  static async getAccounts(username) {
    let res = await this.request(`userAccounts/${username}`);
    return res.accounts;
  }

  static async getAccount(username, accountId) {
    let res = await this.request(`userAccounts/${username}/${accountId}`);
    return res.account;
  }

  static async createAccount(username, data) {
    let res = await this.request(`userAccounts/${username}`, data, "post");
    return res.accountId;
  }

  static async deleteAccount(username, accountId) {
    let res = await this.request(
      `userAccounts/${username}/${accountId}/delete`,
      {},
      "post"
    );
    return res.message;
  }

  // gets the balance of each asset in the user's account
  // params consist of an optional date
  static async getAccountBalances(username, accountId, date = null) {
    let res = await this.request(
      `userAccounts/${username}/${accountId}/balances`,
      date
    );
    return res.balances;
  }

  // params consist of optional date timeframe (d, w, m, y, all)
  static async getAccountBalanceHistory(username, accountId, timeframe) {
    let res = await this.request(
      `userAccounts/${username}/${accountId}/balanceHistory/?timeframe=${timeframe}`
    );
    return res.balanceHistory;
  }

  // backtest endpoints
  // pass in the exchange name you want to see the assets for as a parameter
  static async getBacktestAssets(data) {
    let res = await this.request("exchanges", data);
    return res.assets;
  }

  // user trades endpoint
  // pass in the exchange name you want to see the active trades for as a parameter
  static async getTrades(username, account, userId, accountId) {
    let res = await this.request(`${username}/${account}/trades`, {
      userId,
      accountId,
    });
    return res.assets;
  }

  static async updatePermissions(username, data) {
    let res = await this.request(`users/${username}/permissions`, data, "post");
    return res.permissions;
  }

  static async getPermissions(username) {
    let res = await this.request(`users/${username}/permissions`);
    return res.permissions;
  }

  static async createTrade(username, accountId, data) {
    let res = await this.request(
      `userTrades/${username}/${accountId}/trades`,
      data,
      "post"
    );
    return res.trade;
  }

  // rebalance endpoints
  static async getRebalancePeriod(username, accountId) {
    let res = await this.request(
      `userAccounts/${username}/${accountId}/rebalancePeriod`
    );
    return res.rebalancePeriod;
  }

  static async setRebalancePeriod(username, accountId, data) {
    let res = await this.request(
      `userAccounts/${username}/${accountId}/rebalancePeriod`,
      data,
      "post"
    );
    return res.rebalancePeriod;
  }

  static async rebalance(username, accountId) {
    let res = await this.request(
      `userAccounts/${username}/${accountId}/rebalance`,
      {},
      "post"
    );
    return res.message;
  }

  static async getRebalanceStrategy(username, accountId) {
    let res = await this.request(
      `userAccounts/${username}/${accountId}/rebalanceStrategy`
    );
    return res.rebalanceStrategy;
  }

  static async setRebalanceStrategy(username, accountId, allocations) {
    let res = await this.request(
      `userAccounts/${username}/${accountId}/rebalanceStrategy`,
      { isDynamic: false, allocations },
      "post"
    );
    return res.rebalanceStrategy;
  }

  static async clearRebalanceStrategy(username, accountId) {
    let res = await this.request(
      `userAccounts/${username}/${accountId}/clearRebalanceStrategy`,
      {},
      "post"
    );
    return res.rebalanceStrategy;
  }
}

export default BackendAPI;
