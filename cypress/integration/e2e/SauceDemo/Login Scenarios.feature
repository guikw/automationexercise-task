#language: en
Feature: Login Experience in SauceDemo

  Scenario: Successful Login and Logout Flow
    Given user is on the SauceDemo login page
    When user enters valid credentials
    And user clicks the login button
    Then user should be redirected to the inventory page

    When user logs out
    Then user should be redirected to the login page

  Scenario: Login Attempt for Locked Out User
    Given user is on the SauceDemo login page
    When user enters a locked user credentials
    And user clicks the login button
    Then user should see a locked error message

  Scenario: Handling Invalid Login Attempts
    Given user is on the SauceDemo login page
    When user enters invalid credentials
    And user clicks the login button
    Then user should see an error message