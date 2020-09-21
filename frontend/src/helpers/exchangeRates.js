import BackendAPI from "../components/BackendAPI";
import { formatNative } from "./currencyHelpers";

export const getExchangeRateValue = async (
  asset1,
  asset2,
  asset1amount = 1,
  exchange
) => {
  if (asset1 === asset2) return asset1amount;

  const tickers = await BackendAPI.getExchangeTickers(exchange);

  let asset1PriceUsd;
  let asset2PriceUsd;

  for (const ticker of tickers) {
    if (ticker.symbol === asset1) {
      asset1PriceUsd = ticker.priceUsd;
    }

    if (ticker.symbol === asset2) {
      asset2PriceUsd = ticker.priceUsd;
    }
  }

  // calculate how much asset2 you can get for asset 1
  const exchangeRateValue = (asset1PriceUsd * asset1amount) / asset2PriceUsd;
  return formatNative(exchangeRateValue);
};
