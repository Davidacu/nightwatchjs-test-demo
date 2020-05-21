let commands = {
  removeTagByName: function (tag) {
    return this.click({
      selector: `//span[contains(text(),'${tag}')]//i`,
      locateStrategy: "xpath",
    });
  },
};
module.exports = {
  commands: [commands],
  elements: {
    articleTitle: {
      selector: 'input[placeholder="Article Title"]',
    },
    articleAbout: {
      selector: '//input[contains(@placeholder,"this article about?")]',
      locateStrategy: "xpath",
    },
    articleBody: {
      selector: "textarea",
    },
    articleTags: {
      selector: 'input[placeholder="Enter tags"]',
    },
    publishBtn: {
      selector: '//button[contains(text(),"Publish Article")]',
      locateStrategy: "xpath",
    },
  },
};
