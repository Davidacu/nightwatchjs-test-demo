const fs = require("fs");
let rawJson = fs.readFileSync("conduit.conf.json");
let json = JSON.parse(rawJson);

exports.apiUrl = json.env.apiUrl;
exports.appUrl = json.env.appUrl;
exports.getCommentByAuthor = function (author) {
  return json.comments[author].body;
};

exports.getArticleByAuthor = function (author) {
  return Object.values(json.articles).filter(
    (e) => e.author == author.toLowerCase()
  )[0];
};

exports.getUser = function (userId) {
  return json.users[userId];
};
