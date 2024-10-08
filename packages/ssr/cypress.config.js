const { defineConfig } = require('cypress')

module.exports = defineConfig({
  fixturesFolder: false,
  screenshotsFolder: '__tests__/screenshots',
  video: false,
  blockHosts: ['*spot.im'],
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      return require('./__tests__/cypress/plugins')(on, config)
    },
    baseUrl: 'http://localhost:3000',
    specPattern: '__tests__/cypress/e2e/**.cy.js',
    supportFile: '__tests__/cypress/support/e2e.js',
  },
})