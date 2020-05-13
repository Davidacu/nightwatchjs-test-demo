Feature: Register

    As an end user that tries to post articles in Conduit app, I want to be able to register to the app

    @conduit
    Scenario: Register a user with valid credentials
        Given that James has navigated to the "Conduit Home" page
        When James sign up with valid credentials
        Then James registered username is shown at navigation bar
        And the navigation bar displays "Home"
        And the navigation bar displays "New Post"
        And the navigation bar displays "Settings"
        And the navigation bar does not display "Sign in"
        And the navigation bar does not display "Sign Up"
        And Your Feed is empty