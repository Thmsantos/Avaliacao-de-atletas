// ------------------------------ SEQUELIZE ------------------------------
// Importar bibliotecas
const Sequelize = require('sequelize');
const database = require('../config/dbConfig');

//Criar models
const gestorAdminModels = database.define('gestor_admins',{
    idadmin:{
        type : Sequelize.INTEGER(4),
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    nome : Sequelize.STRING(50),
    cpf : Sequelize.CHAR(11),
    email : Sequelize.STRING(50),
    senha: Sequelize.STRING(100),
    sexo : Sequelize.ENUM("M", "F"),
    cargo : Sequelize.STRING(30)
});

database.sync();

// Exportar módulos
module.exports = gestorAdminModels;