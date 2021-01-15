import { FETCH_BACKTEST_ASSETS } from "./types";
import BackendAPI from "../components/BackendAPI";
import { showMessage } from "./general";

export function getBacktestAssetsFromAPI() {
  return async function (dispatch) {
    try {
      const response = await BackendAPI.getBacktestAssets();
      return dispatch(fetchBacktestAssets(response));
    } catch (err) {
      dispatch(showMessage({ type: "error", text: err }));
    }
  };
}

function fetchBacktestAssets(assets) {
  return {
    type: FETCH_BACKTEST_ASSETS,
    assets,
  };
}
