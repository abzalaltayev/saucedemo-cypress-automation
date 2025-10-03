// cypress/support/constants.ts

// Common selectors
export const SELECTORS = {
  // Login page
  USERNAME: '[data-test="username"]',
  PASSWORD: '[data-test="password"]',
  LOGIN_BUTTON: '[data-test="login-button"]',
  ERROR: '[data-test="error"]',

  // Navigation
  CART_BADGE: '.shopping_cart_badge',
  CART_LINK: '.shopping_cart_link',
  MENU_BUTTON: '#react-burger-menu-btn',
  LOGOUT_LINK: '#logout_sidebar_link',

  // Inventory page
  INVENTORY_ITEM: '.inventory_item',
  INVENTORY_ITEM_NAME: '.inventory_item_name',
  INVENTORY_ITEM_PRICE: '.inventory_item_price',
  SORT_DROPDOWN: '[data-test="product-sort-container"]',

  // Cart page
  CART_ITEM: '.cart_item',
  CART_QUANTITY: '.cart_quantity',
  CHECKOUT_BUTTON: '[data-test="checkout"]',
  CONTINUE_SHOPPING: 'button:contains("Continue Shopping")',

  // Checkout page
  FIRST_NAME: '[data-test="firstName"]',
  LAST_NAME: '[data-test="lastName"]',
  POSTAL_CODE: '[data-test="postalCode"]',
  CONTINUE: '[data-test="continue"]',
  CANCEL: '[data-test="cancel"]',
  FINISH: '[data-test="finish"]',
  BACK_TO_PRODUCTS: '[data-test="back-to-products"]',

  // Order summary
  SUMMARY_SUBTOTAL: '.summary_subtotal_label',
  SUMMARY_TAX: '.summary_tax_label',
  SUMMARY_TOTAL: '.summary_total_label',

  // Product details
  PRODUCT_DETAILS_NAME: '.inventory_details_name',
  PRODUCT_DETAILS_PRICE: '.inventory_details_price',
  PRODUCT_DETAILS_DESC: '.inventory_details_desc',
  PRODUCT_DETAILS_IMG: '.inventory_details_img',
  ADD_TO_CART: '[data-test="add-to-cart"]',
  REMOVE: '[data-test="remove"]',

  // Complete page
  COMPLETE_HEADER: 'h2:contains("Thank you for your order")',
  COMPLETE_TEXT: '.complete-text',
} as const;

// Test data constants
export const TEST_DATA = {
  USERS: {
    STANDARD: 'standard_user',
    LOCKED: 'locked_out_user',
    PROBLEM: 'problem_user',
    PERFORMANCE: 'performance_glitch_user',
    PASSWORD: 'secret_sauce',
  },
  PRODUCTS: {
    BACKPACK: 'Sauce Labs Backpack',
    BIKE_LIGHT: 'Sauce Labs Bike Light',
    BOLT_TSHIRT: 'Sauce Labs Bolt T-Shirt',
    FLEECE_JACKET: 'Sauce Labs Fleece Jacket',
    ONESIE: 'Sauce Labs Onesie',
    RED_TSHIRT: 'Test.allTheThings() T-Shirt (Red)',
  },
  SORT_OPTIONS: {
    A_TO_Z: 'az',
    Z_TO_A: 'za',
    PRICE_LOW_HIGH: 'lohi',
    PRICE_HIGH_LOW: 'hilo',
  },
  CHECKOUT_DATA: {
    VALID: {
      FIRST_NAME: 'Alex',
      LAST_NAME: 'Martinez',
      POSTAL_CODE: '90210',
    },
    ALTERNATIVE: {
      FIRST_NAME: 'Sofia',
      LAST_NAME: 'Chen',
      POSTAL_CODE: '10001',
    },
  },
} as const;

// URL constants
export const URLS = {
  BASE: '/',
  INVENTORY: '/inventory.html',
  CART: '/cart.html',
  CHECKOUT_STEP_ONE: '/checkout-step-one.html',
  CHECKOUT_STEP_TWO: '/checkout-step-two.html',
  CHECKOUT_COMPLETE: '/checkout-complete.html',
  PRODUCT_DETAILS: '/inventory-item.html',
} as const;

// Error messages
export const ERROR_MESSAGES = {
  LOGIN: {
    USERNAME_REQUIRED: 'Username is required',
    PASSWORD_REQUIRED: 'Password is required',
    INVALID_CREDENTIALS: 'Username and password do not match',
    LOCKED_USER: 'Sorry, this user has been locked out',
  },
  CHECKOUT: {
    FIRST_NAME_REQUIRED: 'First Name is required',
    LAST_NAME_REQUIRED: 'Last Name is required',
    POSTAL_CODE_REQUIRED: 'Postal Code is required',
  },
} as const;

// Timeouts
export const TIMEOUTS = {
  DEFAULT: 10000,
  SHORT: 5000,
  LONG: 30000,
} as const;
