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

//     ||
// Automation Exercise ||
//     ||

Cypress.Screenshot.defaults({
    capture: "runner",
    overwrite: true
});

// Login Commands ||

Cypress.Commands.add('openWebsite', () => {
    cy.visit('https://www.saucedemo.com/');
});

Cypress.Commands.add('enterCredentials', () => {
    const usernames = [
        'standard_user',
        'performance_glitch_user',
        'visual_user'
    ];

    const randomUsername = usernames[Math.floor(Math.random() * usernames.length)];
    const password = 'secret_sauce';

    cy.get('[data-test="username"]').type(randomUsername);
    cy.get('[data-test="password"]').type(password);
});

Cypress.Commands.add('enterInvalidCredentials', (username, password) => {
    cy.get('[data-test="username"]').type(username);
    cy.get('[data-test="password"]').type(password);
});

Cypress.Commands.add('enterLockedCredentials', (username, password) => {
    cy.get('[data-test="username"]').type(username);
    cy.get('[data-test="password"]').type(password);
});

Cypress.Commands.add('clickLoginButton', () => {
    cy.get('[data-test="login-button"]').click();
});

Cypress.Commands.add('verifyRedirectToInventoryPage', () => {
    cy.url().should('include', '/inventory.html');
});

Cypress.Commands.add('verifyErrorMessage', () => {
    cy.get('[data-test="error"]').should('be.visible');
});

Cypress.Commands.add('lockedErrorMessage', (expectedErrorMessage) => {
    cy.contains('h3', expectedErrorMessage).should('be.visible');
  });

// Shop Commands ||

Cypress.Commands.add('verifyInventoryPage', () => {
    cy.url().should('include', '/inventory.html');
});

Cypress.Commands.add('viewProductCatalog', () => {
    cy.get('.inventory_item').should('be.visible');
});

Cypress.Commands.add('addItemToCart', (itemName) => {
    cy.contains(itemName).parents('.inventory_item')
        .find('[data-test="add-to-cart-sauce-labs-backpack"]').click();
});

Cypress.Commands.add('addItemToCart2', (itemName) => {
    cy.contains(itemName).parents('.inventory_item')
        .find('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
});

Cypress.Commands.add('verifyItemInCart', (itemName = 'Sauce Labs Bike Light') => {
    cy.get('.cart_item').contains('.inventory_item_name', itemName).should('exist');
});

Cypress.Commands.add('verifyItemAddedToCart', (itemName) => {
    cy.get('.shopping_cart_badge').should('contain', '1');
});

Cypress.Commands.add('removeItemFromCart', (itemName) => {
    cy.contains(itemName).parents('.inventory_item')
        .find('[data-test="remove-sauce-labs-backpack"]').click();
});

Cypress.Commands.add('verifyCartIsEmpty', () => {
    cy.get('.shopping_cart_badge').should('not.exist');
});

Cypress.Commands.add('proceedToCheckout', () => {
    cy.get('.shopping_cart_link').click();
    cy.get('[data-test="checkout"]').click();
});

Cypress.Commands.add('completeCheckoutProcess', () => {
    cy.get('[data-test="firstName"]').type('John');
    cy.get('[data-test="lastName"]').type('Doe');
    cy.get('[data-test="postalCode"]').type('12345');
    cy.get('[data-test="continue"]').click();
    cy.get('[data-test="finish"]').click();
});

Cypress.Commands.add('verifyConfirmationMessage', () => {
    cy.get('[data-test="complete-header"]').should('contain', 'Thank you');
});

Cypress.Commands.add('logout', () => {
    cy.get('#react-burger-menu-btn').click();
    cy.get('#logout_sidebar_link').click();
});

Cypress.Commands.add('verifyRedirectToLoginPage', () => {
    cy.url().should('include', '/');
});