const { Given, When, Then } = require("cucumber");
const { client } = require("nightwatch-api");
const {
  getArticleByAuthor,
  getUser,
  appUrl,
} = require("../../helpers/data-loader");
let Api = require("../../helpers/api");
let assert = require("assert");

Given(
  /a new article posted by (.*) is displayed at the global feed/,
  async (user) => {
    const homePage = client.page.home();
    const articleFeed = client.page.articleFeed();
    const article = getArticleByAuthor(user.toLowerCase());
    const session = await Api.createSession(user);
    await session.publishArticle(article);
    await homePage.navigate();
    return await articleFeed.click("@globalFeedBtn");
  }
);

When(/(.*) opens (.*) article$/, async (user, author) => {
  const articleFeed = client.page.articleFeed();
  return articleFeed.openArticleByAuthor(author);
});
When(/(.*) publishes a new article/, async (user) => {
  const homePage = client.page.home();
  const article = getArticleByAuthor(user.toLowerCase());
  const navBar = homePage.section.navBar;
  const newPost = client.page.articleEditor();
  navBar.click("@newPost");

  newPost.setValue("@articleTitle", article.title);
  newPost.setValue("@articleAbout", article.description);
  newPost.setValue("@articleBody", article.body);
  article.tagList.forEach((element) => {
    newPost.setValue("@articleTags", element);
    newPost.setValue("@articleTags", client.Keys.ENTER);
  });

  return await newPost.click("@publishBtn");
});

Then(/(.*) new article is loaded properly/, async (user) => {
  const articlePage = client.page.article();
  const article = getArticleByAuthor(user.toLowerCase());
  const today = new Date();
  const format = {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "2-digit",
  };
  const publishedDate = today
    .toLocaleDateString("end-US", format)
    .split(",")
    .join("");

  client.verify.urlContains(`/article/${article.title.toLowerCase()}`);
  articlePage.verify.containsText("@title", article.title);
  articlePage.verify.containsText("@body", article.body);
  articlePage.verify.containsText("@author", article.author);

  article.tagList.forEach((tag) => {
    articlePage.verify.containsText("@tags", tag);
  });
  return articlePage.expect
    .element("@publishedDate")
    .text.to.equal(publishedDate);
});

Given(/a new article posted by (.*) is currently displayed/, async (user) => {
  const article = getArticleByAuthor(user.toLowerCase());
  const session = await Api.createSession(user);
  await session.publishArticle(article);
  return client.url(`${appUrl}/article/${article.title.toLowerCase()}`);
});

Given(/Jame's article is open/, async () => {});

When(/(.*) edits the article/, async (user) => {
  const articlePage = client.page.article();
  const editorPage = client.page.articleEditor();
  const article = getArticleByAuthor(user.toLowerCase());
  //go to edit article page
  articlePage.click("@editBtn");

  //edit title,description,and body
  editorPage.clearValue("@articleTitle");
  editorPage.setValue("@articleTitle", article.title + "-edited");
  editorPage.clearValue("@articleAbout");
  editorPage.setValue("@articleAbout", article.description + "-edited");

  editorPage.clearValue("@articleBody");
  editorPage.setValue("@articleBody", article.body + "-edited");
  //remove first tag
  editorPage.removeTagByName("nightwatchjs");
  //add a new tag
  editorPage.setValue("@articleTags", "newTag");
  editorPage.setValue("@articleTags", client.Keys.ENTER);
  //publish article
  return await editorPage.click("@publishBtn");
});
Then(/James new article does not have any comments/, async () => {
  const articlePage = client.page.article();
  return articlePage.assert.not.elementPresent("@comments");
});

Then(/(.*) article is updated/, async (user) => {
  const articlePage = client.page.article();
  const article = getArticleByAuthor(user.toLowerCase());
  const today = new Date();
  const format = {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "2-digit",
  };
  const publishedDate = today
    .toLocaleDateString("end-US", format)
    .split(",")
    .join("");

  client.verify.urlContains(`/article/${article.title.toLowerCase()}-edited`);
  articlePage.verify.containsText("@title", article.title + "-edited");
  articlePage.verify.containsText("@body", article.body + "-edited");
  articlePage.verify.containsText("@author", article.author);

  //the first tag was removed so it should not be shown
  articlePage.verify.not.containsText("@tags", article.tagList[0]);

  //the second and third tag should be shown
  articlePage.verify.containsText("@tags", article.tagList[1]);
  articlePage.verify.containsText("@tags", article.tagList[2]);

  //there is a third one that was added when editing the article
  articlePage.verify.containsText("@tags", "newTag");

  return articlePage.expect
    .element("@publishedDate")
    .text.to.equal(publishedDate);
});

When(/(.*) deletes the article/, async (user) => {
  const articlePage = client.page.article();
  return articlePage.click("@deleteBtn");
});

Then(/(.*) article is not longer shown/, async (user) => {
  const article = getArticleByAuthor(user.toLowerCase());
  return client.assert.not.urlContains(
    `/article/${article.title.toLowerCase()}`
  );
});

Then(/John cannot delete the article/, async () => {
  const articlePage = client.page.article();
  return articlePage.assert.not.elementPresent("@deleteBtn");
});

Then(/John cannot edit the article/, async () => {
  const articlePage = client.page.article();
  return articlePage.assert.not.elementPresent("@editBtn");
});

When(/.* .*likes an article written by (.*)/, async (author) => {
  const articleFeed = client.page.articleFeed();

  await articleFeed.likeArticleByAuthor(author);
});

Given(
  /a new article written by (.*) has been favorited by (.*)/,
  async (author, user) => {
    const article = getArticleByAuthor(author);
    const authorSession = await Api.createSession(author);
    const userSession = await Api.createSession(user);

    await authorSession.publishArticle(article);
    await userSession.favoriteArticle(article.title);
  }
);

Given(
  /an article written by (.*) has been favorited by (.*)/,
  async (author, users) => {
    const article = getArticleByAuthor(author);
    const userArr = users.split(",");
    let promises = [];

    const authorSession = await Api.createSession(author);
    await authorSession.publishArticle(article);

    for (const user of userArr) {
      let userSession = await Api.createSession(user);
      let promise = userSession.favoriteArticle(article.title);
      promises.push(promise);
    }

    return await Promise.all(promises);
  }
);

Then(
  /the article written by (.*) has now (.*) likes/,
  async (author, likeCount) => {
    const article = getArticleByAuthor(author);
    const articleFeed = client.page.articleFeed();
    let actualCount;
    //const actualCount = await articleFeed.getLikesByArticle(article);
    await articleFeed.getText(
      {
        selector: `//a[contains(@class,'author') and contains(@href,'${article.author}')]//ancestor::div[@class='article-preview']//h1[contains(text(),'${article.title}')]//ancestor::div[@class='article-preview']//button`,
        locateStrategy: "xpath",
      },
      function (result) {
        actualCount = result.value;
      }
    );
    assert.equal(
      actualCount,
      likeCount,
      `expected ${likeCount} likes but found ${actualCount}`
    );
  }
);

Then(/the user timeline shows articles written by (.*)/, async (author) => {
  const articleFeed = client.page.articleFeed();
  articleFeed.expect.element("@activeFeed").text.to.equal("Your Feed");
  articleFeed.assertTimelineHasPostsFrom(author);
});

Then(
  /the user timeline does not show articles written by (.*)/,
  async (author) => {
    const articleFeed = client.page.articleFeed();
    articleFeed.expect.element("@activeFeed").text.to.equal("Your Feed");
    articleFeed.assertTimelineHasNotPostsFrom(author);
  }
);
