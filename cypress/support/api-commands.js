// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import '@shelex/cypress-allure-plugin';
import 'cypress-plugin-api'

// API Interactions ||

Cypress.Screenshot.defaults({
    capture: "runner",
});

//  API             ||
// Endpoint         ||
//                  ||

const apiKey = 'ae6cc42b8fe74e85a0011752241906'
const baseUrl = 'https://api.weatherapi.com/v1/current.json'

Cypress.Commands.add('validRequest', (city) => {
    cy.request({
        method: 'GET',
        url: `${baseUrl}?key=${apiKey}&q=${city}`
    }).as('weatherRequest')
})

Cypress.Commands.add('invalidCityRequest', (city) => {
    cy.request({
        method: 'GET',
        url: `${baseUrl}?key=${apiKey}&q=${city}`,
        failOnStatusCode: false
    }).as('weatherRequest')
})

Cypress.Commands.add('requestWithoutApiKey', () => {
    cy.request({
        method: 'GET',
        url: `${baseUrl}?q=London`,
        failOnStatusCode: false
    }).as('weatherRequest')
})

Cypress.Commands.add('invalidApiKeyRequest', () => {
    cy.request({
        method: 'GET',
        url: `${baseUrl}?key=invalid_key&q=London`,
        failOnStatusCode: false
    }).as('weatherRequest')
})

Cypress.Commands.add('verifyStatusCode', (statusCode) => {
    cy.get('@weatherRequest').its('status').should('eq', statusCode)
})

Cypress.Commands.add('verifyExpectedFields', () => {
    cy.get('@weatherRequest').its('body').should((body) => {
        expect(body).to.have.property('location')
        expect(body).to.have.property('current')
        expect(body.current).to.have.property('temp_c')
        expect(body.current).to.have.property('humidity')
    })
})

Cypress.Commands.add('verifyBodyMessage', () => {
    cy.get('@weatherRequest').its('body').should((body) => {
        expect(body).to.have.property('error')
    })
})

Cypress.Commands.add('verifyMissingApiKeyErrorMessage', () => {
    cy.get('@weatherRequest').its('body').should((body) => {
        expect(body).to.have.property('error')
        expect(body.error.message).to.include('API key is invalid or not provided')
    })
})

Cypress.Commands.add('verifyInvalidApiKeyErrorMessage', () => {
    cy.get('@weatherRequest').its('body').should((body) => {
        expect(body).to.have.property('error')
        // Adjusted to match the actual error message returned by the API
        expect(body.error.message).to.include('API key has been disabled')
    })
})

Cypress.Commands.add('verifyResponseTime', (threshold) => {
    cy.get('@weatherRequest').its('duration').should('be.lessThan', threshold)
})