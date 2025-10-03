// cypress/pages/LoginPage.ts
import { BasePage } from './BasePage';
import { SELECTORS, URLS } from '../support/constants';

export class LoginPage extends BasePage {
  // Elements
  username() {
    return cy.get(SELECTORS.USERNAME);
  }
  password() {
    return cy.get(SELECTORS.PASSWORD);
  }
  loginButton() {
    return cy.get(SELECTORS.LOGIN_BUTTON);
  }

  // Actions
  visit() {
    cy.visit(URLS.BASE);
  }

  login(username: string, password: string) {
    this.username().clear().type(username);
    this.password().clear().type(password, { log: false });
    this.loginButton().click();
  }

  clickLoginButton() {
    this.loginButton().click();
  }

  enterUsername(username: string) {
    this.username().type(username);
  }
}
