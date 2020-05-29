Feature: Login

    @conduit
    Scenario: Password is required for Login
        Given James is at the Login page
        When James attemps to login with empty password
        Then error message "password is required" is shown

    @conduit
    Scenario: Email is required for login
        Given James is at the Login page
        When James attemps to login with empty email
        Then error message "email is required" is shown

    @conduit
    Scenario: Login should fail when entering incorrect password
        Given James has already registered to Conduit app
        And James is at the Login page
        When James attemps to login with incorrect password
        Then error message "email or password is incorrect" is shown
    #actual error message returned is "Error user not found" - doesn't seem appropiate

    @conduit
    Scenario: James should log in successfully when entering correct credentials
        Given James has already registered to Conduit app
        And James is at the Login page
        When James attemps to login with correct credentials
        Then James registered username is shown at navigation bar
        And the navigation bar displays "Home"
        And the navigation bar displays "New Post"
        And the navigation bar displays "Settings"
        And the navigation bar does not display "Sign in"
        And the navigation bar does not display "Sign Up"

    @conduit
    Scenario: Can switch to Sign up by click on 'Need an account?'
        Given James is at the Login page
        When James press "Need an account?" at Login page
        Then the Sign up page is shown