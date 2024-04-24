const bcrypt = require('bcrypt'); // Variável que vai receber a criptografia
const LocalStrategy = require('passport-local').Strategy; // Estratégia escolhida pelo passport

// Importação dos Models
const gestorAdminModels = require('../models/gestorAdminModels');
const gestorModels = require('../models/gestorModels');
const medicoModels = require('../models/medicoModels');
const medicoConvModels = require('../models/medicoConvModels');
const atletaModels = require('../models/atletaModels');

module.exports = async function (passport) {

    async function findUserById(id) {
        try{

            // Verificar se exite Gestor-Admin
            const managerAdminExists = await gestorAdminModels.findOne({where: {idadmin: id}});
            if(managerAdminExists){
                return managerAdminExists
            }

            // Verificar se exite Gestor
            const managerExists = await gestorModels.findOne({where: {idgestor: id}}); // Gestor
            if(managerExists){
                return managerExists
            }

            // Verificar se exite Médico
            const medicExists = await medicoModels.findOne({where: {idmedico: id}});
            if(medicExists){
                return medicExists
            }

            // Verificar se exite Médico
            const medicConvExists = await medicoConvModels.findOne({where: {idmedico: id}});
            if(medicConvExists){
                return medicConvExists
            }

            // Verificar se exite Atleta
            const athleteExists = await atletaModels.findOne({where: {idatleta: id}}); // Gestor
            if(athleteExists){
                return athleteExists
            }
        }
        catch(err){
            console.log("Houve um erro no servidor interno, tente novamente mais tarde!")
        }
    }

    passport.serializeUser(async (user, done) => {
        try{

            // Verificar o usuário Gestor-Admin
            done(null, user.idadmin);

            // Verificar o usuário Gestor
            done(null, user.idgestor);
            
            // Verificar o usuário Médico
            done(null, user.idmedico);
            
            // Verificar o usuário Médico Convidado
            done(null, user.idmedico_conv);
            
            // Verificar o usuário Atleta
            done(null, user.idatleta);
        }
        catch(err){
            console.log("Houve um erro no servidor interno, tente novamente mais tarde!")
        };
    });

    passport.deserializeUser((id, done) => {
        try {
            const user = findUserById(id);
            done(null, user);
        } catch (err) {
            done(err, null);
        };
    });

    passport.use(new LocalStrategy(
        async (cpf, senha, done) => {
            try {

                // Verificar se exite Gestor-Admin
                const managerAdminExists = await gestorAdminModels.findOne({where: {cpf: cpf}});
                if(managerAdminExists){
                    user = managerAdminExists
                }

                // Verificar se exite Gestor
                const managerExists = await gestorModels.findOne({where: {cpf: cpf}}); // Gestor
                if(managerExists){
                    user = managerExists
                }

                // Verificar se exite Médico
                const medicExists = await medicoModels.findOne({where: {cpf: cpf}});
                if(medicExists){
                    user = medicExists
                }

                // Verificar se exite Médico
                const medicConvExists = await medicoConvModels.findOne({where: {cpf: cpf}});
                if(medicConvExists){
                    user = medicConvExists
                }

                // Verificar se exite Atleta
                const athleteExists = await atletaModels.findOne({where: {cpf: cpf}}); // Gestor
                if(athleteExists){
                    user = athleteExists
                }

                if(!user){
                    return done(null, false)
                }
                
                const isValid = bcrypt.compareSync(senha.toString(), user.senha)

                if(!isValid){
                    return done(null, false)
                }
                
                return done(null, user)

            } catch (err) {
                done(err, false);
            }
        }
    ));
};