const db = require('./db');

exports.alocarArmario = async (armarioId, dataInicio, dataValidade, nomeAluno, turmaAluno) => {
    const sql = `
        INSERT INTO alocacao (data_inicio, data_validade, armario_idArmario, nome_aluno, turma_aluno)
        VALUES (?, ?, ?, ?, ?)
    `;
    return new Promise((resolve, reject) => {
        db.query(sql, [dataInicio, dataValidade, armarioId, nomeAluno, turmaAluno], (err) => {
            if (err) return reject(err);
            resolve('Armário alocado com sucesso');
        });
    });
};

exports.buscarAlocacoesPorAluno = async (idArmario) => {
    const sql = `
        SELECT a.idAlocacao, a.nome_aluno, a.turma_aluno, a.data_inicio, a.data_validade, ar.numero AS armario_numero, ar.local AS armario_local
        FROM alocacao a
        JOIN armario ar ON a.armario_idArmario = ar.idArmario
        WHERE a.armario_idarmario = ?
    `;
    return new Promise((resolve, reject) => {
        db.query(sql, [idArmario], (err, results) => {
            if (err) return reject(err);
            resolve(results);
        });
    });
};

exports.desalocarArmario = async (id) => {
    const sql = 'DELETE FROM alocacao WHERE idAlocacao = ?';
    return new Promise((resolve, reject) => {
        db.query(sql, [id], (err) => {
            if (err) return reject(err);
            resolve('Alocação removida com sucesso');
        });
    });
};
