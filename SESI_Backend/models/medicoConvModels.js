// ------------------------------ SEQUELIZE ------------------------------
// Importar bibliotecas
const Sequelize = require('sequelize');
const database = require('../config/dbConfig');
const gestorModels = require('./gestorModels');
const exameModels = require('./exameModels')

const med_convModels = database.define('medico_convs', {
    id_med_conv:{
        type : Sequelize.INTEGER(4),
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    nome : Sequelize.STRING(50),
    cpf : Sequelize.CHAR(11),
    especialidade : Sequelize.STRING(30),
    email : Sequelize.STRING(100),
    senha : Sequelize.STRING(100),
    crm : Sequelize.CHAR(13),
    sexo : Sequelize.ENUM('M', 'F'),
    cargo : Sequelize.STRING(30),
    id_exame_conv : Sequelize.INTEGER(4),
    id_gest_conv : {
        type : Sequelize.INTEGER(4),
        references : {
            model : gestorModels,
            key : 'idgestor'
        }
    },
})

database.sync()

module.exports = med_convModels;