// Importar bibliotecas
const Sequelize = require('sequelize');

// Importar Módulos
const database = require('../config/dbConfig');
const gestorAdminModels = require('./gestorAdminModels');

// Criar models
const gestorModels = database.define('gestores', {
    idgestor: {
        type: Sequelize.INTEGER(4),
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    nome: Sequelize.STRING(50),
    cpf: Sequelize.CHAR(11),
    senha: Sequelize.STRING(100),
    email: Sequelize.STRING(50),
    sexo : Sequelize.ENUM("M", "F"),
    cargo : Sequelize.STRING(30),
    id_admin: {
        type: Sequelize.INTEGER(4),
        references: {
            model: gestorAdminModels,
            key: 'idadmin'
        }
    }
});

database.sync();

// Exportar módulo
module.exports = gestorModels;
