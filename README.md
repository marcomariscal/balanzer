# Balanzer

# Purpose

Balanzer allows you to capture gains on your cryptocurrency portfolio investments by rebalancing seamlessly and automatically at your desired rebalancing timeframe. Balanzer offers the following functionalitites:

    1. Seamless integration with multiple exchanges if you have multiple exchange accounts
    2. Automated rebalancing across timeframes (hour, day, week, month, etc.)
    3. Intra-exchange trading
    4. Fundamental and technical analysis dashboard (coming soon)
    5. Backtesting functionality to assess whether your idea for a crypto porftolio has generated alpha in the past (coming soon)

# Tools

Balanzer uses the following tools/frameworks:

    - React
    - Node
    - Express
    - Redux
    - postgreSQL
    - Bootstrap

# Getting Started

`git clone` this repository

Using the frontend:

`cd frontend` from the root of this directory  
`npm install`  
`npm start`

The frontend will be available at 'http://localhost:3000/'

Using the backend:

`cd backend` from the root of this directory  
`npm install`  
`npm start`

The backend will be available at http://localhost:3001/

However, to be able to actually use the backend, you will need to have a Shrimpy API master or user developer key.
The Shrimpy public and private API keys will then need to be set as environment variables:

`SHRIMPY_MASTER_API_PUBLIC_KEY = "your master or user public api key"`  
`SHRIMPY_MASTER_API_PRIVATE_KEY = "your master or user private api key"`

Shrimpy API key documentation and more information can be found here: https://developers.shrimpy.io/docs/

# Using Balanzer

The production version can be found here:

**The product is currently under active development and is in beta. Use at your own risk. This tool is also not financial advice and please do your own research when investing in cryptocurrencies.**

To be able to use Balanzer, you must connect to the exchange(s) that you would like to use Balanzer with.

For example:
If you have funds/crypto in Coinbase Pro, you can connect to Coinbase Pro through the Balanzer UI by supplying relevant API keys from that exchange.  
After you connect to an exchange you will be able to access Balanzer's capabilities.

Balanzer has a few views:

1. Dashboard: the dashboard allows you to see your balance over time, with specific timeframe select options, as well as showing your balances of different cryptocurencies for your currently connected exchange

2. Automate: this is where you are able to automate rebalancing your cryptocurrency portfolio. You can click to edit your portfolio, dragging the sliders to the target allocations for each asset, while also adding assets to your portfolio. You can also choose your rebalancing period. Right now, rebalancing periods are limited to certain timeframes. After editing your strategy and submitting, your portfolio will rebalance at your desired timeframe if the rebalance period is not set to "None". In the future:

   - You will be able to input the number of hours between rebalances
   - You will be able to rebalance immediately upon updating your rebalancing strategy

3. Trade: allows you to trade an asset for a different asset within an exchange

4. Backtest: coming soon...

5. Settings: in the top right corner of the UI, there are settings that can be toggled to allow the user to shut off trading capabilitites or account views, or delete an exchange connection entirely (you can reconnect easily afterwards)

Several updates are being made to show when a trade has been created and filled, as well as the history of trades taken for the user's ease of view.
**Alerts in general need to be added to provide a better user experience and flow.**
