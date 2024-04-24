// ------------------------------ SEQUELIZE ------------------------------
// Importar bibliotecas
const { STRING } = require('sequelize');
const Sequelize = require('sequelize');
const database = require('../config/dbConfig');
const medicoModels = require('./medicoModels');


const tel_medModels = database.define('tel_medicos', {
    idtel_med:{
        type : Sequelize.INTEGER(4),
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    ddd : Sequelize.CHAR(2),
    num_tel_med : Sequelize.STRING(9),
    tipo_tel_med : Sequelize.ENUM('RESIDENCIAL' , 'COMERCIAL', 'CELULAR'),
    id_tel_med : {
        type : Sequelize.INTEGER(4),
        references : {
            model : medicoModels,
            key : 'idmedico'
        }
    }
})

database.sync()

module.exports = tel_medModels;