const usuarioModel = require('../models/usuarioModel');

exports.registrar = async (req, res) => {
    try {
        const { nome, email, senha } = req.body;
        const result = await usuarioModel.registrarUsuario(nome, email, senha);
        res.status(200).send(result);
    } catch (err) {
        res.status(500).send('Erro ao registrar usuário');
        console.log(err);
    }
}

exports.logar = async (req, res) => {    
    try {
        const { email, senha } = req.body;
        const result = await usuarioModel.logarUsuario(email, senha);
        res.status(200).send(result);
    } catch (err) {
        res.status(500).send('Erro ao logar usuário');
        console.log(err);
    }
}