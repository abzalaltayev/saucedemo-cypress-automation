// cypress/e2e/smoke/logout.cy.ts
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';

// Testing user logout functionality
describe('User Logout', () => {
  const login = new LoginPage();
  const inventory = new InventoryPage();

  beforeEach(() => {
    // Login first
    cy.fixture('users').then(({ valid }) => {
      login.visit();
      login.login(valid.username, valid.password);
    });
    cy.url().should('include', '/inventory.html');
  });

  // Test logout from inventory page
  it('logs out successfully from inventory page', () => {
    // Open menu and logout
    inventory.menuButton().click();
    inventory.logoutLink().click();

    // Should be redirected to login page
    cy.url().should('include', '/');
    cy.get('[data-test="username"]').should('be.visible');
    cy.get('[data-test="password"]').should('be.visible');
  });

  // Test logout from cart page
  it('logs out successfully from cart page', () => {
    // Add item to cart and go to cart
    inventory.addToCartByName('Sauce Labs Onesie');
    inventory.cartLink().click();
    cy.url().should('include', '/cart.html');

    // Open menu and logout
    inventory.menuButton().click();
    inventory.logoutLink().click();

    // Should be redirected to login page
    cy.url().should('include', '/');
  });

  // Test logout and login again
  it('can login again after logout', () => {
    // Logout
    inventory.menuButton().click();
    inventory.logoutLink().click();

    // Login again
    cy.fixture('users').then(({ valid }) => {
      login.login(valid.username, valid.password);
    });

    // Should be back on inventory page
    cy.url().should('include', '/inventory.html');
    inventory.getInventoryItems().should('have.length', 6);
  });
});
