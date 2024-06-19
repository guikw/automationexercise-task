import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

// Login Steps ||

Given('user is on the SauceDemo login page', () => {
    cy.openWebsite();
});

When('user enters valid credentials', () => {
    cy.enterCredentials();
});

When('user enters invalid credentials', () => {
    cy.enterInvalidCredentials('invalid_user', 'invalid_pass');
});

When('user enters a locked user credentials', () => {
    cy.enterLockedCredentials('locked_out_user', 'secret_sauce');
});

When('user clicks the login button', () => {
    cy.clickLoginButton();
});

Then('user should be redirected to the inventory page', () => {
    cy.verifyRedirectToInventoryPage();
});

Then('user should see an error message', () => {
    cy.verifyErrorMessage();
});

Then('user should see a locked error message', () => {
    const expectedErrorMessage = 'Epic sadface: Sorry, this user has been locked out.';
    cy.lockedErrorMessage(expectedErrorMessage);
});

// E2E Steps ||

Given('user is on the inventory page', () => {
    cy.verifyInventoryPage();
});

When('user views the product catalog', () => {
    cy.viewProductCatalog();
});

Then('all items should be displayed', () => {
    cy.get('.inventory_item').should('have.length.greaterThan', 0);
});

Given('user adds a Labs Backpack to the cart', () => {
    cy.addItemToCart('Sauce Labs Backpack');
});

Given('user adds Labs Bike Light to the cart', () => {
    cy.addItemToCart2('Sauce Labs Bike Light');
});

Then('the item should be added to the cart', () => {
    cy.verifyItemAddedToCart('Sauce Labs Backpack');
});

When('user removes the item from the cart', () => {
    cy.removeItemFromCart('Sauce Labs Backpack');
});

Then('the cart should be empty', () => {
    cy.verifyCartIsEmpty();
});

When('user has an item in the cart', () => {
    cy.verifyItemAddedToCart('Labs');
});

When('user proceeds to checkout', () => {
    cy.proceedToCheckout();
});

When('user completes the checkout process', () => {
    cy.completeCheckoutProcess();
});

Then('user should see a confirmation message', () => {
    cy.verifyConfirmationMessage();
});

When('user logs out', () => {
    cy.logout();
});

Then('user should be redirected to the login page', () => {
    cy.verifyRedirectToLoginPage();
});