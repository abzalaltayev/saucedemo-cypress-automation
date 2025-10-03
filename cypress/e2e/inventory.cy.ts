// cypress/e2e/smoke/inventory.cy.ts
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';

// Testing inventory page functionality - sorting, navigation, and product interactions
describe('Inventory Page', () => {
  const login = new LoginPage();
  const inventory = new InventoryPage();

  beforeEach(() => {
    // Login and navigate to inventory page
    cy.fixture('users').then(({ valid }) => {
      login.visit();
      login.login(valid.username, valid.password);
    });
    // Verify we're on the inventory page
    cy.url().should('include', '/inventory.html');
  });

  // Test sorting products by name A to Z
  it('sorts products by name A to Z', () => {
    inventory.sortBy('az');

    // Get all product names and verify they're sorted alphabetically
    inventory.getProductNames().then(($names) => {
      const names = Array.from($names).map((el) => el.textContent);
      const sortedNames = [...names].sort();
      expect(names).to.deep.equal(sortedNames);
    });
  });

  // Test sorting products by name Z to A
  it('sorts products by name Z to A', () => {
    inventory.sortBy('za');

    // Get all product names and verify they're sorted reverse alphabetically
    inventory.getProductNames().then(($names) => {
      const names = Array.from($names).map((el) => el.textContent);
      const sortedNames = [...names].sort().reverse();
      expect(names).to.deep.equal(sortedNames);
    });
  });

  // Test sorting products by price low to high
  it('sorts products by price low to high', () => {
    inventory.sortBy('lohi');

    // Get all product prices and verify they're sorted from low to high
    inventory.getProductPrices().then(($prices) => {
      const prices = Array.from($prices).map((el) => parseFloat(el.textContent.replace('$', '')));
      const sortedPrices = [...prices].sort((a, b) => a - b);
      expect(prices).to.deep.equal(sortedPrices);
    });
  });

  // Test sorting products by price high to low
  it('sorts products by price high to low', () => {
    inventory.sortBy('hilo');

    // Get all product prices and verify they're sorted from high to low
    inventory.getProductPrices().then(($prices) => {
      const prices = Array.from($prices).map((el) => parseFloat(el.textContent.replace('$', '')));
      const sortedPrices = [...prices].sort((a, b) => b - a);
      expect(prices).to.deep.equal(sortedPrices);
    });
  });

  // Test adding multiple items to cart
  it('adds multiple items to cart', () => {
    inventory.addToCartByName('Sauce Labs Backpack');
    inventory.cartBadge().should('have.text', '1');

    inventory.addToCartByName('Sauce Labs Bike Light');
    inventory.cartBadge().should('have.text', '2');

    inventory.addToCartByName('Sauce Labs Fleece Jacket');
    inventory.cartBadge().should('have.text', '3');
  });

  // Test removing items from cart
  it('removes items from cart', () => {
    // Add multiple items first
    inventory.addToCartByName('Sauce Labs Backpack');
    inventory.addToCartByName('Sauce Labs Onesie');
    inventory.cartBadge().should('have.text', '2');

    // Remove one item
    inventory.removeFromCartByName('Sauce Labs Backpack');
    inventory.cartBadge().should('have.text', '1');

    // Remove the last item
    inventory.removeFromCartByName('Sauce Labs Onesie');
    inventory.cartBadge().should('not.exist');
  });

  // Test navigation to cart page
  it('navigates to cart page', () => {
    inventory.addToCartByName('Sauce Labs Backpack');
    inventory.cartLink().click();
    cy.url().should('include', '/cart.html');
  });

  // Test product count on inventory page
  it('displays correct number of products', () => {
    inventory.getInventoryItems().should('have.length', 6);
  });

  // Test logout functionality
  it('logs out successfully', () => {
    inventory.menuButton().click();
    inventory.logoutLink().click();
    cy.url().should('include', '/');
  });
});
