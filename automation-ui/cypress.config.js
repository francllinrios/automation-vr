const { defineConfig } = require("cypress");
const cucumber = require("cypress-cucumber-preprocessor").default;
const allureWriter = require("@shelex/cypress-allure-plugin/writer");

module.exports = defineConfig({
  projectId: 'ud19kj',
  e2e: {
    specPattern: "cypress/e2e/gherkins/**/**/*.feature",
    setupNodeEvents(on, config) {
      on("file:preprocessor", cucumber());
      allureWriter(on, config);
      return config;
    },

    env: {
      allure: true,
      allureResultsPath: "allure-results",
      TAGS: "not @wip",
      allureReuseAfterSpec: true,
    },
    TAGS: "not @wip",
    chromeWebSecurity: false,
    viewportWidth: 1536,
    viewportHeight: 960,
    video: false,
    watchForFileChanges: false,
    screenshotOnRunFailure: false,
    downloadsFolder: "cypress/downloads",
    trashAssetsBeforeRuns: false,
    pageLoadTimeout: 20000
  },
});
