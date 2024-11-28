const db = require('./db');

exports.listarArmarios = async () => {
    const sql = 'SELECT * FROM armario';
    return new Promise((resolve, reject) => {
        db.query(sql, (err, results) => {
            if (err) return reject(err);
            resolve(results);
        });
    });
};

exports.listarArmariosPorLocal = async (local) => {
    const sql = "SELECT * FROM armario WHERE local = ?";
    return new Promise((resolve, reject) => {
        db.query(sql, [local], (err, results) => {
            if (err) return reject(err);
            resolve(results);
        });
    });
};

exports.listarArmarioPorId = async (id) => {
    const sql = 'SELECT * FROM armario WHERE idArmario = ?';
    return new Promise((resolve, reject) => {
        db.query(sql, [id], (err, results) => {
            if (err) return reject(err);
            resolve(results[0]);
        });
    });
};

exports.adicionarArmario = async (numero, local, status) => {
    const sql = 'INSERT INTO armario (numero, local, status) VALUES (?, ?, ?)';
    return new Promise((resolve, reject) => {
        db.query(sql, [numero, local, status], (err) => {
            if (err) return reject(err);
            resolve('Armário adicionado com sucesso');
        });
    });
};

exports.editarArmario = async (id, numero, local, status) => {
    const sql = 'UPDATE armario SET numero = ?, local = ?, status = ? WHERE idArmario = ?';
    return new Promise((resolve, reject) => {
        db.query(sql, [numero, local, status, id], (err) => {
            if (err) return reject(err);
            resolve('Armário editado com sucesso');
        });
    });
};

exports.removerArmario = async (id) => {
    const sql = 'DELETE FROM armario WHERE idArmario = ?';
    return new Promise((resolve, reject) => {
        db.query(sql, [id], (err) => {
            if (err) return reject(err);
            resolve('Armário removido com sucesso');
        });
    });
};