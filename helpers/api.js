const axios = require("axios").default;
const { client } = require("nightwatch-api");
const fs = require("fs");
let rawJson = fs.readFileSync("conduit.conf.json");
let json = JSON.parse(rawJson);
let apiUrl = json.env.apiUrl;
let user = json.users.james;
let article = json.articles.nightwatch;

exports.registerUser = () => {
  let endpoint = `${apiUrl}/api/users`;
  let payload = { user };
  console.log("registering user...");
  return axios.post(endpoint, payload);
};

exports.loginUser = async (userId = user) => {
  let endpoint = `${apiUrl}/api/users/login`;
  let payload = { user: { email: user.email, password: user.password } };
  console.log("login user...");
  const response = await axios.post(endpoint, payload);
  await client.execute(
    function () {
      return window.localStorage.setItem("jwt", arguments[0]);
    },
    [response.data.user.token]
  );

  return client.refresh();
};

exports.publishArticle = async (userId = user) => {
  const response = await this.registerUser();
  const token = response.data.user.token;
  let endpoint = `${apiUrl}/api/articles`;
  let payload = {
    article: {
      title: article.title,
      description: article.description,
      body: article.body,
      tagList: article.tagList,
    },
  };
  console.log("publishing article...");
  await axios.post(endpoint, payload, {
    headers: { authorization: `Token ${token}` },
  });
  return this.loginUser();
};
