// cypress/pages/BasePage.ts
import { SELECTORS, URLS } from '../support/constants';

export class BasePage {
  // Common elements
  menuButton() {
    return cy.get(SELECTORS.MENU_BUTTON);
  }
  logoutLink() {
    return cy.get(SELECTORS.LOGOUT_LINK);
  }
  error() {
    return cy.get(SELECTORS.ERROR);
  }

  // Common actions
  logout() {
    this.menuButton().click();
    this.logoutLink().click();
    cy.url().should('include', URLS.BASE);
  }

  // Common validations
  verifyErrorIsVisible() {
    this.error().should('be.visible');
  }

  verifyErrorContains(text: string) {
    this.error().should('contain.text', text);
  }
}
