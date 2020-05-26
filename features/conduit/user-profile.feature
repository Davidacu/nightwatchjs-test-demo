Feature: User Profile

    Access to user profile
    and My Articles feed

    @conduit
    Scenario: James can access his profile via top navigation
        Given James has already registered to Conduit app
        And James has already logged in to conduit
        When James opens his profile via top navigation
        Then James profile is loaded properly

    @conduit
    Scenario: John can access James profile via James article
        Given John has already registered to Conduit app
        And John has already logged in to conduit
        And a new article posted by James is displayed at the global feed
        When John opens James profile from Global Feed
        Then James profile is loaded properly
    @conduit
    Scenario: James can open profile settings from his profile
        Given James has already registered to Conduit app
        And James has already logged in to conduit
        When James opens his profile via top navigation
        And James press "Edit profile settings" at profile page
        Then the settings page is shown

    @conduit
    Scenario: John cannot open James profile setings from James profile
        Given John has already registered to Conduit app
        And John has already logged in to conduit
        And a new article posted by James is displayed at the global feed
        When John opens James profile from Global Feed
        Then John cannot see "Edit profile settings" at James profile page

    @conduit
    Scenario: "My articles" should be empty for new accounts
        Given James has already registered to Conduit app
        And James has already logged in to conduit
        When James opens his profile via top navigation
        Then "My Articles" is empty

    @conduit
    Scenario: Jame's new article should appear in his profile at My articles
        Given a new article posted by James is currently displayed
        And James has already logged in to conduit
        When James opens his profile via top navigation
        Then James new article is displayed at "My Articles"
    @conduit
    Scenario: John's new article should not appear in My articles art James profile
        Given a new article posted by John is currently displayed
        And a new article posted by James is displayed at the global feed
        And John has already logged in to conduit
        When John opens James profile from Global Feed
        Then John new article is not displayed at "My Articles"
        But James new article is displayed at "My Articles"