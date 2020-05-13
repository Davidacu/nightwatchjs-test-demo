const { client } = require("nightwatch-api");
const { Given, Then, When } = require("cucumber");

Given(/I navigate to (.*) page/, async (siteId) => {
  switch (siteId.toLowerCase()) {
    case "google home":
      let google = client.page.google();
      return await google.navigate();
    case "conduit home":
      let homePage = client.page.home();
      return await homePage.navigate().assert.title("Conduit");
  }
});
