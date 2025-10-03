// cypress/pages/CheckoutPage.ts
import { BasePage } from './BasePage';
import { SELECTORS, URLS } from '../support/constants';

export class CheckoutPage extends BasePage {
  // Elements
  firstName() {
    return cy.get(SELECTORS.FIRST_NAME);
  }
  lastName() {
    return cy.get(SELECTORS.LAST_NAME);
  }
  postalCode() {
    return cy.get(SELECTORS.POSTAL_CODE);
  }
  continue() {
    return cy.get(SELECTORS.CONTINUE);
  }
  cancel() {
    return cy.get(SELECTORS.CANCEL);
  }
  finish() {
    return cy.get(SELECTORS.FINISH);
  }
  backToProducts() {
    return cy.get(SELECTORS.BACK_TO_PRODUCTS);
  }
  getCartSubtotal() {
    return cy.get(SELECTORS.SUMMARY_SUBTOTAL);
  }
  getCartTax() {
    return cy.get(SELECTORS.SUMMARY_TAX);
  }
  getCartTotal() {
    return cy.get(SELECTORS.SUMMARY_TOTAL);
  }

  // Actions
  visit() {
    cy.visit(URLS.CHECKOUT_STEP_ONE);
  }

  fillCheckoutForm(firstName: string, lastName: string, postalCode: string) {
    this.firstName().clear().type(firstName);
    this.lastName().clear().type(lastName);
    this.postalCode().clear().type(postalCode);
  }

  goToStepTwo() {
    this.continue().click();
    cy.url().should('include', URLS.CHECKOUT_STEP_TWO);
  }

  completeOrder() {
    this.finish().click();
    cy.url().should('include', URLS.CHECKOUT_COMPLETE);
  }

  // Validations
  verifyOrderComplete() {
    cy.url().should('include', URLS.CHECKOUT_COMPLETE);
    cy.contains('h2', /thank you for your order/i).should('be.visible');
  }
}
