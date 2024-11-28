const db = require('./db');

exports.alocarArmario = async (armarioId, dataInicio, dataValidade, nomeAluno, turmaAluno) => {
    const sqlAlocacao = `
        INSERT INTO alocacao (data_inicio, data_validade, armario_idArmario, nome_aluno, turma_aluno)
        VALUES (?, ?, ?, ?, ?)
    `;
    const sqlAtualizarStatus = `
        UPDATE armario SET status = 'ocupado' WHERE idArmario = ?
    `;
    return new Promise((resolve, reject) => {
        db.beginTransaction((err) => {
            if (err) return reject(err);

            db.query(sqlAlocacao, [dataInicio, dataValidade, armarioId, nomeAluno, turmaAluno], (err) => {
                if (err) {
                    return db.rollback(() => {
                        reject(err);
                    });
                }

                db.query(sqlAtualizarStatus, [armarioId], (err) => {
                    if (err) {
                        return db.rollback(() => {
                            reject(err);
                        });
                    }

                    db.commit((err) => {
                        if (err) {
                            return db.rollback(() => {
                                reject(err);
                            });
                        }
                        resolve('Armário alocado com sucesso e status atualizado para ocupado');
                    });
                });
            });
        });
    });
};
