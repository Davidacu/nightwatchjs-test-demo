const { Given, Then } = require("cucumber");
const { createPage } = require("../../helpers/page-factory");
const { getArticleByAuthor } = require("../../helpers/data-loader");
const { client } = require("nightwatch-api");

Given(/James is at the (.*) page/, async (pageId) => {
  const page = createPage(pageId);
  return page.navigate();
});

Given(/the \"(.*)\" is displayed/, async (feedId) => {
  const articleFeed = client.page.articleFeed();
  await articleFeed.openFeed(feedId);
});
Then(/the (.*) page is shown/, async (pageId) => {
  const page = createPage(pageId);
  return page.isAt();
});
Then(
  /(.*) cannot see \"(.*)\" at (.*) page/,
  async (userId, elementId, pageId) => {
    const page = createPage(pageId);
    switch (elementId.toLowerCase()) {
      case "edit profile settings":
        return page.assert.not.elementPresent("@profileSettingsBtn");
    }
    throw `element '${elementId}' not supported`;
  }
);

Then(
  /the article written by (.*) is displayed at \"(.*)\"/,
  async (author, feedId) => {
    const articleFeed = client.page.articleFeed();
    const article = getArticleByAuthor(author.toLowerCase());

    articleFeed.expect.element("@activeFeed").text.to.equal(feedId);
    articleFeed.assert.containsText("@articles", article.title);
    articleFeed.assert.containsText("@articles", article.author);
  }
);

Then(
  /the article written by (.*) is not displayed at \"(.*)\"/,
  async (author, feedId) => {
    const articleFeed = client.page.articleFeed();
    const article = getArticleByAuthor(author.toLowerCase());

    articleFeed.expect.element("@activeFeed").text.to.equal(feedId);
    articleFeed.assert.not.containsText("@articles", article.title);
    articleFeed.assert.not.containsText("@articles", article.author);
  }
);
