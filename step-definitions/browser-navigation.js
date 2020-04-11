const { client } = require('nightwatch-api');
const { Given, Then, When } = require('cucumber');


Given(/I launched the (.*) from (.*) machine/,async(siteId,machineId)=>{
await client.url("http://google.com");
});