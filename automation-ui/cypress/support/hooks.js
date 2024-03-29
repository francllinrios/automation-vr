import URL from "../../config.env.json";

export let typeUrl

beforeEach(() => {
  try {
    if (
      !Cypress.mocha.getRunner().suite.ctx.currentTest.body.includes("skip")
    ) {
      cy.exec('rm -rf cypress/downloads/*', { failOnNonZeroExit: false });
      cy.clearLocalStorage();
      cy.window().then((win) => {
        win.sessionStorage.clear();
      });

      const urlEnv = Cypress.env("ENVIRONMENT") || "hml";

      switch (urlEnv) {
        case "local":
          typeUrl = URL.baseUrlLocal;
          break;
        case "hml":
          typeUrl = URL.baseUrlhml;
          break;
        case "prd":
          typeUrl = URL.baseUrlprd;
          break;
        default:
          cy.log(`Não foi apresentado a URL de acesso: ${urlEnv}`);
          break;
      }
      cy.forceVisit(typeUrl);
    }
  } catch (error) {
    return `Não foi apresentado a URL de acesso: ${error.message}`;
  }
});

afterEach(() => {
  cy.clearCookies();
  cy.clearLocalStorage();
  cy.window().then((win) => {
    win.sessionStorage.clear();
  });
});
