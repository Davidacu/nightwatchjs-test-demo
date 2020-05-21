const { client } = require("nightwatch-api");

exports.createPage = function (pageId) {
  switch (pageId.toLowerCase()) {
    case "sign up":
      return client.page.signup();
    case "home":
      return client.page.home();
  }
};
