// cypress/e2e/smoke/product-details.cy.ts
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';

// Testing product details page functionality
describe('Product Details', () => {
  const login = new LoginPage();
  const inventory = new InventoryPage();

  beforeEach(() => {
    // Login and navigate to inventory page
    cy.fixture('users').then(({ valid }) => {
      login.visit();
      login.login(valid.username, valid.password);
    });
    cy.url().should('include', '/inventory.html');
  });

  // Test clicking on product name to view details
  it('displays product details when clicking product name', () => {
    inventory.clickProductByName('Sauce Labs Fleece Jacket');

    // Should be on product details page
    cy.url().should('include', '/inventory-item.html');

    // Verify product details are displayed
    cy.get('.inventory_details_name').should('contain', 'Sauce Labs Fleece Jacket');
    cy.get('.inventory_details_price').should('be.visible');
    cy.get('.inventory_details_desc').should('be.visible');
    cy.get('.inventory_details_img').should('be.visible');
  });

  // Test adding product to cart from details page
  it('adds product to cart from details page', () => {
    inventory.clickProductByName('Sauce Labs Fleece Jacket');

    // Add to cart from details page
    cy.get('[data-test="add-to-cart"]').click();

    // Verify cart badge updates
    cy.get('.shopping_cart_badge').should('have.text', '1');
  });

  // Test removing product from cart on details page
  it('removes product from cart on details page', () => {
    // First add product to cart from inventory
    inventory.addToCartByName('Sauce Labs Fleece Jacket');
    inventory.cartBadge().should('have.text', '1');

    // Go to product details
    inventory.clickProductByName('Sauce Labs Fleece Jacket');

    // Remove from cart
    cy.get('[data-test="remove"]').click();

    // Verify cart badge is gone
    cy.get('.shopping_cart_badge').should('not.exist');
  });

  // Test back to products button
  it('returns to inventory page from product details', () => {
    inventory.clickProductByName('Sauce Labs Fleece Jacket');

    // Click back to products
    cy.get('[data-test="back-to-products"]').click();

    // Should be back on inventory page
    cy.url().should('include', '/inventory.html');
  });

  // Test product details for different products
  it('displays correct details for different products', () => {
    const products = ['Sauce Labs Fleece Jacket', 'Sauce Labs Onesie', 'Sauce Labs Bike Light'];

    products.forEach((product) => {
      inventory.clickProductByName(product);
      cy.get('.inventory_details_name').should('contain', product);
      cy.get('[data-test="back-to-products"]').click();
    });
  });

  // Test product image is displayed
  it('displays product image on details page', () => {
    inventory.clickProductByName('Sauce Labs Backpack');

    // Verify image is present and has proper attributes
    cy.get('.inventory_details_img')
      .should('be.visible')
      .and('have.attr', 'src')
      .and('include', 'backpack');
  });

  // Test product description is displayed
  it('displays product description on details page', () => {
    inventory.clickProductByName('Sauce Labs Backpack');

    // Verify description is present and not empty
    cy.get('.inventory_details_desc').should('be.visible').and('not.be.empty');
  });
});
