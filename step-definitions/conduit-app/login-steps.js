const { Given, When } = require("cucumber");
const { client } = require("nightwatch-api");
const fs = require("fs");
let rawJson = fs.readFileSync("conduit.conf.json");
let json = JSON.parse(rawJson);
let james = json.users.james;
const { registerUser, loginUser } = require("../../helpers/api");

When(/James attemps to login with (.*)/, async (fieldId) => {
  const homePage = client.page.home();
  const navBar = homePage.section.navBar;
  navBar.click("@signInBtn");
  const loginPage = client.page.login();
  loginPage.assert.containsText("@header", "Sign In");

  if (fieldId === "empty password") loginPage.setValue("@email", james.email);
  if (fieldId === "empty email")
    loginPage.setValue("@password", james.password);
  if (fieldId === "incorrect password") {
    loginPage.setValue("@email", james.email);
    loginPage.setValue("@password", "asdf");
  }
  if (fieldId === "correct credentials") {
    loginPage.setValue("@email", james.email);
    loginPage.setValue("@password", james.password);
  }
  return loginPage.click("@signInBtn");
});

When(/James press \"(.*)\"/, async (fieldId) => {
  const loginPage = client.page.login();
  if (fieldId === "Need an account?") return loginPage.click("@needAccountBtn");
  return undefined;
});

Given(/that James has already logged in to conduit/, async () => {
  await registerUser();
  const request = await loginUser();
  const homePage = client.page.home();
  await homePage.navigate();
  client.execute(
    function () {
      return window.localStorage.setItem("jwt", arguments[0]);
    },
    [request.data.user.token]
  );

  return client.refresh();
});

Given(/that James has not logged in at conduit/, () => {});
