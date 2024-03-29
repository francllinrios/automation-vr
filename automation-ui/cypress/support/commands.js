Cypress.Commands.add("forceVisit", (url) => {
  cy.visit(url);
});