const { Given, When, Then } = require("cucumber");
const { client } = require("nightwatch-api");
const fs = require("fs");
const rawJson = fs.readFileSync("conduit.conf.json");
const config = JSON.parse(rawJson);
const article = config.articles.nightwatch;
const appUrl = config.env.appUrl;
const {
  registerUser,
  loginUser,
  publishArticle,
} = require("../../helpers/api");

Given(
  /an article posted by (.*) is displayed at the global feed/,
  async (user) => {
    const homePage = client.page.home();

    await publishArticle(user.toLowerCase());
    homePage.click("@globalFeedBtn");
  }
);

When(/(.*) opens (.*) article/, async (user, author) => {
  const homePage = client.page.home();
  return homePage.openArticleByAuthor(author);
});
When(/James publishes a new article/, async () => {
  const homePage = client.page.home();
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

Then(/James new article is loaded properly/, async () => {
  const articlePage = client.page.article();
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

Given(/an article posted by (.*) is currently displayed/, async (user) => {
  await publishArticle(user.toLowerCase());
  return client.url(`${appUrl}/article/${article.title.toLowerCase()}`);
});

Given(/Jame's article is open/, async () => {});

When(/James edits the article/, async () => {
  const articlePage = client.page.article();
  const editorPage = client.page.articleEditor();

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

Then(/James article is updated/, async () => {
  const articlePage = client.page.article();
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

Then(/Jame's article is not longer shown/, async () => {
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
