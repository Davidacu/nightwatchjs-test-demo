const { client } = require('nightwatch-api');
const { Given, Then, When } = require('cucumber');


Given(/I launched the (.*) from (.*) machine/,async(siteId,machineId)=>{
    let google = client.page.google();
    await google.navigate();

});