// npm packages
const request = require("supertest");

// app imports
const app = require("../../app");

const {
  TEST_DATA,
  afterEachHook,
  beforeEachHook,
  afterAllHook,
} = require("./config");

beforeEach(async function () {
  await beforeEachHook(TEST_DATA);
});

describe("POST /accounts", async function () {
  test("Links a user to their exchange account", async function () {
    const response = await request(app).post("/accounts").send({
      name: "test",
      _token: TEST_DATA.userToken,
    });
    expect(response.statusCode).toBe(201);
    expect(response.body.account).toHaveProperty("account");
  });

  test("Prevents creating an account with duplicate exchange_account_id", async function () {
    const response = await request(app).post("/accounts").send({
      _token: TEST_DATA.userToken,
      exchange_account_id: 0,
      name: "test",
    });
    expect(response.statusCode).toBe(400);
  });
});

describe("GET /accounts", async function () {
  test("Gets a list of accounts", async function () {
    const response = await request(app).get("/accounts");
    expect(response.body.accounts).toHaveLength(1);
    expect(response.body.accounts[0]).toHaveProperty("exchange_account_id");
  });
});

describe("GET /accounts/:accountId", async function () {
  test("Gets a single account", async function () {
    const response = await request(app)
      .get(`/account/${TEST_DATA.currentAccount.handle}`)
      .send({
        _token: TEST_DATA.userToken,
      });
    expect(response.body.account).toHaveProperty("exchange_account_id");
    expect(response.body.account.name).toBe("Coinbase Pro");
  });

  test("Responds with a 404 if it cannot find the account in question", async function () {
    const response = await request(app).get(`/account/nice`).send({
      _token: TEST_DATA.userToken,
    });
    expect(response.statusCode).toBe(404);
  });
});

afterEach(async function () {
  await afterEachHook();
});

afterAll(async function () {
  await afterAllHook();
});
