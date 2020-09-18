import axios from "axios";
import { TOKEN_STORAGE_ID } from "./App";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

class BackendApi {
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

  static async createAccount(username, data) {
    let res = await this.request(`userAccounts/${username}`, data, "post");
    return res.accountId;
  }

  // gets the balance of each asset in the user's account
  // params consist of an optional date
  static async getAccountBalances(username, accountName, date = null) {
    let res = await this.request(
      `userAccounts/${username}/${accountName}/balances`,
      date
    );
    return res.balances;
  }

  // backtest endpoints
  // pass in the exchange name you want to see the assets for as a parameter
  static async getBacktestAssets(data) {
    let res = await this.request("exchanges", data);
    return res.assets;
  }
}

export default BackendApi;
