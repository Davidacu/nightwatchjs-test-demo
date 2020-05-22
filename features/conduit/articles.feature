Feature: Articles
    Create new post (Article)
    Edit Article
    Delete Article

    @conduit
    Scenario: Create new post requires login first
        Given James has not logged in at conduit
        When James navigates to conduit home page
        Then the navigation bar does not display "New Post"

    @conduit
    Scenario: Create new post
        Given James has already registered to Conduit app
        And James has already logged in to conduit
        When James publishes a new article
        Then James new article is loaded properly
        And James new article does not have any comments

    @conduit
    Scenario: James can edit his post
        Given an article posted by James is currently displayed
        And James has already logged in to conduit
        When James edits the article
        Then James article is updated

    @conduit
    Scenario: Delete Post
        Given an article posted by James is currently displayed
        And James has already logged in to conduit
        When James deletes the article
        Then Jame's article is not longer shown
        And the Home page is shown

    @conduit
    Scenario: John cannot delete or edit Jame's Article
        Given John has already registered to Conduit app
        And John has already logged in to conduit
        And an article posted by James is displayed at the global feed
        When John opens James article
        Then James new article is loaded properly
        But John cannot delete the article
        And John cannot edit the article

