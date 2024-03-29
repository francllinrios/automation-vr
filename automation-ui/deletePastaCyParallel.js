const fs = require('fs')

// só é para rodar no CI
fs.rmdirSync('./home/anon/.config/Cypress/cy', { recursive: true, force: true })
