#language: en
Feature: SauceDemo Checkout Process

  Background: Access SauceDemo and Log in
    Given user is on the SauceDemo login page
    When user enters valid credentials
    And user clicks the login button
    Then user should be redirected to the inventory page
  
  Scenario: Shopping Cart Management
    Given user is on the inventory page
    When user views the product catalog
    Then all items should be displayed

    Given user adds a Labs Backpack to the cart
    Then the item should be added to the cart
    When user removes the item from the cart
    Then the cart should be empty

  Scenario: Complete Checkout Process
    Given user is on the inventory page
    When user views the product catalog
    Then all items should be displayed

    Given user adds Labs Bike Light to the cart
    And user has an item in the cart
    When user proceeds to checkout
    And user completes the checkout process
    Then user should see a confirmation message

    When user logs out
    Then user should be redirected to the login page
