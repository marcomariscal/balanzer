import axios from "axios";
import { FETCH_EXCHANGES } from "./types";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/";

export function getExchangesFromAPI() {
  return async function (dispatch) {
    const response = await axios.get(`${API_URL}/exchanges`);
    return dispatch(fetchExchanges(response.data));
  };
}

function fetchExchanges() {
  return {
    type: FETCH_EXCHANGES,
    post,
  };
}
