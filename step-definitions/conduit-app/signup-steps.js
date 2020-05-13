const { Given, Then, When } = require("cucumber");
const { client } = require("nightwatch-api");
const fs = require("fs");

let rawJson = fs.readFileSync("conduit.conf.json");
let json = JSON.parse(rawJson);
let user = json.user;

let homePage = client.page.home();
When(/a user sign up with valid credentials/, async () => {
  let navBar = homePage.section.navBar;
  navBar.click("@signUpBtn");
  let signUp = client.page.signup();
  signUp.assert.containsText("@header", "Sign Up");
  signUp.setValue("@username", user.username);
  signUp.setValue("@email", user.email);
  signUp.setValue("@password", user.password);
  return signUp.click("@signUpBtn");
});

Then(/the registered username is shown at navigation bar/, async () => {
  return homePage.expect.section("@navBar").text.to.contain(user.username);
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
