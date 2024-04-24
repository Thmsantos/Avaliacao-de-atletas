// ------------------------------ SEQUELIZE ------------------------------
// Importar bibliotecas
const Sequelize = require('sequelize');
const database = require('../config/dbConfig');
const med_convModels = require('./medicoConvModels')

const end_med_convModels = database.define('endereco_medico_conv', {
    id_end_med_conv:{
        type : Sequelize.INTEGER(4),
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    cep : Sequelize.CHAR(8),
    logradouro : Sequelize.STRING(100),
    num_end_med_conv : Sequelize.STRING(7),
    bairro : Sequelize.STRING(100),
    complemento : Sequelize.STRING(50),
    pt_ref : Sequelize.STRING(50),
    cidade : Sequelize.STRING(60),
    uf : Sequelize.CHAR(2),
    pais : Sequelize.STRING(30),
    tipo_end_med_conv : Sequelize.ENUM('RESIDENCIAL', 'COMERCIAL'),
    id_end_conv : {
        type : Sequelize.INTEGER(4),
        references : {
            model : med_convModels,
            key : 'id_med_conv'
        }
    }
})

database.sync()

// Exportação do módulo
module.exports = end_med_convModels;