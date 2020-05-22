module.exports = {
  elements: {
    title: {
      selector: "h1",
    },
    author: {
      selector: 'a[class="author"]',
    },
    publishedDate: {
      selector: 'span[class="date"]',
    },
    editBtn: {
      selector: '//a[contains(@href,"editor/")]',
      locateStrategy: "xpath",
    },
    deleteBtn: {
      selector: '//button[contains(@class,"danger")]',
      locateStrategy: "xpath",
    },
    body: {
      selector: '//div[contains(@class,"article-content")]//p',
      locateStrategy: "xpath",
    },
    tags: {
      selector: '//ul[@class="tag-list"]',
      locateStrategy: "xpath",
    },
    comments: {
      selector: 'div[class="card"]',
    },
    commentTextArea: {
      selector: '//form[contains(@class,"comment-form")]//textarea',
      locateStrategy: "xpath",
    },
  },
};
