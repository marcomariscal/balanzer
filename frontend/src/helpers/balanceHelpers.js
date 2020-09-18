import { formatUSD } from "./currencyHelpers";

// accepts a list of balances
export const totalBalanceUSD = (balances) => {
  const total = balances.reduce((acc, curr) => {
    return acc + curr.usdValue;
  }, 0);

  return formatUSD(total);
};
