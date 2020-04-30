const { client } = require("nightwatch-api");
const { Given, Then, When } = require("cucumber");

Given(/I navigate to (.*) page/, async (siteId) => {
  let google = client.page.google();
  await google.navigate();
});
