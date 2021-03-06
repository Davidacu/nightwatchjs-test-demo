const { client } = require("nightwatch-api");
const { Given, Then, When } = require("cucumber");
const homePage = client.page.home();

Given(/I navigate to (.*) page/, async (siteId) => {
  switch (siteId.toLowerCase()) {
    case "conduit home":
      return await homePage.navigate().assert.title("Conduit");
  }
});

When(/James navigates to (.*) page/, async (siteId) => {
  switch (siteId.toLowerCase()) {
    case "conduit home":
      return await homePage.navigate().assert.title("Conduit");
  }
});
