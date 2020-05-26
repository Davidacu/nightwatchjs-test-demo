const { client } = require("nightwatch-api");

exports.createPage = function (pageId) {
  const _pageId = pageId.toLowerCase();

  if (_pageId.includes("sign up")) return client.page.signup();
  if (_pageId.includes("home")) return client.page.home();
  if (_pageId.includes("login")) return client.page.login();
  if (_pageId.includes("profile")) return client.page.userProfile();
  if (_pageId.includes("settings")) return client.page.settings();

  throw `Page '${pageId}' not supported`;
};
