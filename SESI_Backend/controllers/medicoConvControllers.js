const Sequelize = require('sequelize')
const path = require('path')
const fs = require('fs')

const database = require('../config/dbConfig')

const examesModels = require('../models/exameModels')
const atletaModels = require('../models/atletaModels')
const medicoConvModels = require('../models/medicoConvModels')

class medicoConvControllers {

    static async verExame(req, res) {
        let idMedConv = req.params.idMedConv
        await database.sync()
        let request = await examesModels.findAll({
            raw: true,
            where: { id_exame_med: idMedConv }
        })
        console.log(request)
        try {
            await examesModels.update({
                situacao: "ANALISE",
            }, { where: { id_exame_med: idMedConv } })
            fs.writeFileSync(path.join(__dirname, '../download/' + request[0]['idexame'] + '.pdf'), request[0]['pdf'])
            res.status(200).json({ msg: `http://localhost:3000/${request[0]['idexame']}.pdf` })
        }
        catch (err) {
            res.send({ msg: "Não foi possível acessaor o servidor" })
        }
    }

    static async avaliarExame(req, res) {
        let idMedConv = req.params.idMedConv
        await database.sync()
        let request = await examesModels.findOne({ where: { id_exame_med: idMedConv } })
        try {
            await examesModels.update({ situacao: "CONCLUIDO" }, { where: { id_exame_med: idMedConv } })
            await atletaModels.update(req.body, { where: { idatleta: request.id_exame_atl } })
            res.status(200).json({ msg: "Exame avaliado com sucesso" })
        }
        catch (err) {
            res.send({ msg: "Não foi possível acessar o servidor" })
        }
    }

    static async verMedicoConv(req, res){
        let email = req.params.email
        await database.sync()
        await medicoConvModels.findOne({where:{email : email}})
        .then((response) => res.send(response))
        .catch((err) => res.send(err))
    }

    static async verSolicitacoes (req, res){
        let email = req.params.email
        let arrayExames = []
        let arrayAtleta = []
        await database.sync()
        await medicoConvModels.findAll({ raw : true, where:{email:email}})
        .then((request) => {
            for(let x = 0; x < request.length; x++){
                arrayExames.push(request[x]['id_exame_conv'])
            }
            for(let y = 0; y < arrayExames.length; y++){
                examesModels.findOne({raw : true, where:{idexame : arrayExames[y]}})
                .then((response) => {
                    arrayAtleta.push(response.id_exame_atl)
                    if(y === request.length - 1) res.status(200).json(arrayAtleta)
                })
            }
        })
    }

    static async getAtletas(req, res){
        await database.sync()
        let arrayNome = []
        let arrayCpf = []
        let arrayRelacao = []
        for(let x in req.body.atletas){
            await atletaModels.findOne({raw : true, where:{idatleta : req['body']['atletas'][x]}})
            .then((response) => {
                if(response.situacao != 'APROVADO' || response.situacao != 'REPROVADO'){
                    arrayNome.push(response.nome)
                    arrayRelacao.push(response.situacao)
                    arrayCpf.push(response.cpf)
                }
            })
        }
        res.status(200).json({
            nomes : arrayNome,
            relacao : arrayRelacao,
            cpf : arrayCpf
        })
    }

}

module.exports = medicoConvControllers