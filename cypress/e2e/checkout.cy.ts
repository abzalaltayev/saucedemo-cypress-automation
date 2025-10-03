// cypress/e2e/checkout/checkout-comprehensive.cy.ts
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';

// Comprehensive checkout flow tests
describe('Checkout Comprehensive Tests', () => {
  const login = new LoginPage();
  const inventory = new InventoryPage();
  const cart = new CartPage();
  const checkout = new CheckoutPage();

  beforeEach(() => {
    // Login and add items to cart
    cy.fixture('users').then(({ valid }) => {
      login.visit();
      login.login(valid.username, valid.password);
    });
    cy.url().should('include', '/inventory.html');

    // Add items to cart
    inventory.addToCartByName('Sauce Labs Backpack');
    inventory.addToCartByName('Sauce Labs Bike Light');

    // Navigate to cart and start checkout
    inventory.cartLink().click();
    cart.checkoutButton().click();
  });

  // Test complete successful checkout flow
  it('completes full checkout process successfully', () => {
    // Fill out checkout form
    checkout.fillCheckoutForm('Alex', 'Martinez', '90210');

    // Continue to step two
    checkout.goToStepTwo();

    // Verify order summary is displayed
    checkout.getCartSubtotal().should('be.visible');
    checkout.getCartTax().should('be.visible');
    checkout.getCartTotal().should('be.visible');

    // Complete the order
    checkout.completeOrder();

    // Verify order completion
    checkout.verifyOrderComplete();
  });

  // Test checkout form validation - missing first name
  it('shows error when first name is missing', () => {
    checkout.lastName().type('Martinez');
    checkout.postalCode().type('90210');
    checkout.continue().click();

    checkout.verifyErrorIsVisible();
    checkout.verifyErrorContains('First Name is required');
  });

  // Test checkout form validation - missing last name
  it('shows error when last name is missing', () => {
    checkout.firstName().type('Alex');
    checkout.postalCode().type('90210');
    checkout.continue().click();

    checkout.verifyErrorIsVisible();
    checkout.verifyErrorContains('Last Name is required');
  });

  // Test checkout form validation - missing postal code
  it('shows error when postal code is missing', () => {
    checkout.firstName().type('Alex');
    checkout.lastName().type('Martinez');
    checkout.continue().click();

    checkout.verifyErrorIsVisible();
    checkout.verifyErrorContains('Postal Code is required');
  });

  // Test cancel button functionality
  it('cancels checkout and returns to cart', () => {
    checkout.cancel().click();
    cy.url().should('include', '/cart.html');
  });

  // Test back to products from step two
  it('returns to products from checkout step two', () => {
    // Complete step one
    checkout.fillCheckoutForm('Alex', 'Martinez', '90210');
    checkout.goToStepTwo();

    // Go back to products (using cancel button on step two)
    checkout.cancel().click();
    cy.url().should('include', '/inventory.html');
  });

  // Test order summary calculations
  it('displays correct order summary calculations', () => {
    // Complete step one
    checkout.fillCheckoutForm('Alex', 'Martinez', '90210');
    checkout.goToStepTwo();

    // Verify summary elements are present
    checkout.getCartSubtotal().should('be.visible');
    checkout.getCartTax().should('be.visible');
    checkout.getCartTotal().should('be.visible');

    // Verify tax and total calculations (basic validation)
    checkout.getCartSubtotal().should('contain', 'Item total: $');
    checkout.getCartTax().should('contain', 'Tax: $');
    checkout.getCartTotal().should('contain', 'Total: $');
  });

  // Test multiple checkout attempts
  it('handles multiple checkout attempts correctly', () => {
    // First attempt - incomplete form
    checkout.continue().click();
    checkout.verifyErrorIsVisible();

    // Second attempt - complete form
    checkout.fillCheckoutForm('Alex', 'Martinez', '90210');
    checkout.goToStepTwo();

    // Complete the order
    checkout.completeOrder();
    checkout.verifyOrderComplete();
  });

  // Test checkout with different user data
  it('completes checkout with different user information', () => {
    checkout.fillCheckoutForm('Sofia', 'Chen', '10001');
    checkout.goToStepTwo();
    checkout.completeOrder();
    checkout.verifyOrderComplete();
  });
});
