const { client } = require("nightwatch-api");
const { When } = require("cucumber");

When(
  /I type in "([^"]*)" on "([^"]*)" at Google home area$/,
  async (value, elementId) => {
    let google = client.page.google();

    switch (elementId.toLowerCase()) {
      case "search bar":
        await google.type("@searchBar", value);
      default:
        break;
    }
  }
);
