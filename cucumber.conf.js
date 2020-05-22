let {
  setDefaultTimeout,
  AfterAll,
  BeforeAll,
  Before,
  After,
} = require("cucumber");
let {
  createSession,
  closeSession,
  startWebDriver,
  stopWebDriver,
  client,
} = require("nightwatch-api");
let cleanDatabase = require("./helpers/db-utils");

setDefaultTimeout(60000);

BeforeAll(async () => {
  await startWebDriver({ env: process.env.NIGHTWATCH_ENV || "chrome" });
  await createSession();
});

AfterAll(async () => {
  await closeSession();
  await stopWebDriver();
});

Before({ tags: "@conduit" }, async () => {
  await cleanDatabase();
  await client.page.home().navigate();
});

After({ tags: "@conduit" }, async () => {
  return client.execute(function () {
    return window.localStorage.clear();
  });
});
