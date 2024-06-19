Feature: Current Weather API Validation

  Scenario: Valid API Request
    Given I send a request with a valid city name "Paris"
    Then the status code should be 200
    And the response should contain the expected fields

  Scenario: Invalid Location
    Given I send a request with an invalid city name "Invalid"
    Then the status code should be 400
    And the response should contain an error message

  Scenario: Missing API Key
    Given I send a request without an API key
    Then the status code should be 401
    And the response should contain a missing API key error message

  Scenario: Invalid API Key
    Given I send a request with an invalid API key
    Then the status code should be 403
    And the response should contain an invalid API key error message

  Scenario: Response Time Validation
    Given I send a request with a valid city name "London"
    Then the response time should be within 1000ms