let { setDefaultTimeout, AfterAll, BeforeAll, Before } = require("cucumber");
let {
  createSession,
  closeSession,
  startWebDriver,
  stopWebDriver,
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
});
