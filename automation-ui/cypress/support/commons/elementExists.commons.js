/// <reference types="Cypress" />

export function checkIfEleExists (ele) {
  return new Cypress.Promise((resolve, reject) => {
    cy.get('body').then((res) => {
      if (res.find(ele).length > 0) {
        resolve()
      } else {
        reject()
      }
    })
  })
}
