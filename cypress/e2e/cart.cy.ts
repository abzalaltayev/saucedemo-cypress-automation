// cypress/e2e/smoke/cart.cy.ts
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';

// Comprehensive cart functionality tests
describe('Cart Comprehensive Tests', () => {
  const login = new LoginPage();
  const inventory = new InventoryPage();
  const cart = new CartPage();

  beforeEach(() => {
    // Login and navigate to inventory page
    cy.fixture('users').then(({ valid }) => {
      login.visit();
      login.login(valid.username, valid.password);
    });
    cy.url().should('include', '/inventory.html');
  });

  // Test adding multiple different items to cart
  it('adds multiple different items to cart', () => {
    inventory.addToCartByName('Sauce Labs Backpack');
    inventory.addToCartByName('Sauce Labs Bike Light');
    inventory.addToCartByName('Sauce Labs Fleece Jacket');

    // Navigate to cart
    inventory.cartLink().click();
    cy.url().should('include', '/cart.html');

    // Verify all items are in cart
    cart.getCartItemCount().should('equal', 3);
    cart.getCartItemByName('Sauce Labs Backpack').should('be.visible');
    cart.getCartItemByName('Sauce Labs Bike Light').should('be.visible');
    cart.getCartItemByName('Sauce Labs Fleece Jacket').should('be.visible');
  });

  // Test removing items from cart page
  it('removes items from cart page', () => {
    // Add items to cart
    inventory.addToCartByName('Sauce Labs Backpack');
    inventory.addToCartByName('Sauce Labs Onesie');

    // Navigate to cart
    inventory.cartLink().click();

    // Remove one item
    cart.removeItemByName('Sauce Labs Backpack');
    cart.getCartItemCount().should('equal', 1);
    cart.getCartItemByName('Sauce Labs Backpack').should('not.exist');
    cart.getCartItemByName('Sauce Labs Onesie').should('be.visible');
  });

  // Test continue shopping functionality
  it('continues shopping from cart page', () => {
    // Add item to cart and go to cart page
    inventory.addToCartByName('Sauce Labs Backpack');
    inventory.cartLink().click();

    // Click continue shopping
    cart.continueShopping();

    // Should be back on inventory page
    cy.url().should('include', '/inventory.html');

    // Add another item
    inventory.addToCartByName('Sauce Labs Onesie');
    inventory.cartBadge().should('have.text', '2');
  });

  // Test cart item quantities and prices
  it('displays correct item quantities and prices', () => {
    // Add items to cart
    inventory.addToCartByName('Sauce Labs Backpack');
    inventory.addToCartByName('Sauce Labs Onesie');

    // Navigate to cart
    inventory.cartLink().click();

    // Verify quantities (should be 1 for each item)
    cart.getItemQuantity('Sauce Labs Backpack').should('contain', '1');
    cart.getItemQuantity('Sauce Labs Onesie').should('contain', '1');

    // Verify prices are displayed
    cart.getItemPrice('Sauce Labs Backpack').should('be.visible');
    cart.getItemPrice('Sauce Labs Onesie').should('be.visible');
  });

  // Test checkout button functionality
  it('navigates to checkout page', () => {
    // Add item to cart
    inventory.addToCartByName('Sauce Labs Backpack');
    inventory.cartLink().click();

    // Click checkout button
    cart.checkoutButton().click();

    // Should be on checkout step one page
    cy.url().should('include', '/checkout-step-one.html');
  });

  // Test empty cart scenario
  it('handles empty cart correctly', () => {
    // Go directly to cart without adding items
    inventory.cartLink().click();

    // Cart should be empty
    cart.verifyCartIsEmpty();

    // Checkout button should still be present and clickable
    cart.checkoutButton().should('be.visible');

    // Click checkout button - Sauce Demo allows checkout with empty cart
    cart.checkoutButton().click();
    // Should proceed to checkout page even with empty cart
    cy.url().should('include', '/checkout-step-one.html');
  });

  // Test cart badge updates correctly
  it('updates cart badge correctly when items are removed', () => {
    // Add multiple items
    inventory.addToCartByName('Sauce Labs Backpack');
    inventory.addToCartByName('Sauce Labs Onesie');
    inventory.addToCartByName('Sauce Labs Fleece Jacket');
    inventory.cartBadge().should('have.text', '3');

    // Go to cart and remove one item
    inventory.cartLink().click();
    cart.removeItemByName('Sauce Labs Backpack');

    // Go back to inventory and check badge
    cart.continueShopping();
    inventory.cartBadge().should('have.text', '2');
  });
});
