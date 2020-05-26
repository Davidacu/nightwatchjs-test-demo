const { appUrl } = require("../../helpers/data-loader");

const commands = {
  isAt: function () {
    return this.api.assert.urlEquals(this.url);
  },
};
module.exports = {
  commands: [commands],
  url: `${appUrl}/settings`,
  elements: {
    header: {
      selector: "h1",
    },
    picUrl: {
      selector: 'input[placeholder="URL of profile picture"]',
    },
    userName: {
      selector: 'input[placeholder="Username"]',
    },
    bio: {
      selector: 'textarea[placeholder="Short bio about you"]',
    },
    email: {
      selector: 'input[type="Email"]',
    },
    password: {
      selector: 'input[placeholder="New Password"]',
    },
    updateSettings: {
      selector: "button[type=submit]",
    },
    logOutBtn: {
      selector: "button[class=btn btn-outline-danger]",
    },
  },
};
