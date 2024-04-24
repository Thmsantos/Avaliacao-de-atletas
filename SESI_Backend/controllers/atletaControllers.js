// Importar bibliotecas
const fs = require("fs"); // Variável que vai pegar o "fs"
const path = require("path"); // Variável que vai pegar a "path"
const bcrypt = require("bcrypt"); // Variável que vai pegar a criptografia
const { QueryTypes } = require("sequelize");

// Importar módulos
const database = require("../config/dbConfig"); // "database" é uma variável que vai receber as configurações do "dbConfig"
const atletaModels = require("../models/atletaModels"); // "atletaModels" é uma variável que vai receber o model do atleta
const examesModels = require("../models/exameModels"); // "exameModels" é uma variável que vai receber o model do exame
const atletaTel = require("../models/telAtletaModels.js"); // "atletaTel" é uma variável que vai receber o model telefone do atleta

// Criando class "atletaControllers" para fazer o CRUD
class atletaControllers {

  static async listUsersOne(req, res) {
    await database.sync(); // Conexão com o banco de dados
    let data = await atletaModels.findOne({ raw: true, where: { email: req.body.email }, attributes: ['nome', 'cargo'] }); // Listar dados sobre ele mesmo
    res.status(200).json(data); // Resposta para o usuário
  };

  // -------------------------- LISTAR DADOS DO USUÁRIO --------------------------
  static async listUsers(req, res) {
    let email = req.params.email;
    let atleta = await atletaModels.findOne({ where: { email: email }, raw: true });
    await database.sync(); // sincronização com o banco de dados
    let tel_atl = await atletaTel.findOne({
      where: { idtel_atl: atleta.idatleta },
    });
    let array = [atleta, tel_atl];
    res.status(200).json(array); // resposta para o front end
  }

  // -------------------------- ALTERAR USUÁRIO --------------------------
  static async changeUser(req, res) {
    await database.sync(); // Conexão com o BD

    let email = req.body.email;
    let telefone = req.body.telefone;
    let user = await atletaModels.findOne({ where: { email: email } });
    let tipo_tel_atl = req.body.tipo_tel;

    if (
      req.body.senha_nova != null &&
      req.body.senha != null
    ) {
      try {
        let user = await atletaModels.findOne({ where: { email: email } }); // Vai pegar todas informações do BD
        const checarSenha = await bcrypt.compare(req.body.senha, user.senha); // Comparar com a senha criptografada

        // Criar a senha
        const salt = await bcrypt.genSalt(12); // Vai dificultar sua senha
        const passwordHash = await bcrypt.hash(
          req.body.senha_nova.toString(),
          salt
        ); // Vai receber a nova senha do usuário e vai adicionar o "Salt"

        if (checarSenha) {
          // Caso exista a senha criptografada
          req.body.senha = passwordHash;
          let dado = req.body;
          await atletaModels.update(dado, { where: { email: email } }); // altera os dados do atleta
          return res.status(200).json({ msg: "Senha Atualizada" }); // envia a resposta para o cliente
        } else {
          return res.status(200).json({ msg: "Senha inválida" }); // caso nao esteja válida, envia outra resposta para o cliente
        }
      } catch (error) {
        console.error(error)
      }

    }

    if (telefone != null && telefone.length == 11) {
      try {
        const num_tel_atl = telefone.substr(2);
        const ddd = telefone.substr(0, 2);
        await atletaTel.update(
          { ddd: ddd },
          { where: { idtel_atl: user.idatleta } }
        ); // atualiza o ddd do cliente
        await atletaTel.update(
          { num_tel_atl: num_tel_atl },
          { where: { idtel_atl: user.idatleta } }
        ); // atualiza o numero do cliente
        await atletaTel.update(
          { tipo_tel_atl: tipo_tel_atl },
          { where: { idtel_atl: user.idatleta } }
        );
        if (tipo_tel_atl == null) {
          res.status(404).json({ msg: "Tipo do telefone inválido" }); // caso esteja errado, envia outra resposta para o cliente
        }

        if (telefone == null) {
          res.status(404).json({ msg: "Número de telefone inválido" }); // caso esteja errado, envia outra resposta para o cliente
        }

        res.status(200).json({ msg: "Telefone Atualizado" }); // envia a resposta para o cliente

      } catch (error) {
        console.error(error)
        res.status(404).json(error)
      }
    }
  }

  // -------------------------- VISUALIZAR EXAMES SOLICITADOS --------------------------
  static async viewFile(req, res) {
    try{
      let email = req.params.email
      let atleta = await atletaModels.findOne({raw : true, where : {email : email}})
      let idatleta = atleta.idatleta
      let exames = await examesModels.findAll({raw : true, where : {id_exame_atl : idatleta}})
      res.send(exames)
    }
    catch(err){
      res.send('Erro')
    }
  }

  // -------------------------- ENVIAR GUIA DO EXAME --------------------------
  static async alterarPdf(req, res) {
    let email = req.params.email;
    let decisao = req.body.decisao;

    let atleta = await atletaModels.findOne({ where: { email: email }, raw: true });

    let request = await examesModels.findAll({
      raw: true,
      where: {
        id_exame_atl: atleta.idatleta,
      },
    });


    await database.sync(); // Conexão com o banco de dados
    if (decisao === false) { // caso falso ele deve excluir o arquivo     
      try {
        fs.access(path.join(__dirname, "../download/" + "guia_exame-" + request[0].idexame + '.pdf'), fs.constants.F_OK, (err) => { // fs.acess verifica se o arquivo existe
          if (err) {
            console.log('arquivo não existe')
          }
          else { // caso o arquivo exista ele exclui
            console.log('arquivo existe')
            fs.unlinkSync(path.join(__dirname, "../download/" + "guia_exame-" + request[0].idexame + '.pdf'));
          };
        });
      }
      catch (err) {
        if (err.code === "ENOENT") {
          console.log('error: ARQUIVO NÃO EXISTE'); // caso de erro ele manda uma mensagem
        };
      }
      res.send({ msg: 'arquivo deletado' }); // envia uma resposta para o front
    }
    else if (decisao === true) { // caso true ele deve baixar o arquivo no diretório e enviar o caminho do arquivo
      fs.writeFileSync( // baixa o arquivo do banco e adiciona no diretório
        path.join(
          __dirname,
          "../download/" + "guia_exame-" + request[0].idexame + ".pdf"
        ),
        request[0]["pdfexame"]
      );
      res.send({ msg: `http://4.228.66.252:24/guia_exame-${request[0].idexame}.pdf` }); // envia a resposta para o front
    }
  };

  // -------------------------- ENVIAR EXAMES --------------------------
  static async sendPdf(req, res) {
     try {
      console.log(req.body.idexame)
      let email = req.params.email
      let atleta = await atletaModels.findOne({ where: { email: email }, raw: true });
      let pdf = fs.readFileSync(
        path.join(__dirname, "../uploads/" + req.file.filename)
      ); // Variável que pega o arquivo

      await database.sync(); // Conexão com o banco de dados
      await examesModels.update( // Realiza a alteração no banco de dados
        { pdfatleta: pdf },
        { where: { idexame : req.body.idexame} }
      ); // Alterar dados do banco de dados

      await atletaModels.update({ situacao: "EM ANÁLISE" }, { where: { idatleta: atleta.idatleta } })
      res.status(200).json({ msg: "Exame enviado com sucesso" }); // Retorno final
      fs.unlinkSync(path.join(__dirname, "../uploads/" + req.file.filename));
    }
    catch (error) {
      console.error(error)
      res.status(404).json({ msg: "Arquivo muito extenso" })
    }
  }
}

// Exportar módulos
module.exports = atletaControllers;
