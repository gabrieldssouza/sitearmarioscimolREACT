const alocacaoModel = require('../models/alocacaoModel');

exports.alocarArmario = async (req, res) => {
    try {
        const { alunoId, armarioId, dataInicio, dataValidade } = req.body;
        const result = await alocacaoModel.alocarArmario(alunoId, armarioId, dataInicio, dataValidade);
        res.status(200).send(result);
    } catch (err) {
        res.status(500).send('Erro ao alocar armário');
        console.error(err);
    }
};

exports.buscarAlocacoesPorAluno = async (req, res) => {
    try {
        const { idAluno } = req.params;
        const result = await alocacaoModel.buscarAlocacoesPorAluno(idAluno);
        res.status(200).send(result);
    } catch (err) {
        res.status(500).send('Erro ao buscar alocações do aluno');
        console.error(err);
    }
};

exports.desalocarArmario = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await alocacaoModel.desalocarArmario(id);
        res.status(200).send(result);
    } catch (err) {
        res.status(500).send('Erro ao desalocar armário');
        console.error(err);
    }
};
