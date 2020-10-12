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

The backend will be available at 'http://localhost:3001/'

However, to be able to actually use the backend, you will need to have a Shrimpy API master or user developer key.
The Shrimpy public and private API keys will then need to be set as environment variables:

`SHRIMPY_MASTER_API_PUBLIC_KEY = "your master or user public api key"`  
`SHRIMPY_MASTER_API_PRIVATE_KEY = "your master or user private api key"`

Shrimpy API key documentation and more information can be found here: 'https://developers.shrimpy.io/docs/'
