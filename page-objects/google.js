
  let typeInCommand = {
    type: function(elementId,value) {
      
      return this.waitForElementVisible(elementId,1000)
        .clearValue(elementId)
        .setValue(elementId,value)
    }
  };

module.exports = {
    url: 'https://google.com',
    commands:[typeInCommand],
    elements: {
      searchBar:{
        selector:"//input[@name='q']",
        locateStrategy: 'xpath'
      },
    }
  };
