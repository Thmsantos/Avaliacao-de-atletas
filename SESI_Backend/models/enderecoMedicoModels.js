// Importar bibliotecas
const Sequelize = require('sequelize');

// Importar Módulos
const database = require('../config/dbConfig');
const medicoModels = require('./medicoModels');

const end_medModels = database.define('endereco_medicos', {
    idmed_end: {
        type: Sequelize.INTEGER(4),
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    cep : Sequelize.CHAR(8),
    logradouro : Sequelize.STRING(100),
    num_end_med : Sequelize.STRING(7),
    bairro : Sequelize.STRING(100),
    complemento : Sequelize.STRING(50),
    pt_ref : Sequelize.STRING(50),
    cidade : Sequelize.STRING(60),
    uf : Sequelize.CHAR(2),
    pais : Sequelize.STRING(30),
    tipo_end_med : Sequelize.ENUM('RESIDENCIAL', 'COMERCIAL'),
    id_end_med : {
        type : Sequelize.INTEGER(4),
        references : {
            model : medicoModels,
            key : 'idmedico'
        }
    }
});

database.sync();

// Exportar Módulos
module.exports = end_medModels;
