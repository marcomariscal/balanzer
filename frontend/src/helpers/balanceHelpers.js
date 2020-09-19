import { formatNative, formatUSD } from "./currencyHelpers";

// accepts a list of balances
export const totalBalanceUSD = (balances) => {
  const total = balances.reduce((acc, curr) => {
    return acc + curr.usdValue;
  }, 0);

  return formatUSD(total);
};

export const getTokenBalance = (balances, tokenSymbol) => {
  const balance = balances.filter((bal) => bal.symbol === tokenSymbol)[0]
    ? balances.filter((bal) => bal.symbol === tokenSymbol)[0].nativeValue
    : 0.0;

  return formatNative(balance);
};
