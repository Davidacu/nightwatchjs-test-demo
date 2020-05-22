const { Given, Then } = require("cucumber");
const { createPage } = require("../../helpers/page-factory");

Given(/James is at the (.*) page/, async (pageId) => {
  const page = createPage(pageId);
  return page.navigate();
});
Then(/the (.*) page is shown/, async (pageId) => {
  const page = createPage(pageId);
  return page.isAt();
});
