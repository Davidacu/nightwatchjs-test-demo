const commands = {
  openArticleByAuthor: function (author) {
    return this.click({
      selector: `//a[contains(@class,'author') and contains(@href,${author})]//ancestor::div[@class='article-preview']//a[@class='preview-link']//h1`,
      locateStrategy: "xpath",
    });
  },
  openProfileByAuthor: function (author) {
    return this.click({
      selector: `//a[@class='author' and contains(@href,'${author.toLowerCase()}')]`,
      locateStrategy: "xpath",
    });
  },
  openFeed: function (feedId) {
    return this.click({
      selector: `//a[contains(text(),"${feedId}")]`,
      locateStrategy: "xpath",
    });
  },
  likeArticleByAuthor: function (author) {
    return this.click({
      selector: `//a[contains(@class,'author') and contains(@href,'${author.toLowerCase()}')]//ancestor::div[@class='article-preview']//i[@class='ion-heart']`,
      locateStrategy: "xpath",
    });
  },
  getLikesByArticle: async function (article) {
    let value;
    this.waitForElementPresent({
      selector: `//a[contains(@class,'author') and contains(@href,'${article.author}')]//ancestor::div[@class='article-preview']//h1[contains(text(),'${article.title}')]`,
      locateStrategy: "xpath",
    });
    return this.getText(
      {
        selector: `//a[contains(@class,'author') and contains(@href,'${article.author}')]//ancestor::div[@class='article-preview']//h1[contains(text(),'${article.title}')]`,
        locateStrategy: "xpath",
      },
      function (result) {
        console.log("result:", result);
        value = result.value;
        return value;
      }
    );
  },
};
module.exports = {
  commands: [commands],
  elements: {
    navItems: {
      selector: 'div[class="articles-toggle"] a',
    },
    articles: {
      selector: 'div[class="article-preview"]',
    },
    activeFeed: {
      selector: 'a[class="nav-link active"]',
    },
    globalFeedBtn: {
      selector: '//a[contains(text(),"Global Feed")]',
      locateStrategy: "xpath",
    },
    yourFeed: {
      selector: '//a[contains(text(),"Your Feed")]',
      locateStrategy: "xpath",
    },
    myArticles: {
      selector: '//a[contains(text(),"My Articles")]',
      locateStrategy: "xpath",
    },
    favoritedArticles: {
      selector: '//a[contains(text(),"Favorited Articles")]',
      locateStrategy: "xpath",
    },
  },
};
