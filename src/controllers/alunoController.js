const alunoModel = require('../models/alunoModel.js');

exports.cadastrarAluno = async (req, res) => {
    try {
        const { nome, turma, telefone } = req.body;
        const result = await alunoModel.cadastrarAluno(nome, turma, telefone);
        res.status(200).send(result);
    } catch (err) {
        res.status(500).send('Erro ao cadastrar aluno');
        console.error(err);
    }
};

exports.listarAlunos = async (req, res) => {
    try {
        const result = await alunoModel.listarAlunos();
        res.status(200).send(result);
    } catch (err) {
        res.status(500).send('Erro ao listar alunos');
        console.error(err);
    }
};

exports.listarAlunoPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await alunoModel.listarAlunoPorId(id);
        res.status(200).send(result);
    } catch (err) {
        res.status(500).send('Erro ao listar aluno por ID');
        console.error(err);
    }
};

exports.editarAluno = async (req, res) => {
    try {
        const { id } = req.params;
        const { nome, turma, telefone } = req.body;
        const result = await alunoModel.editarAluno(id, nome, turma, telefone);
        res.status(200).send(result);
    } catch (err) {
        res.status(500).send('Erro ao editar aluno');
        console.error(err);
    }
};