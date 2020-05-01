Feature: Google search

   @webdriver
   Scenario: As an User that forgot the nightwatch web url, I want to search for it on google and go to the actual url in the search results
      Given I navigate to google home page
      When I type in "nightwatch" on "search bar" at Google home area

   @webdriver
   Scenario: As an User that forgot the nodejs web url, I want to search for it on google and go to the actual url in the search results
      Given I navigate to google home page
      When I type in "nodeJs" on "search bar" at Google home area