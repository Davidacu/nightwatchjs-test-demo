Feature: Comments

    Users can post comments on articles

    @conduit
    Scenario: John can write a post in James article
        Given an article posted by James is currently displayed
        And John has already registered to Conduit app
        And John has already logged in to conduit
        When John posts a comment
        Then the comment written by John is shown
        And the article has now 1 comment

    @conduit
    Scenario: James can write a post after Jhon's comment
        Given John has posted a comment in an article written by James
        And the article written by James is currently displayed
        And James has already logged in to conduit
        When James posts a comment
        Then the comment written by james is shown
        Then the comment written by john is shown
        And the article has now 2 comments

    @conduit
    Scenario: James can delete his own comment
        Given James has posted a comment in an article written by John
        And the article written by John is currently displayed
        And James has already logged in to conduit
        When James deletes his comment
        Then the comment written by james is removed
        And the article has now 0 comments

    @conduit
    Scenario: James cannot delete Johns comment
        Given John has posted a comment in an article written by James
        And the article written by James is currently displayed
        And James has already logged in to conduit
        When James posts a comment
        Then James can delete his comment
        But James cannot delete the comment written by John
