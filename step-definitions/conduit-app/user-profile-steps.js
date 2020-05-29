const { Given, When, Then } = require("cucumber");
const { client } = require("nightwatch-api");

When(/(.*) opens his profile via top navigation/, async (user) => {
  const homePage = client.page.home();
  const topNav = homePage.section.navBar;
  return topNav.click("@userPic");
});

When(/(.*) opens (.*) profile from (.*)/, async (user, author, targetFeed) => {
  const articleFeed = client.page.articleFeed();
  await articleFeed.openFeed(targetFeed);
  await articleFeed.openProfileByAuthor(author);
});

When(/(.*) opens his favorited articles/, async (user) => {
  const homePage = client.page.home();
  const topNav = homePage.section.navBar;
  const articleFeed = client.page.articleFeed();

  await topNav.click("@userPic");
  await articleFeed.openFeed("Favorited Articles");
});
Then(/(.*) profile is loaded properly/, async (user) => {
  const userProfilePage = client.page.userProfile();
  const articleFeed = client.page.articleFeed();

  userProfilePage.assert.containsText("@userName", user.toLowerCase());
  articleFeed.assert.containsText("@activeFeed", "My Articles");
});
