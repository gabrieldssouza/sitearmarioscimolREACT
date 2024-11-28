const alocacaoModel = require('../models/alocacaoModel');

exports.alocarArmario = async (req, res) => {
    try {
        const { armarioId, dataInicio, dataValidade, nomeAluno, turmaAluno } = req.body;
        const result = await alocacaoModel.alocarArmario(armarioId, dataInicio, dataValidade, nomeAluno, turmaAluno);
        res.status(200).send(result);
    } catch (err) {
        res.status(500).send('Erro ao alocar armário');
        console.error(err);
    }
};

exports.buscarAlocacoesPorAluno = async (req, res) => {
    try {
        const { idArmario } = req.params;
        const result = await alocacaoModel.buscarAlocacoesPorAluno(idArmario);
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

exports.editarLocacaoController = async (req, res) => {
    const { armarioId, nomeAluno, turmaAluno, dataInicio, dataValidade } = req.body; 

    if (!armarioId || !nomeAluno || !turmaAluno || !dataInicio || !dataValidade) {
        res.status(400).json({ error: 'Todos os campos são obrigatórios' });
    }
    try {
        const result = await alocacaoModel.editarLocacao(armarioId, nomeAluno, turmaAluno, dataInicio, dataValidade);
        res.status(200).send(result);
    } catch (err) {
        res.status(500).send('Erro na edição do armário');
        console.error(err); 
    }
};