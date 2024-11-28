const db = require('./db');

exports.alocarArmario = async (alunoId, armarioId, dataInicio, dataValidade) => {
    const sql = `
        INSERT INTO alocacao (data_inicio, data_validade, aluno_idAluno, armario_idArmario)
        VALUES (?, ?, ?, ?)
    `;
    return new Promise((resolve, reject) => {
        db.query(sql, [dataInicio, dataValidade, alunoId, armarioId], (err) => {
            if (err) return reject(err);
            resolve('Armário alocado com sucesso');
        });
    });
};

exports.buscarAlocacoesPorAluno = async (idAluno) => {
    const sql = `
        SELECT a.idAlocacao, a.data_inicio, a.data_validade, ar.numero AS armario_numero, ar.local AS armario_local
        FROM alocacao a
        JOIN armario ar ON a.armario_idArmario = ar.idArmario
        WHERE a.aluno_idAluno = ?
    `;
    return new Promise((resolve, reject) => {
        db.query(sql, [idAluno], (err, results) => {
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
