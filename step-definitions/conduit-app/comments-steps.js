const { Given, When, Then } = require("cucumber");
const { client } = require("nightwatch-api");
const {
  getCommentByAuthor,
  getArticleByAuthor,
  appUrl,
} = require("../../helpers/data-loader");
let Api = require("../../helpers/api");

Given(
  /(.*) has posted a comment in an article written by (.*)/,
  async (user, author) => {
    const authorSession = await Api.createSession(author);
    const userSession = await Api.createSession(user);
    const comment = getCommentByAuthor(user.toLowerCase());
    const article = getArticleByAuthor(author.toLowerCase());

    await authorSession.publishArticle(article);
    return await userSession.postComment(article.title.toLowerCase(), comment);
  }
);

Given(/the article written by (.*) is currently displayed/, async (author) => {
  const article = getArticleByAuthor(author.toLowerCase());
  return client.url(`${appUrl}/article/${article.title.toLowerCase()}`);
});

When(/(.*) posts a comment/, async (author) => {
  const articlePage = client.page.article();
  const comment = getCommentByAuthor(author.toLowerCase());

  return await articlePage.postComment(comment);
});

Then(/the comment written by (.*) is removed/, async (author) => {
  const articlePage = client.page.article();
  const comment = getCommentByAuthor(author.toLowerCase());

  return articlePage.isCommentRemoved(author.toLowerCase(), comment);
});
When(/(.*) deletes his comment/, async (author) => {
  const articlePage = client.page.article();
  const comment = getCommentByAuthor(author.toLowerCase());

  return articlePage.deleteComment(comment);
});
Then(/the comment written by (.*) is shown/, async (author) => {
  const articlePage = client.page.article();
  const comment = getCommentByAuthor(author.toLowerCase());

  return articlePage.isCommentDisplayed(author.toLowerCase(), comment);
});

Then(/the article has now (.*) comment/, async (commentCount) => {
  const articlePage = client.page.article();
  return articlePage.expect
    .elements("@comments")
    .count.to.equal(parseInt(commentCount));
});

Then(/(.*) can delete his comment/, async (author) => {
  const articlePage = client.page.article();
  const comment = getCommentByAuthor(author.toLowerCase());
  return articlePage.assert.elementPresent({
    selector: `//p[@class='card-text' and contains(text(),'${comment}')]//ancestor::div[@class='card']//i[@class='ion-trash-a']`,
    locateStrategy: "xpath",
  });
});

Then(/(.*) cannot delete the comment written by (.*)/, async (user, author) => {
  const articlePage = client.page.article();
  const comment = getCommentByAuthor(author.toLowerCase());
  return articlePage.assert.not.elementPresent({
    selector: `//p[@class='card-text' and contains(text(),'${comment}')]//ancestor::div[@class='card']//i[@class='ion-trash-a']`,
    locateStrategy: "xpath",
  });
});
