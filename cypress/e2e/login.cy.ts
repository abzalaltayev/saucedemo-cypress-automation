// cypress/e2e/smoke/login.cy.ts
import { LoginPage } from '../pages/LoginPage';

// Testing the login page - covers happy path and all the ways things can go wrong
describe('Login', () => {
  const login = new LoginPage();

  // Start fresh on the login page for each test
  beforeEach(() => login.visit());

  // The basic case - everything works as expected
  it('logs in with valid credentials', () => {
    cy.fixture('users').then(({ valid }) => {
      login.login(valid.username, valid.password);
      // Should end up on the inventory page after successful login
      cy.url().should('include', '/inventory.html');
    });
  });

  // What happens when someone types the wrong password
  it('shows error for invalid credentials', () => {
    cy.fixture('users').then(({ invalid }) => {
      login.login(invalid.username, invalid.password);
      // Make sure we get the right error message
      login.error().should('be.visible').and('contain.text', 'Username and password do not match');
    });
  });

  // Testing the locked out user scenario
  it('shows error for locked user', () => {
    cy.fixture('users').then(({ locked }) => {
      login.login(locked.username, locked.password);
      // Should tell them their account is locked
      login
        .error()
        .should('be.visible')
        .and('contain.text', 'Sorry, this user has been locked out');
    });
  });

  // What happens if they forget to enter a username
  it('requires username', () => {
    login.clickLoginButton();
    // Should complain about missing username
    login.error().should('contain.text', 'Username is required');
  });

  // What happens if they enter username but forget password
  it('requires password', () => {
    cy.fixture('users').then(({ valid }) => {
      login.enterUsername(valid.username);
      login.clickLoginButton();
      // Should complain about missing password
      login.error().should('contain.text', 'Password is required');
    });
  });
});
