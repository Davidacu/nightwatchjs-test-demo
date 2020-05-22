const fs = require("fs");
let rawJson = fs.readFileSync("conduit.conf.json");
let json = JSON.parse(rawJson);

module.exports = {
  url: `${json.env.appUrl}/login`,
  elements: {
    header: {
      selector: "h1",
    },
    email: {
      selector: 'input[placeholder="Email"]',
    },
    password: {
      selector: 'input[placeholder="Password"]',
    },
    signInBtn: {
      selector: 'button[type="submit"]',
    },
    needAccountBtn: {
      selector: '//a[contains(text(),"Need an account?")]',
      locateStrategy: "xpath",
    },
  },
};
