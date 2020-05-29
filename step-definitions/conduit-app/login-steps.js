const { Given, When } = require("cucumber");
const { client } = require("nightwatch-api");
const { getUser } = require("../../helpers/data-loader");
const { loginUser } = require("../../helpers/api");
const { createPage } = require("../../helpers/page-factory");

When(/(.*) attemps to login with (.*)/, async (userId, fieldId) => {
  const user = getUser(userId.toLowerCase());
  const homePage = client.page.home();
  const navBar = homePage.section.navBar;
  navBar.click("@signInBtn");
  const loginPage = client.page.login();
  loginPage.assert.containsText("@header", "Sign In");

  if (fieldId === "empty password") loginPage.setValue("@email", user.email);
  if (fieldId === "empty email") loginPage.setValue("@password", user.password);
  if (fieldId === "incorrect password") {
    loginPage.setValue("@email", user.email);
    loginPage.setValue("@password", "asdf");
  }
  if (fieldId === "correct credentials") {
    loginPage.setValue("@email", user.email);
    loginPage.setValue("@password", user.password);
  }
  return loginPage.click("@signInBtn");
});

When(/James press \"(.*)\" at (.*) page/, async (fieldId, pageId) => {
  const page = createPage(pageId);

  if (fieldId === "Need an account?") return page.click("@needAccountBtn");
  if (fieldId === "Edit profile settings")
    return page.click("@profileSettingsBtn");
  throw `field '${fieldId} is not defined'`;
});

Given(/(.*) has already logged in to conduit/, async (user) => {
  const response = await loginUser(user.toLowerCase());
  await client.execute(
    function () {
      return window.localStorage.setItem("jwt", arguments[0]);
    },
    [response.data.user.token]
  );
  return await client.refresh();
});

Given(/(.*) has not logged in at conduit/, (userId) => {
  const homePage = client.page.home();
  const user = getUser(userId.toLowerCase());
  return homePage.expect.section("@navBar").text.to.not.contain(user.username);
});
