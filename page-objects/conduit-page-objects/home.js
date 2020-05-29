const fs = require("fs");
let rawJson = fs.readFileSync("conduit.conf.json");
let json = JSON.parse(rawJson);

const commands = {
  isAt: function () {
    return this.api.assert.urlEquals(this.url + "/");
  },
};

module.exports = {
  commands: [commands],
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
        newPost: {
          selector: 'a[href="/editor"]',
        },
        userPic: {
          selector: 'img[class="user-pic"]',
        },
      },
    },
  },
};
