const express = require('express')
const router = express.Router()

const recuperarSenhaControllers = require('../controllers/recuperarSenha')

router
    .put('/mandarEmail', recuperarSenhaControllers.mandarEmail)
    .put('/verificarCodigo', recuperarSenhaControllers.verificarCodigo)

module.exports = router