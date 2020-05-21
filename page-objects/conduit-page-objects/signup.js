const fs = require("fs");
let rawJson = fs.readFileSync("conduit.conf.json");
let json = JSON.parse(rawJson);
let appUrl = json.env.appUrl;

const commands = {
  isAt: () => {
    this.assert.urlEquals(this.url);
  },
};

module.exports = {
  commands: [commands],
  url: `${appUrl}/register`,
  elements: {
    header: {
      selector: "h1",
    },
    username: {
      selector: 'input[placeholder="Username"]',
    },
    email: {
      selector: 'input[placeholder="Email"]',
    },
    password: {
      selector: 'input[placeholder="Password"]',
    },
    signUpBtn: {
      selector: 'button[type="submit"]',
    },
    errorMsg: {
      selector: 'ul[class="error-messages"]',
    },
  },
};
