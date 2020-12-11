/**
 *
 * the balanceHistory is updated to include the average of values for a date timeframe
 * i.e. if the frontend asks for the month's data, then we need to calculate the average of the values, since Shrimpy
 * gives us an object with many intraday values
 */
function computeBalanceHistory(balanceHistory, timeframe) {
  // balanceHistory is an array of objects with keys: "date" and "usdValue"
  let updatedBalHistory = [];
  let sums = {},
    counts = {},
    date;

  for (let bal of balanceHistory) {
    date = bal.date;
    if (!(date in sums)) {
      sums[date] = 0;
      counts[date] = 0;
    }
    sums[date] += bal.usdValue;
    counts[date]++;
  }

  for (date in sums) {
    updatedBalHistory.push({ date, usdValue: sums[date] / counts[date] });
  }

  return updatedBalHistory;
}

module.exports = computeBalanceHistory;
