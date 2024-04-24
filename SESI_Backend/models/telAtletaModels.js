// ------------------------------ SEQUELIZE ------------------------------
// Importar bibliotecas
const Sequelize = require('sequelize');
const database = require('../config/dbConfig');
const atletaModels = require('./atletaModels')

const tel_atlModels = database.define('tel_atletas', {
    idtel_atl:{
        type : Sequelize.INTEGER(4),
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    ddd: Sequelize.CHAR(2),
    num_tel_atl : Sequelize.STRING(9),
    tipo_tel_atl : Sequelize.ENUM('RESIDENCIAL', 'COMERCIAL', 'CELULAR'),
    id_tel_atl : {
        type : Sequelize.INTEGER(4),
        references : {
            model : atletaModels,
            key : 'idatleta' 
        }
    }
})

database.sync()

module.exports = tel_atlModels;