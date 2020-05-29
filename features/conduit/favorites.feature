Feature: Favorites

    Favorited Articles at User profile

    @conduit
    Scenario: When James likes an article it appears at his profile
        Given James has already registered to Conduit app
        And James has already logged in to conduit
        And a new article posted by John is displayed at the global feed
        When James likes an article written by John
        And James opens his favorited articles
        Then the article written by John is displayed at "Favorited Articles"

    @conduit
    Scenario: When James un-like an article it disappears from his profile
        Given a new article written by John has been favorited by James
        And James has already logged in to conduit
        And the "Global Feed" is displayed
        When James unlikes an article written by John
        And James opens his favorited articles
        Then the article written by John is not displayed at "Favorited Articles"

    @conduit
    Scenario: Likes in an article increases to 5
        Given James has already registered to Conduit app
        And James has already logged in to conduit
        And an article written by John has been favorited by David,Hector,Sam,Kaitlin
        And the "Global Feed" is displayed
        When James likes an article written by John
        Then the article written by John has now 5 likes
    @conduit
    Scenario: Likes in an article decreases to 3
        Given an article written by John has been favorited by James,Hector,Sam,Kaitlin
        And james has already logged in to conduit
        And the "Global Feed" is displayed
        When James unlikes an article written by John
        Then the article written by John has now 3 likes
