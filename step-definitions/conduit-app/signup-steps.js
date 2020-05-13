const { Given, Then, When } = require("cucumber");
const { client } = require("nightwatch-api");
const fs = require("fs");

let rawJson = fs.readFileSync("conduit.conf.json");
let json = JSON.parse(rawJson);
let users = json.users;
let homePage = client.page.home();

Given(/that (.*) has navigated to the \"(.*)\" page/, async (user, page) => {
  switch (page.toLowerCase()) {
    case "conduit home":
      return homePage.navigate();
      break;
    default:
      return false;
  }
});

When(/(.*) sign up with valid credentials/, async (user) => {
  let james = users.james;
  let navBar = homePage.section.navBar;
  navBar.click("@signUpBtn");
  let signUp = client.page.signup();
  signUp.assert.containsText("@header", "Sign Up");
  signUp.setValue("@username", james.username);
  signUp.setValue("@email", james.email);
  signUp.setValue("@password", james.password);
  return signUp.click("@signUpBtn");
});

Then(/(.*) registered username is shown at navigation bar/, async (user) => {
  let james = users.james;
  return homePage.expect.section("@navBar").text.to.contain(james.username);
});

Then(/the navigation bar displays \"(.*)\"/, async (item) => {
  return homePage.expect.section("@navBar").text.to.contain(item);
});

Then(/the navigation bar does not display \"(.*)\"/, async (item) => {
  return homePage.expect.section("@navBar").text.to.not.contain(item);
});

Then(/Your Feed is empty/, async () => {
  homePage.expect.element("@activeFeed").text.to.contain("Your Feed");
  homePage.expect.elements("@articles").count.to.equal(1);
  return homePage.expect
    .element("@articles")
    .text.to.contain("No articles are here... yet.");
});
