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

exports.desalocarArmario = async (id) => {
    const sqlDesalocacao = 'DELETE FROM alocacao WHERE idAlocacao = ?';
    const sqlAtualizarStatus = `
        UPDATE armario SET status = 'disponível' WHERE idArmario = ?
    `;
    return new Promise((resolve, reject) => {
        db.beginTransaction((err) => {
            if (err) return reject(err);

            db.query(sqlAtualizarStatus, [id], (err) => {
                if (err) {
                    return db.rollback(() => {
                        reject(err);
                    });
                }

                db.query(sqlDesalocacao, [id], (err) => {
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
                        resolve('Alocação removida com sucesso e status do armário atualizado para disponível');
                    });
                });
            });
        });
    });

};

exports.buscarAlocacoesPorAluno = async (idArmario) => {
    const sql = `SELECT * FROM alocacao WHERE armario_idarmario = ?`;
    return new Promise((resolve, reject) => {
        db.query(sql, [idArmario], (err, results) => {
            if (err) return reject(err);
            resolve(results[0]);
        });
    });
};

exports.editarLocacao = async (armarioId, nomeAluno, turmaAluno, dataInicio, dataValidade) => {
    const sql = 'UPDATE alocacao SET nome_aluno = ?, turma_aluno = ?, data_inicio = ?, data_validade = ? WHERE armario_idarmario = ?';
    return new Promise((resolve, reject) => {
        db.query(sql, [nomeAluno, turmaAluno, dataInicio, dataValidade, armarioId,], (err) => {
            if (err) return reject(err);
            resolve('Locação editado com sucesso');
        });
    });
};

