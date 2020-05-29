const { Given, When, Then } = require("cucumber");
const { client } = require("nightwatch-api");
let Api = require("../../helpers/api");
const { getArticleByAuthor, appUrl } = require("../../helpers/data-loader");

Given(/(.*) is following (.*)/, async (user, follower) => {
  const session = await Api.createSession(user);
  return await session.follow(follower);
});

Given(/(.*) is not following (.*)/, async (user, follower) => {
  const session = await Api.createSession(user);
  return await session.unFollow(follower);
});

Given(/(.*) has written an article/, async (user) => {
  const article = getArticleByAuthor(user.toLowerCase());
  const session = await Api.createSession(user);
  return await session.publishArticle(article);
});

When(/(.*) s.*s following (.*)/, async (user, follower) => {
  const profilePage = client.page.userProfile();
  await client.url(`${appUrl}/@${follower.toLowerCase()}`);
  return await profilePage.click("@followBtn");
});
