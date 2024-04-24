// Importar biblioteca
const Sequelize = require('sequelize'); // Vai receber o sequelize

// Conectar com banco de dados
const database = new Sequelize('SESI','api','Senai115',{
    dialect: 'mysql',
    host:'4.228.66.252',
    port: 30306,
});

// Exportar módulo
module.exports = database;
