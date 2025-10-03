// cypress/pages/CartPage.ts
import { BasePage } from './BasePage';
import { SELECTORS, URLS } from '../support/constants';

export class CartPage extends BasePage {
  // Elements
  checkoutButton() {
    return cy.get(SELECTORS.CHECKOUT_BUTTON);
  }
  continueShoppingButton() {
    return cy.contains('button', /continue shopping/i);
  }
  getCartItems() {
    return cy.get(SELECTORS.CART_ITEM);
  }

  // Actions
  visit() {
    cy.visit(URLS.CART);
  }

  removeItemByName(name: string) {
    cy.contains(SELECTORS.CART_ITEM, name).within(() => {
      cy.get('button').contains('Remove').click();
    });
  }

  continueShopping() {
    this.continueShoppingButton().click();
  }

  // Validations
  verifyCartIsEmpty() {
    this.getCartItems().should('not.exist');
  }

  getCartItemCount() {
    return this.getCartItems().its('length');
  }

  getCartItemByName(name: string) {
    return cy.contains(SELECTORS.CART_ITEM, name);
  }

  getItemQuantity(name: string) {
    return cy.contains(SELECTORS.CART_ITEM, name).find(SELECTORS.CART_QUANTITY);
  }

  getItemPrice(name: string) {
    return cy.contains(SELECTORS.CART_ITEM, name).find('.inventory_item_price');
  }
}
