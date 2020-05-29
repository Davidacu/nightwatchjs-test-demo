"use strict";
const axios = require("axios").default;
const { apiUrl, getUser } = require("../helpers/data-loader");

class Api {
  constructor(token) {
    this.token = token;
  }

  static async createSession(userId) {
    const response = await Api.registerUserIfNeeded(userId);
    return new Api(response.data.user.token);
  }

  static registerUser(userId) {
    let endpoint = `${apiUrl}/api/users`;

    let user = getUser(userId);
    let payload = { user };
    console.log("registering user...");
    return axios.post(endpoint, payload);
  }

  static loginUser(userId) {
    let endpoint = `${apiUrl}/api/users/login`;
    let user = getUser(userId);
    let payload = { user: { email: user.email, password: user.password } };
    console.log("login user...");
    return axios.post(endpoint, payload);
  }

  publishArticle(article) {
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
      headers: { authorization: `Token ${this.token}` },
    });
  }

  postComment(articleId, comment) {
    let endpoint = `${apiUrl}/api/articles/${articleId}/comments`;
    let payload = {
      comment: {
        body: comment,
      },
    };
    return axios.post(endpoint, payload, {
      headers: { authorization: `Token ${this.token}` },
    });
  }

  favoriteArticle(articleId) {
    let endpoint = `${apiUrl}/api/articles/${articleId.toLowerCase()}/favorite`;
    let payload = {};
    console.log("liking article....");
    return axios.post(endpoint, payload, {
      headers: { authorization: `Token ${this.token}` },
    });
  }

  static async registerUserIfNeeded(userId) {
    let response;
    let _userId = userId.toLowerCase();

    try {
      response = await this.loginUser(_userId);
    } catch (error) {
      if (error.response.status === 404) {
        response = await this.registerUser(_userId);
      } else throw error;
    }
    return response;
  }

  unFollow(userId) {
    const _userId = userId.toLowerCase();
    let endpoint = `${apiUrl}/api/profiles/${_userId}/follow`;
    console.log(`unfollowing ${_userId}....`);
    return axios.delete(endpoint, {
      headers: { authorization: `Token ${this.token}` },
    });
  }
  follow(userId) {
    const _userId = userId.toLowerCase();
    let endpoint = `${apiUrl}/api/profiles/${_userId}/follow`;
    let payload = {};
    console.log(`following ${_userId}....`);
    return axios.post(endpoint, payload, {
      headers: { authorization: `Token ${this.token}` },
    });
  }
}

module.exports = Api;
