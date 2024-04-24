const express = require('express')
const multer = require('multer')
const path = require("path")

const atletaControllers = require('../controllers/atletaControllers')

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, path.resolve("./uploads"))
    },
    filename: function(res, file, cb){
        cb(null, file.originalname)
    }
})


const upload = multer({storage})

const router = express.Router()

router
    .post('/listar', atletaControllers.listUsersOne)
    .get('/:email', atletaControllers.listUsers)
    .put('/atualizarAtleta', atletaControllers.changeUser)
    .get('/verExamesSolicitados/:email', atletaControllers.viewFile)
    .put('/enviarPdf/:email', upload.single('pdfatleta'), atletaControllers.sendPdf)
    .put('/modificarPdf/:email', atletaControllers.alterarPdf)


module.exports = router