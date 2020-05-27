const axios = require("axios").default;
const { client } = require("nightwatch-api");
const { apiUrl, getUser } = require("../helpers/data-loader");

exports.registerUser = (userId) => {
  let endpoint = `${apiUrl}/api/users`;

  let user = getUser(userId);
  let payload = { user };
  console.log("registering user...");
  return axios.post(endpoint, payload);
};

exports.loginUser = async (userId) => {
  let endpoint = `${apiUrl}/api/users/login`;
  let user = getUser(userId);
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

exports.publishArticle = async (article) => {
  const response = await this.registerUser(article.author);
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
  return axios.post(endpoint, payload, {
    headers: { authorization: `Token ${token}` },
  });
};

exports.postComment = async (userId, articleId, comment) => {
  const response = await this.registerUser(userId);
  const token = response.data.user.token;
  let endpoint = `${apiUrl}/api/articles/${articleId}/comments`;
  let payload = {
    comment: {
      body: comment,
    },
  };
  return axios.post(endpoint, payload, {
    headers: { authorization: `Token ${token}` },
  });
};

exports.favoriteArticle = async (articleId, userId) => {
  const _userId = userId.toLowerCase();
  let response = await this.registerUserIfNeeded(_userId);
  const token = response.data.user.token;
  let endpoint = `${apiUrl}/api/articles/${articleId.toLowerCase()}/favorite`;
  let payload = {};
  console.log("liking article....");
  return axios.post(endpoint, payload, {
    headers: { authorization: `Token ${token}` },
  });
};

exports.registerUserIfNeeded = async (userId) => {
  let response;

  try {
    response = await this.loginUser(userId);
  } catch (error) {
    if (error.response.status === 404) {
      response = await this.registerUser(userId);
    } else throw error;
  }
  return response;
};
