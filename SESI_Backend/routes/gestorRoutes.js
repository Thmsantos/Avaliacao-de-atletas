// Importacão das bibliotecas 
const express = require('express'); // Recebe o express

// Importação dos módulos
const gestorControllers = require('../controllers/gestorControllers'); // Armazena o aquivo do controller 

const router = express.Router(); // Armazena o "Router" do express

router

  //Rotas para listar
  .get("/listarMedico", gestorControllers.listMedic)

  .get('/verGestor/:email', gestorControllers.verGestor)

  .post("/listar", gestorControllers.listData)

  .post('/listarTodos', gestorControllers.listDataAll)

  .post("/listarAtleta", gestorControllers.listDataAthlete)

  .post("/cadastro", gestorControllers.createUser)
  
  .post("/deletar", gestorControllers.deleteUser) 

  .post("/solicitarMedico", gestorControllers.requestDoctor)

  .put("/alterar", gestorControllers.changeUser) 

  .put('/solicitarAtleta', gestorControllers.requestAthlete)


// Exportação do módulo
module.exports = router  
