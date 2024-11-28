const db = require('./db');

exports.cadastrarAluno = async (nome, turma, telefone) => {
    const sql = 'INSERT INTO aluno (nome, turma, telefone) VALUES (?, ?, ?)';
    return new Promise((resolve, reject) => {
        db.query(sql, [nome, turma, telefone], (err) => {
            if (err) return reject(err);
            resolve('Aluno cadastrado com sucesso');
        });
    });
};

exports.listarAlunos = async () => {
    const sql = 'SELECT * FROM aluno';
    return new Promise((resolve, reject) => {
        db.query(sql, (err, results) => {
            if (err) return reject(err);
            resolve(results);
        });
    });
};

exports.listarAlunoPorId = async (id) => {
    const sql = 'SELECT * FROM aluno WHERE idAluno = ?';
    return new Promise((resolve, reject) => {
        db.query(sql, [id], (err, results) => {
            if (err) return reject(err);
            resolve(results);
        });
    });
};

exports.editarAluno = async (id, nome, turma, telefone) => {
    const sql = 'UPDATE aluno SET nome = ?, turma = ?, telefone = ? WHERE idAluno = ?';
    return new Promise((resolve, reject) => {
        db.query(sql, [nome, turma, telefone, id], (err) => {
            if (err) return reject(err);
            resolve('Aluno editado com sucesso');
        });
    });
};