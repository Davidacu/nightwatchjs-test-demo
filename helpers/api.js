const axios = require("axios").default;
const fs = require("fs");
let rawJson = fs.readFileSync("conduit.conf.json");
let json = JSON.parse(rawJson);
let apiUrl = json.env.apiUrl;
let user = json.users.james;

exports.registerUser = () => {
  let endpoint = `${apiUrl}/api/users`;
  let payload = { user };
  console.log("registering user...");
  return axios.post(endpoint, payload);
};

exports.loginUser = (userId = user) => {
  let endpoint = `${apiUrl}/api/users/login`;
  let payload = { user: { email: user.email, password: user.password } };
  console.log("login user...");
  return axios.post(endpoint, payload);
};
