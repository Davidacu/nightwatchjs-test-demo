let { setDefaultTimeout, AfterAll, BeforeAll } = require("cucumber");
let {
  createSession,
  closeSession,
  startWebDriver,
  stopWebDriver,
} = require("nightwatch-api");

setDefaultTimeout(60000);

BeforeAll(async () => {
  await startWebDriver({ env: "default" });
  await createSession({ env: "default" });
});

AfterAll(async () => {
  await closeSession();
  await stopWebDriver();
});
