const fs = require("fs");
let rawJson = fs.readFileSync("conduit.conf.json");
let json = JSON.parse(rawJson);

module.exports = {
  url: json.env.appUrl,
  sections: {
    navBar: {
      selector: '//nav[contains(@class,"navbar")]',
      locateStrategy: "xpath",
      elements: {
        signUpBtn: {
          selector: 'a[href="/register"]',
        },
        signInBtn: {
          selector: 'a[href="/login"]',
        },
        homeBtn: {
          selector: 'a[href="/"]',
        },
      },
    },
  },
  elements: {
    activeFeed: {
      selector: 'a[class="nav-link active"]',
    },
    articles: {
      selector: 'div[class="article-preview"]',
    },
  },
};
