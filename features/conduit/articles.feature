Feature: Articles
    Create new post (Article)
    Edit Article
    Delete Article

    @conduit
    Scenario: Create new post requires login first
        Given that James has not logged in at conduit
        When James navigates to conduit home page
        Then the navigation bar does not display "New Post"

    @conduit
    Scenario: Create new post
        Given that James has already logged in to conduit
        When James publishes a new article
        Then James new article is loaded properly
        And James new article does not have any comments

    @conduit
    Scenario: Edit Post
        Given that James has just published an article at conduit
        And Jame's article is open
        When James edits the article
        Then James article is updated

    @conduit
    Scenario: Delete Post
        Given that James has just published an article at conduit
        And Jame's article is open
        When James deletes the article
        Then Jame's article is not longer shown
        And the Home page is shown