const Shrimpy = require("shrimpy-node");
const { SHRIMPY_PUBLIC_KEY, SHRIMPY_PRIVATE_KEY } = require("../config");

const client = new Shrimpy.ShrimpyApiClient(
  SHRIMPY_PUBLIC_KEY,
  SHRIMPY_PRIVATE_KEY
);

module.exports = client;
