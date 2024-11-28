const armarioModel = require('../models/armarioModel');

exports.listarArmarios = async (req, res) => {
    try {
        const result = await armarioModel.listarArmarios();
        res.status(200).send(result);
    } catch (err) {
        res.status(500).send('Erro ao listar armários');
        console.error(err);
    }
};

exports.listarArmariosPorLocal = async (req, res) => {
    try {
        const { local } = req.params;
        const result = await armarioModel.listarArmariosPorLocal(local);
        res.status(200).send(result);
    } catch (err) {
        res.status(500).send('Erro ao listar armários por local');
        console.error(err);
    }
};

exports.listarArmarioPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await armarioModel.listarArmarioPorId(id);
        res.status(200).send(result);
    } catch (err) {
        res.status(500).send('Erro ao listar armário por ID');
        console.error(err);
    }
};

exports.adicionarArmario = async (req, res) => {
    try {
        const { numero, local, status } = req.body;
        const result = await armarioModel.adicionarArmario(numero, local, status);
        res.status(200).send(result);
    } catch (err) {
        res.status(500).send('Erro ao adicionar armário');
        console.error(err);
    }
};

exports.editarArmario = async (req, res) => {
    try {
        const { id } = req.params;
        const { numero, local, status } = req.body;
        const result = await armarioModel.editarArmario(id, numero, local, status);
        res.status(200).send(result);
    } catch (err) {
        res.status(500).send('Erro ao editar armário');
        console.error(err);
    }
};

exports.removerArmario = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await armarioModel.removerArmario(id);
        res.status(200).send(result);
    } catch (err) {
        res.status(500).send('Erro ao remover armário');
        console.error(err);
    }
};