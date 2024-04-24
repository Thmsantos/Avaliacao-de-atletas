const database = require('../config/dbConfig')
const Sequelize = require('sequelize')

const bcrypt = require('bcrypt'); // Variável que vai pegar a criptografia
const nodemailer = require("nodemailer");

const atletaModels = require('../models/atletaModels')
const medicoModels = require('../models/medicoModels')
const medicoConvModels = require('../models/medicoConvModels')
const gestorModels = require('../models/gestorModels')
const gestorAdminModels = require('../models/gestorAdminModels')
const recoverModels = require('../models/recoverPswdModels')

const tabelas = [atletaModels, medicoConvModels, medicoModels, gestorAdminModels, gestorModels]

const obj = {
    'ATLETA': atletaModels,
    'Médico': atletaModels,
    'Médico convidado': atletaModels,
    'gestor admin': atletaModels,
    'gestor': atletaModels,
}

class recuperarSenhaControllers {

    static async mandarEmail(req, res) {
        let email = req.body.email
        await database.sync()
        for (let x = 0; x < tabelas.length; x++) {
            let request = await tabelas[x].findOne({ raw: true, where: { email: email } })
            if (request) {
                let array = []
                for (let x = 0; x < 6; x++) {
                    let numero = Math.floor(Math.random() * 10) //cria o código aletório
                    array.push(numero)
                }
                array = array.join("") //transforma em string

                let testAccount = {
                    user: 'thiagomessias411@outlook.com',
                    pass: 'Thiago2004'
                }


                let transporter = nodemailer.createTransport({
                    service: "hotmail",
                    auth: {
                        user: testAccount.user,
                        pass: testAccount.pass,
                    },
                });
                let cargo = Object.values(request)[9]
                let info = await transporter.sendMail({ //manda o email com o código gerado randomicamente
                    from: testAccount.user,
                    to: email,
                    subject: "Verificação de código",
                    text: "",
                    html: `<p>Esse eh o codigo de verificacao: </p>
                <br/>
                <b>${array}</b>    
        `,
                }).then(async () => { //criar um registro com o email e o codigo para fazer a verificação na função abaixo 'verifyCode'
                    let request = await recoverModels.create({
                        codigo: array,
                        email: email
                    })
                    console.log(cargo)
                    res.status(200).json({ msg: 'Email enviado', error: false, tabela: cargo })
                })


                break
            }
            else if (request == null && x == tabelas.length - 1) {
                res.status(200).json({ msg: 'Nao existe esse email', error: true })
            }
        }
    }

    static async verificarCodigo(req, res) {
        await database.sync()
        let request = await recoverModels.findOne({ raw: true, where: { email: req.body.email } })
        if (request === {} | request === undefined | request === null) {
            res.send("O email não foi encontrado")
        }
        else {
            const salt = bcrypt.genSaltSync(2)
            const hash = bcrypt.hashSync(req.body.senha.toString(), salt)
            req.body.senha = hash
            if (req.body.codigo === request.codigo) {
                await obj[req.body.cargo].update(req.body, { where: { email: req.body.email } })
                    .then(() => res.status(200).json({ msg: 'Email atualizado com sucesso' }))
                    .catch((err) => res.send(err))
            }
            else {
                res.send("Código não é o mesmo enviado")
            }
        }

    }

}

module.exports = recuperarSenhaControllers