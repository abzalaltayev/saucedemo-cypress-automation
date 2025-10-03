# SauceDemo – Cypress + TypeScript Automation Framework

A comprehensive test automation framework for https://www.saucedemo.com built with Cypress and TypeScript. This project includes both functional testing and performance testing capabilities.

## Quick Start

```bash
# Install dependencies
npm install

# Run tests in headed mode
npm run cy:open

# Run tests headless
npm run cy:run

# Run performance tests
npm run perf:login
```

## Testing Approach

### Functional Testing Strategy

We use a **Page Object Model (POM)** approach to keep our tests maintainable and reusable. Each page has its own class with methods for common actions and validations. This makes tests easier to read and update when the application changes.

**Key Features:**

- **BasePage class** - Common functionality shared across all pages
- **Constants file** - Centralized selectors and test data
- **Custom commands** - Reusable login functionality with session caching
- **Fixture data** - External test data management
- **Comprehensive coverage** - Login, cart, checkout, inventory, and product details

### Performance Testing Strategy

We use **k6** for load testing to ensure the application can handle expected traffic. Our performance tests focus on the critical login flow, simulating realistic user load patterns.

**Performance Features:**

- **Load testing** - Simulates concurrent users logging in
- **Response time monitoring** - Tracks 95th percentile response times
- **Error rate tracking** - Monitors failed requests and login errors
- **Simple execution** - One command to run performance tests

## Project Structure

```
cypress/
  e2e/                          # All test files
    login.cy.ts                 # Login functionality tests
    cart.cy.ts                  # Shopping cart tests
    inventory.cy.ts             # Product inventory tests
    checkout.cy.ts              # Checkout flow tests
    logout.cy.ts                # User logout tests
    product-details.cy.ts       # Product detail page tests
  fixtures/
    users.json                  # User credentials
    products.json               # Product test data
    checkout.json               # Checkout form data
  pages/                        # Page Object classes
    BasePage.ts                 # Common page functionality
    LoginPage.ts                # Login page actions
    InventoryPage.ts            # Product listing actions
    CartPage.ts                 # Shopping cart actions
    CheckoutPage.ts             # Checkout flow actions
  support/
    commands.ts                 # Custom Cypress commands
    constants.ts                # Selectors and test data
    e2e.ts                      # Test configuration
performance/
  login-load-test.js            # k6 performance test
  PERFORMANCE_TEST_PLAN.txt     # Performance testing guide
test-cases.txt                  # Comprehensive test case documentation
bug-report.txt                  # Identified bugs and issues
test-summary-report.txt         # Test execution results and quality assessment
testability-improvements.txt    # Recommendations for better testability
```

## Test Coverage

### Functional Tests

- **Login Tests** - Valid/invalid credentials, locked users, empty fields
- **Cart Tests** - Add/remove items, cart persistence, empty cart handling
- **Inventory Tests** - Product sorting, navigation, cart operations
- **Checkout Tests** - Form validation, order completion, error handling
- **Product Details** - Product information, cart operations
- **Logout Tests** - User session management

### Performance Tests

- **Login Load Test** - 10 concurrent users, 4-minute duration
- **Response Time Monitoring** - 95th percentile < 2 seconds
- **Error Rate Tracking** - < 10% failure rate

## Available Commands

```bash
# Development
npm run cy:open          # Open Cypress Test Runner
npm run cy:run           # Run tests headless
npm run test             # Alias for cy:run

# Code Quality
npm run lint             # Run ESLint
npm run format           # Format code with Prettier

# Performance Testing
npm run perf:login       # Run login load test with k6
```

## Test Data

- **Users**: standard_user, locked_out_user, problem_user, performance_glitch_user
- **Products**: Sauce Labs Backpack, Bike Light, Bolt T-Shirt, Fleece Jacket, Onesie, Red T-Shirt
- **Checkout**: Test addresses and payment information

## Prerequisites

- **Node.js** 18+
- **k6** for performance testing (`brew install k6` on macOS)

## Performance Testing

Performance tests use k6 to simulate realistic user load on the SauceDemo application. The tests focus on the login flow, which is the most critical user journey.

**Key Metrics:**

- Response time (95th percentile < 2 seconds)
- Error rate (< 10%)
- Login success rate (> 90%)

**Running Performance Tests:**

```bash
# Quick performance test
npm run perf:login

# Or run directly with k6
k6 run performance/login-load-test.js
```

## Best Practices

- **Page Object Model** - Keeps tests maintainable and reusable
- **Session Caching** - Speeds up test execution with `cy.session()`
- **Data-Driven Testing** - Uses fixtures for flexible test data
- **Error Handling** - Comprehensive validation and error checking
- **Performance Monitoring** - Regular load testing to catch regressions

## Documentation

This project includes comprehensive documentation:

- **`test-cases.txt`** - Detailed test cases with steps and expected results
- **`bug-report.txt`** - Identified bugs with reproduction steps and priorities
- **`test-summary-report.txt`** - Test execution results and quality assessment
- **`testability-improvements.txt`** - Recommendations for enhancing application testability

## Troubleshooting

**Common Issues:**

- **Tests fail with 404 errors** - Check internet connection and SauceDemo availability
- **Performance tests fail** - Ensure k6 is installed and network is stable
- **Import errors** - Run `npm ci` to ensure all dependencies are installed

**Getting Help:**

- Review the documentation files for detailed information
- Check test logs for specific error messages
- Ensure all prerequisites are installed
