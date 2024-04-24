// Importar módulos
const bcrypt = require('bcrypt'); 
const database = require('../config/dbConfig'); 

// Módulo Gestor Admin
const gestorAdminModels = require('../models/gestorAdminModels'); 

// Módulo Gestor Padrão
const gestorModels = require('../models/gestorModels'); 

// Módulo Médico
const medicoModels = require('../models/medicoModels'); 
const telMedicoModels = require('../models/telMedicoModels'); 
const enderecoMedicoModels = require('../models/enderecoMedicoModels'); 

// Módulo Médico Convidade
const medicoConvModels = require('../models/medicoConvModels'); 
const telMedConvModels = require('../models/telMedicoConvModels'); 
const endMedConvModels = require("../models/enderecoMedicoConvModels"); 

// Módulo Atleta
const atletaModels = require('../models/atletaModels'); 
const enderecoAtletaModels = require("../models/enderecoAtletaModels"); 
const telAtletaModels = require("../models/telAtletaModels"); 


const {Op} = require('sequelize');
const examesModels = require('../models/exameModels');

// Armazenar os Models
const perfil = {
    'Atleta' : [atletaModels, enderecoAtletaModels, telAtletaModels],
    'Gestor-Admin' : [gestorAdminModels],
    'Gestor': [gestorModels],
    'Médico': [medicoModels, telMedicoModels, enderecoMedicoModels],
    'Médico-Convidado' : [medicoConvModels, telMedConvModels, endMedConvModels],
}; // A const "perfil" vai armazenar todos os models. Com isso, conseguiremos diminuir a repetição do código 

// const perfil2 = [atletaModels, enderecoAtletaModels, telAtletaModels]
// Criando class "gestorControllers" para fazer o CRUD
class gestorControllers{

    // -------------------------- LISTAR Todos --------------------------
    static async listData(req, res){
        await database.sync();
        try{

            if(req.body.cargo == 'Gestor'){
                gestorAdminModels.findAll({raw: true}) 
                .then((response) => res.status(200).json(response))
            }

            if(req.body.cargo == 'Médico'){
                medicoModels.findAll({raw: true}) 
                .then((response) => res.status(200).json(response))
            }

            if(req.body.cargo == 'Médico-Convidado'){
                medicoConvModels.findAll({raw: true}) 
                .then((response) => res.status(200).json(response))
            }

            if(req.body.cargo == 'Atleta'){
                atletaModels.findAll({raw: true}) 
                .then((response) => res.status(200).json(response))
            }
        }
        catch(err){
            res.status(404).json("Usuário não encontrado");
        }
    }; 

    // -------------------------- LISTAR Todos FindOne --------------------------
    static async listDataAll(req, res){
        await database.sync();
        try{

            if(req.body.cargo == 'Gestor'){
                let cpf = req.body.cpf
                let user = await gestorModels.findOne({raw: true, where: {cpf: cpf}});
                res.status(201).json(user);
            }

            if(req.body.cargo == 'Médico'){
                let cpf = req.body.cpf
                let user = await medicoModels.findOne({raw: true, where: {cpf: cpf}});
                res.status(201).json(user);
            }

            if(req.body.cargo == 'Médico-Convidado'){
                let cpf = req.body.cpf
                let user = await medicoConvModels.findOne({raw: true, where: {cpf: cpf}});
                res.status(201).json(user);
            }

            if(req.body.cargo == 'Atleta'){
                let cpf = req.body.cpf
                let user = await atletaModels.findOne({raw: true, where: {cpf: cpf}});
                res.status(201).json(user);
            }
        }
        catch(err){
            res.status(404).json("Usuário não encontrado");
        }
    }; 
    
    // -------------------------- LISTAR Atleta --------------------------
    static async requestDoctor(req, res){
        await database.sync();
        try{
            let user = await medicoModels.findOne({where: {nome: req.body.nome}})
            res.status(200).json(user)
        }
        catch(err){
            res.status(500).json('Houve um erro interno, tente novamente mais tarde!')
        }
    }

    // -------------------------- LISTAR Atleta --------------------------
    static async listDataAthlete(req, res){
        await database.sync();
        try{
            let cpf = req.body.cpf
            let user = await atletaModels.findOne({raw: true, where: {cpf: cpf}});
            res.status(201).json(user);
        }
        catch(err){
            res.status(404).json("Atleta não encontrado");
        }
    };  

    // -------------------------- LISTAR Médico --------------------------

    static async listMedic(req, res){
        await database.sync()
        try{
            await medicoModels.findAll({raw: true})
            .then((response) => res.status(201).json(response))
        }
        catch(err){
            res.status(404).json("Houve um erro interno, tente novamente mais tarde!")
        }
    }


    // -------------------------- CRIAR USUÁRIO --------------------------
    static async createUser(req, res){ // função "createUser" é uma função para criar usuário 
        let verification = true; // Vai verificar se o programa pode dar continuidade

        Object.keys(req.body).forEach(function eachKey(key) {  
            // Validação de todos os campos 
            if(!req.body[key] || typeof req.body[key] == undefined || req.body[key] == null){
                verification = false // Vai atribuir o valor "false" para a variável
            };
        });

        if(verification == false){ // Se a variável "verification" for falsa
            return res.status(422).json({msg: 'Preencha todos os campos!'}); //  422 - O servidor entende a requisição mas os dados não estão corretos para processar
        }
        else{ // Caso a variável "verification" seja verdadeira 
            const {cpf, email} = req.body; // Essa const vai facilitar o chamado. Não precisaremos usar o req.body.campo para pegar o valor

            // Validação específica para o campo CPF
            if(!cpf || typeof cpf == undefined || cpf == null || cpf.toString().length != 11 || typeof cpf != 'number'){ 
                console.log(typeof(req.body.cpf))
                return res.status(422).json({msg: 'CPF inválido'}); // Retorna a resposta para o usuário
            };
    
            // Realizar a query para verificar se existe um usuário com esse cpf cadastrado 
            const managerAdminExists = await gestorAdminModels.findOne({where: {[Op.or]: [{cpf: cpf},{email: email}]}}); // Gestor Admin
            const managerExists = await gestorModels.findOne({where: {[Op.or]: [{cpf: cpf},{email: email}]}});; // Gestor
            const medicExists = await medicoModels.findOne({where: {[Op.or]: [{cpf: cpf},{email: email}]}});; // Médico
            const medicConvExists = await medicoConvModels.findOne({where: {[Op.or]: [{cpf: cpf},{email: email}]}}); //Médico Convidado
            const athleteExists = await atletaModels.findOne({where: {[Op.or]: [{cpf: cpf},{email: email}]}});; // Atleta

            // Realizar query 

            if(medicConvExists || medicExists){
                try{
                    const crm = req.body.crm;
                    let user = await medicoModels.findOne({where: {crm: crm}});
                    if(user){
                        return res.status(422).json({msg: 'CRM já cadastrado!'}); // Caso já tenha um usuário com esse cpf cadastrado
                    };
                }
                catch{
                    return res.status(422).json({msg: 'Email ou CPF já cadastrado!'});
                }
            };

            if(managerAdminExists || managerExists || medicExists || medicConvExists || athleteExists){
                return res.status(422).json({msg: 'Email ou CPF já cadastrado!'}); // Caso já tenha um usuário com esse cpf cadastrado
            }
            else{
                await database.sync();
                // Criar a senha
                const salt = await bcrypt.genSalt(2); // Vai dificultar sua senha
                const passwordHash = await bcrypt.hash(req.body.senha.toString(), salt); // Vai receber a senha do usuário e vai adicionar o "Salt"
                
                req.body.senha = passwordHash; // Passando a senha criptografada
            
                // Tenta salvar o usuário no banco de dados
                try{
                    let array = perfil[req.body.cargo]; // Array que vai selecionar o Model
                    array.forEach((elemento) =>{ // Esse array pega todos os models e adiciona em os dados em cada tabela
                        elemento.create(req.body); // Realiza a query para criar o usuário
                    })
                    res.status(200).json({msg: req.body.cargo + ' cadastrado com sucesso!!'}); // Retorna a resposta para o usuário
                }
                // Caso não tenha conseguido salvar o usuário
                catch(err){
                    res.status(500).json({msg: 'Erro interno, tente novamente mais tarde!'});
                };
            };
        };
    };

    // -------------------------- ALTERAR USUÁRIO --------------------------
    static async changeUser(req, res){ // Função criada para alterar usuário no banco de dados

        let cpf = req.body.cpf; // Variável que vai armazenar o id
        
        let dadoAtualizado = req.body; // Variável que vai receber os dados novos 
       
        await database.sync(); 

        let verification = true; // Vai verificar se o programa pode dar continuidade

        Object.keys(req.body).forEach(function eachKey(key) {  
            // Validação de todos os campos 
            if(!req.body[key] || typeof req.body[key] == undefined || req.body[key] == null){
                verification = false // Vai atribuir o valor "false" para a variável
            };
        });

        if(verification == false){ // Se a variável "verification" for falsa
            return res.status(422).json({msg: 'Preencha todos os campos!!'}); //  422 - O servidor entende a requisição mas os dados não estão corretos para processar
        }
        else{

            // Verifica se o cargo do usuário é Gestor Admin
            if(req.body.cargo == "Gestor-Admin"){
                try{
                    await gestorAdminModels.update(dadoAtualizado, ({where: {[Op.or]: [{cpf: cpf},{email: email}]}})); // Query de alteração
                    res.status(200).json('Gestor Admin alterado com sucesso!!'); // Retorna a resposta para o usuário
                }
                catch(err){
                    res.status(500).send("Houve um erro no servidor interno, tente novamente mais tarde!"); // Resposta final
                };
            }

            // Verifica se o cargo do usuário é Gestor
            if(req.body.cargo == "Gestor"){
                try{
                    await gestorModels.update(dadoAtualizado, {where: {cpf: cpf}}); // Query de alteração
                    res.status(200).json('Gestor alterado com sucesso!!'); // Retorna a resposta para o usuário
                }   
                catch(err){
                    res.status(500).send("Houve um erro no servidor interno, tente novamente mais tarde!"); // Resposta final
                };
            };

            // Verifica se o cargo do usuário é Médico
            if(req.body.cargo == "Médico"){
                try{
                    let user = await medicoModels.findOne({where: {cpf: cpf}});
                    await enderecoMedicoModels.update(dadoAtualizado, {where: {id_end_med: user.idmedico}}); // Altera o endereço do atleta no banco de dados
                    await telMedicoModels.update(dadoAtualizado, {where: {id_tel_med: user.idmedico}}); // Altera o telefone do atleta no banco de dados
                    await medicoModels.update(dadoAtualizado, {where: {cpf: cpf}}); // Query de alteração
                    res.status(200).json('Médico alterado com sucesso!!'); // Retorna a resposta para o usuário
                }
                catch(err){
                    res.status(500).send("Houve um erro no servidor interno, tente novamente mais tarde!"); // Resposta final
                };
            };

            if(req.body.cargo == "Médico-Convidado"){
                try{
                    let user = await medicoConvModels.findOne({where: {cpf: cpf}});
                    await endMedConvModels.update(dadoAtualizado, {where: {id_end_conv: user.id_med_conv}}); // Altera o endereço do atleta no banco de dados
                    await telMedConvModels.update(dadoAtualizado, {where: {id_tel_conv: user.id_med_conv}}); // Altera o telefone do atleta no banco de dados
                    await medicoConvModels.update(dadoAtualizado, {where: {cpf: cpf}}); // Query de alteração
                    res.status(200).json('Médico Convidado alterado com sucesso!!'); // Retorna a resposta para o usuário
                }
                catch(err){
                    res.status(500).send("Houve um erro no servidor interno, tente novamente mais tarde!"); // Resposta final
                };
            };

            // Verifica se o cargo do usuário é Atleta
            if(req.body.cargo == "Atleta"){
                try{ // Tentar salvar usuário no banco de dados
                    let user = await atletaModels.findOne({where: {cpf: cpf}})
                    console.log(user)
                    await enderecoAtletaModels.update(dadoAtualizado, {where: {id_end_atl: user.idatleta}}); // Altera o endereço do atleta no banco de dados
                    await telAtletaModels.update(dadoAtualizado, {where: {id_tel_atl: user.idatleta}}); // Altera o telefone do atleta no banco de dados
                    await atletaModels.update(dadoAtualizado, {where: {cpf: cpf}}); // Altera o atleta no banco de dados
                    res.status(200).json('Atleta alterado com sucesso!!'); // Retorna a resposta para o usuário
                }
                catch(err){ // Caso não consiga salvar no banco de dados
                    console.log(err)
                    res.status(500).send("Houve um erro no servidor interno, tente novamente mais tarde!"); // Resposta final
                };
            };
        };
    };  


    // -------------------------- DELETAR USUÁRIO --------------------------
    static async deleteUser(req, res){

        let cpf = req.body.cpf; // Variável que vai receber o cpf inserido pelo usuário
        let cargo = req.body.cargo; // Variável que vai pegar o cargo

        await database.sync(); // Conexão com o banco de dados

        if(cargo == "Gestor-Admin"){ 
            // Tentar deletar usuário
            try{
                await gestorAdminModels.destroy({where: {cpf: cpf}}); // Query para apagar 
                res.status(200).send("Gestor Admin deletado com sucesso!"); // Resposta final
            }
            catch(err){ // Caso não consiga deletar o usuário
                console.log(err)
                res.send("Erro no servidor, tente novamente mais tarde!"); // Caso não consiga deletar usuário
            };
        };

        if(cargo == "Gestor"){ 
            // Tentar deletar usuário
            try{
                await gestorModels.destroy({where: {cpf: cpf}}); // Query para apagar 
                res.status(200).send("Gestor deletado com sucesso!"); // Resposta final
            }
            catch(err){ // Caso não consiga deletar o usuário
                res.send("Erro no servidor, tente novamente mais tarde!"); // Caso não consiga deletar usuário
            };
        };


        if(cargo == "Médico"){ 
            try{
                let user =  await medicoModels.findOne({where: {cpf: cpf}}); // Deletar o médico do banco de dados 
                // telMedicoModels.destroy({where: {id_tel_med: user.idmedico}}); // Deletar telefone do médico no banco de dados
                // enderecoMedicoModels.destroy({where: {id_end_med: user.idmedico}}); // Deletar o endereço do médico cadastrado no banco de dados
                medicoModels.destroy({where: {cpf: cpf}}); // Deletar o médico do banco de dados 
                res.status(200).send("Médico deletado com sucesso!"); // Resposta final
            }
            catch(err){
                res.send("Erro no servidor, tente novamente mais tarde!"); // Caso não consiga deletar usuário
            };
        };

        if(cargo == "Médico-Convidado"){ 
            try{
                let user =  await medicoModels.findOne({where: {cpf: cpf}}); // Deletar o médico do banco de dados 
                // telMedConvModels.destroy({where: {id_tel_conv: user.id_med_conv}}); // Deletar telefone do médico no banco de dados
                // endMedConvModels.destroy({where: {id_end_conv: user.id_med_conv}}); // Deletar o endereço do médico cadastrado no banco de dados
                medicoConvModels.destroy({where: {cpf: cpf}}); // Deletar o médico do banco de dados 
                res.status(200).send("Médico deletado com sucesso!"); // Resposta final
            }
            catch(err){
                res.send("Erro no servidor, tente novamente mais tarde!"); // Caso não consiga deletar usuário
            };
        };

        if(cargo == "Atleta"){ 
            // Tentar deletar usuário
            try{
                let user = await atletaModels.findOne({where: {cpf: cpf}}); 

                // let end = enderecoAtletaModels.findOne({where: {id_end_atl: user.idatleta}}); // Deletar o endereço do atleta cadastrado no banco de dados
                // if(end){
                //     enderecoAtletaModels.destroy({where: {id_end_atl: user.idatleta}}); // Deletar o endereço do atleta cadastrado no banco de dados
                // }

                // let tel = telAtletaModels.findOne({where: {id_tel_atl: user.idatleta}}); // Deletar telefone do atleta no banco de dados
                // if(tel){
                //     telAtletaModels.destroy({where: {id_tel_atl: user.idatleta}}); // Deletar telefone do atleta no banco de dados
                // }

                // let ex = examesModels.findOne({where: {id_exame_atl}})
                // if(ex){
                //     examesModels.destroy({where: {id_exame_atl}})
                // }

                atletaModels.destroy({where: {cpf: cpf}}); // Deletar o atleta do banco de dados            
                res.status(200).send("Atleta deletado com sucesso!"); // Resposta final
            }
            catch(err){ // Caso não consiga deletar o usuário
                res.send("Erro no servidor, tente novamente mais tarde!"); // Caso não consiga deletar usuário
            };
        };
    };

    // -------------------------- SOLICITAR EXAME PARA O ATLETA --------------------------
    static async requestAthlete(req, res){
        await database.sync();
        let idMed = req.body.idmedico;
        console.log(idMed)
        try{        
            // ({where: {[Op.or]: [{cpf: cpf},{email: email}]}})
            await atletaModels.update({solicitacao : "SOLICITADO"}, {
                where:{cpf : req.body.cpf}
            });
            await atletaModels.update({id_medico_atl : idMed}, {
                where:{cpf : req.body.cpf}
            });
            await atletaModels.update({id_medico_atl: idMed}, {
                where:{cpf : req.body.cpf}
            });
            res.status(200).json({msg : "Exame solicitado com sucesso!!"});
        }
        catch(err){
            res.send({msg : "Houve um erro interno, tente novamente mais tarde"});
        };
    };

        static async verGestor(req, res){
            let email = req.params.email
            await database.sync();
            await gestorModels.findOne({where:{email : email}})
            .then((response) => res.status(200).json(response))
            .catch((err) => res.send(err))
        }
    
};

// Exportar módulos
module.exports = gestorControllers;