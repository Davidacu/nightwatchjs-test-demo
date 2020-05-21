const { Given, Then, When } = require("cucumber");
const { client } = require("nightwatch-api");
const fs = require("fs");
const registerUser = require("../../helpers/api");

let rawJson = fs.readFileSync("conduit.conf.json");
let json = JSON.parse(rawJson);
let users = json.users;
let homePage = client.page.home();
let signUp = client.page.signup();

Given(/that (.*) has navigated to the \"(.*)\" page/, async (user, page) => {
  switch (page.toLowerCase()) {
    case "conduit home":
      return homePage.navigate();
    case "conduit sign in":
      homePage.navigate();
      let navBar = homePage.section.navBar;
      navBar.click("@signInBtn");
      const loginPage = client.page.login();

      return await loginPage.assert.urlContains("/login");
    default:
      return undefined;
  }
});

Given(/that James has already registered to Conduit app/, async () => {
  try {
    let request = await registerUser();
    console.log("response:", request.data);
  } catch (error) {
    console.log("error:", error);
  }
});

When(/(.*) sign up with valid credentials/, async (user) => {
  let james = users.james;
  let navBar = homePage.section.navBar;
  navBar.click("@signUpBtn");
  signUp.assert.containsText("@header", "Sign Up");
  signUp.setValue("@username", james.username);
  signUp.setValue("@email", james.email);
  signUp.setValue("@password", james.password);
  return signUp.click("@signUpBtn");
});

When(/(.*) sign up with (.*) email/, async (user, emailType) => {
  let james = users.james;
  let email = emailType === "invalid" ? "james@com" : "";

  let navBar = homePage.section.navBar;
  navBar.click("@signUpBtn");
  signUp.assert.containsText("@header", "Sign Up");
  signUp.setValue("@username", james.username);
  signUp.setValue("@email", email);
  signUp.setValue("@password", james.password);
  return signUp.click("@signUpBtn");
});

When(/(.*) sign up with empty username/, async (user) => {
  let james = users.james;
  let navBar = homePage.section.navBar;

  navBar.click("@signUpBtn");
  signUp.assert.containsText("@header", "Sign Up");
  signUp.setValue("@username", "");
  signUp.setValue("@email", james.email);
  signUp.setValue("@password", james.password);
  return signUp.click("@signUpBtn");
});

When(/(.*) sign up with empty password/, async (user) => {
  let james = users.james;
  let navBar = homePage.section.navBar;

  navBar.click("@signUpBtn");
  signUp.assert.containsText("@header", "Sign Up");
  signUp.setValue("@username", james.username);
  signUp.setValue("@email", james.email);
  signUp.setValue("@password", "");
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

Then(/error message \"(.*)\" is shown/, async (error) => {
  return signUp.expect.element("@errorMsg").text.to.contain(error);
});
