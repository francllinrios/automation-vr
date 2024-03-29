/// <reference types="Cypress" />

export function waitForElement (element, time = 1000) {
  for (let i = 0; i < 20; i++) {
    try {
      cy.wait(time)
      if (cy.get(element).length >= 1) {
        break
      }
    } catch (error) {
      cy.wait(time)
      cy.log(`Elemento não identificado ${element}`)
    }
  }
}

export function waitForText (element, text, time = 2000) {
  let pauser = true

  for (let i = 0; i < 30; i++) {
    try {
      cy.wait(time)
      cy.get(element, { timeout: 120000 })
          .invoke('text').wait(1000).then((valor) => {
            let res = valor.trim().includes(text.trim())

            cy.wait(time)
            if (!res) {
              pauser = true

              return false
            }
          })

      if (pauser === true) { break }
    } catch (error) {
      cy.log(`Elemento não identificado ${element}`)
    }
  }
}
