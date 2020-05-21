const { Then } = require("cucumber");
const { createPage } = require("../../helpers/page-factory");

Then(/the (.*) page is shown/, async (pageId) => {
  const page = createPage(pageId);
  return page.isAt();
});
