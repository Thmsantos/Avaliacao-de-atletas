const database = require('../config/dbConfig');
const Sequelize = require('sequelize');

const recoverModels = database.define('recuperar_senha', {
    idrecsenha:{
        type : Sequelize.INTEGER(4),
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    codigo: Sequelize.STRING(6),
    email : Sequelize.STRING(100)
});

database.sync();

module.exports = recoverModels;
