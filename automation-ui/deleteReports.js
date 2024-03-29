const fs = require('fs')

// Deletar a pasta report para novos testes
fs.rmdirSync('./allure-report', { recursive: true, force: true })
fs.rmdirSync('./cypress/screenshots', { recursive: true, force: true })
fs.rmdirSync('./allure-reports/', { recursive: true, force: true })
fs.rmdirSync('./allure-reports', { recursive: true, force: true })
fs.rmdirSync('./cypress/downloads', { recursive: true, force: true })
