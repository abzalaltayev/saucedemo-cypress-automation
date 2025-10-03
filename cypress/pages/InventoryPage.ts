// cypress/pages/InventoryPage.ts
import { BasePage } from './BasePage';
import { SELECTORS, URLS, TEST_DATA } from '../support/constants';

export class InventoryPage extends BasePage {
  // Elements
  cartBadge() {
    return cy.get(SELECTORS.CART_BADGE);
  }
  cartLink() {
    return cy.get(SELECTORS.CART_LINK);
  }
  sortDropdown() {
    return cy.get(SELECTORS.SORT_DROPDOWN);
  }
  getInventoryItems() {
    return cy.get(SELECTORS.INVENTORY_ITEM);
  }
  getProductNames() {
    return cy.get(SELECTORS.INVENTORY_ITEM_NAME);
  }
  getProductPrices() {
    return cy.get(SELECTORS.INVENTORY_ITEM_PRICE);
  }

  // Actions
  visit() {
    cy.visit(URLS.INVENTORY);
  }

  addToCartByName(name: string) {
    cy.contains(SELECTORS.INVENTORY_ITEM, name).within(() => {
      cy.contains('button', /add to cart/i).click();
    });
  }

  removeFromCartByName(name: string) {
    cy.contains(SELECTORS.INVENTORY_ITEM, name).within(() => {
      cy.contains('button', /remove/i).click();
    });
  }

  sortBy(option: string) {
    this.sortDropdown().select(option);
  }

  clickProductByName(name: string) {
    cy.contains(SELECTORS.INVENTORY_ITEM_NAME, name).click();
  }

  // Validations
  verifyProductsSortedByNameAscending() {
    this.getProductNames().then(($names) => {
      const names = Array.from($names).map((el) => el.textContent || '');
      const sortedNames = [...names].sort();
      expect(names).to.deep.equal(sortedNames);
    });
  }

  verifyProductsSortedByPriceAscending() {
    this.getProductPrices().then(($prices) => {
      const prices = Array.from($prices).map((el) =>
        parseFloat(el.textContent?.replace('$', '') || '0')
      );
      const sortedPrices = [...prices].sort((a, b) => a - b);
      expect(prices).to.deep.equal(sortedPrices);
    });
  }
}
