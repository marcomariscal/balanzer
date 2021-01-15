export function sortByAssetSymbol(assets) {
  return assets.sort((a, b) => b.symbol - a.symbol);
}

export function sortByAssetBalance(balances) {
  return balances.sort((a, b) => b.usdValue - a.usdValue);
}

export function sortByExchangeName(exchanges) {
  return exchanges.sort((a, b) => b.exchange - a.exchange);
}
