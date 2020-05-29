Feature: Followers

    Follow a user
    Unfollow a user
    Your Feed
    Global Feed

    @conduit
    Scenario: James timeline shows posts from John
        Given John has written an article
        And James is not following John
        And James has already logged in to conduit
        When James starts following John
        And James navigates to conduit home page
        Then the user timeline shows articles written by John

    @conduit
    Scenario: James timeline removes posts from John when unfollowed
        Given John has written an article
        And James is following John
        And James has already logged in to conduit
        When James stops following John
        And James navigates to conduit home page
        Then the user timeline does not show articles written by John