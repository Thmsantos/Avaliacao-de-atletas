// ------------------------------ SEQUELIZE ------------------------------
// Importar bibliotecas
const Sequelize = require('sequelize');
const database = require('../config/dbConfig');
const gestorModels = require('./gestorModels')

const medicoModels = database.define('medicos', {
    idmedico:{
        type : Sequelize.INTEGER(4),
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    nome : Sequelize.STRING(50),
    cpf : Sequelize.CHAR(11),
    crm : Sequelize.CHAR(13),
    sexo : Sequelize.ENUM("M", "F"),
    email : Sequelize.STRING(50),
    senha : Sequelize.STRING(100),
    especialidade : Sequelize.STRING(35),
    cargo : Sequelize.STRING(30),
    id_gestor_med : {
        type : Sequelize.INTEGER(4),
        references : {
            model : gestorModels,
            key : 'idgestor'
        }
    }
}) 

database.sync()

module.exports = medicoModels;