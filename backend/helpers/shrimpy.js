const Shrimpy = require("shrimpy-node");

const publicKey = process.env.SHRIMPY_MASTER_API_PUBLIC_KEY;
const privateKey = process.env.SHRIMPY_MASTER_API_PRIVATE_KEY;
const client = new Shrimpy.ShrimpyApiClient(publicKey, privateKey);

module.exports = client;
