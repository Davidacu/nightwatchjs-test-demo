module.exports = {
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
