import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'https://www.saucedemo.com',
    specPattern: 'cypress/e2e/**/*.{cy,spec}.{js,ts}',
    supportFile: 'cypress/support/e2e.ts',
    video: false,
    retries: 1,
    watchForFileChanges: false,
    chromeWebSecurity: false,
    blockHosts: ['https://events.backtrace.io'],
    setupNodeEvents(on, config) {
      // implement node event listeners here if needed
      return config;
    },
  },
  reporter: 'spec',
  viewportWidth: 1366,
  viewportHeight: 900,
  env: {
    standard_user: 'standard_user',
    locked_out_user: 'locked_out_user',
    problem_user: 'problem_user',
    performance_glitch_user: 'performance_glitch_user',
    password: 'secret_sauce',
  },
});
