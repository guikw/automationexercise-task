import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

// API Steps ||

Given('I send a request with a valid city name {string}', (city) => {
    cy.validRequest(city)
})

Given('I send a request with an invalid city name {string}', (city) => {
    cy.invalidCityRequest(city)
})

Given('I send a request without an API key', () => {
    cy.requestWithoutApiKey()
})

Given('I send a request with an invalid API key', () => {
    cy.invalidApiKeyRequest()
})

Then('the status code should be {int}', (statusCode) => {
    cy.verifyStatusCode(statusCode)
})

Then('the response should contain the expected fields', () => {
    cy.verifyExpectedFields()
})

Then('the response should contain an error message', () => {
    cy.verifyBodyMessage()
})

Then('the response should contain a missing API key error message', () => {
    cy.verifyMissingApiKeyErrorMessage()
})

Then('the response should contain an invalid API key error message', () => {
    cy.verifyInvalidApiKeyErrorMessage()
})

Then('the response time should be within {int}ms', (threshold) => {
    cy.verifyResponseTime(threshold)
})