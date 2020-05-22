Feature: Register

    Validates Successfull registration to conduit with valid credentials
    Validates all required fields in Sign up form
    Validates invalid input on email
    Validates you cannot register with an existing registered email

    @conduit
    Scenario: Register a user with valid credentials
        Given James is at the Sign up page
        When James sign up with valid credentials
        Then James registered username is shown at navigation bar
        And the navigation bar displays "Home"
        And the navigation bar displays "New Post"
        And the navigation bar displays "Settings"
        And the navigation bar does not display "Sign in"
        And the navigation bar does not display "Sign Up"
        And Your Feed is empty

    @conduit
    Scenario: Should provide valid email for Registration
        Given James is at the Sign up page
        When James sign up with invalid email
        Then error message "email must be a valid email" is shown

    @conduit
    Scenario: Email should be required
        Given James is at the Sign up page
        When James sign up with empty email
        Then error message "email is required" is shown


    @conduit
    Scenario: Username should be required
        Given James is at the Sign up page
        When James sign up with empty username
        Then error message "username is required" is shown

    @conduit
    Scenario: Password should be required
        Given James is at the Sign up page
        When James sign up with empty password
        Then error message "password is required" is shown

    @conduit
    Scenario: Should fail registration if email is already registered
        Given that James has already registered to Conduit app
        And James has not logged in at conduit
        And James is at the Sign up page
        When James sign up with valid credentials
        Then error message "email is already registered" is shown
## actually conduit returns conflict Conflict on this scenario,
## seems like the backend handles this case but it doesn't return an appropiate message