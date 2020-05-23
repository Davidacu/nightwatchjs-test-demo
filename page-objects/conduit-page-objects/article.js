const commands = {
  postComment: function (comment) {
    this.setValue("@commentTextArea", comment);
    return this.click("@postCommentBtn");
  },
  isCommentDisplayed: function (author, comment) {
    return this.expect
      .element({
        selector: `//a[@class="comment-author" and contains(text(),'${author}')]//ancestor::div[@class='card']//p`,
        locateStrategy: "xpath",
      })
      .text.to.equal(comment);
  },
  isCommentRemoved: function (author, comment) {
    return this.assert.not.elementPresent({
      selector: `//a[@class="comment-author" and contains(text(),'${author}')]//ancestor::div[@class='card']//p[@class='card-text' and contains(text(),'${comment}')]`,
      locateStrategy: "xpath",
    });
  },
  deleteComment: function (comment) {
    return this.click({
      selector: `//p[@class='card-text' and contains(text(),'${comment}')]//ancestor::div[@class='card']//i[@class='ion-trash-a']`,
      locateStrategy: "xpath",
    });
  },
};

module.exports = {
  commands: [commands],
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
    postCommentBtn: {
      selector: '//button[@class="btn btn-sm btn-primary"]',
      locateStrategy: "xpath",
    },
  },
};
