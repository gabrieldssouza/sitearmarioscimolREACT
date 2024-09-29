const db = require('./db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const secretKey = 'senhaSecreta';

async function registrarUsuario(nome, email, senha) {
    const hashedSenha = await bcrypt.hash(senha, 10);
    const usuarioValues = [nome, email, hashedSenha];
    const usuarioSql = `INSERT INTO usuario (nome, email, senha) VALUES (?, ?, ?)`;

    return new Promise((resolve, reject) => {
        db.query(usuarioSql, usuarioValues, (err) => {
            if (err) {
                return db.rollback(() => {
                    console.log(err);
                    reject('Erro ao cadastrar usuário');
                });
            }

            db.commit((err) => {
                if (err) {
                    return db.rollback(() => {
                        console.log(err);
                        reject('Erro ao confirmar transação');
                    });
                }

                console.log('Usuário registrado com sucesso');
                resolve('Usuário registrado com sucesso');
            });
        });
    });
}


async function logarUsuario(email, senha) {
    const usuarioSql = `SELECT * FROM usuario WHERE email = ?`;
    const usuarioValues = [email];

    return new Promise((resolve, reject) => {
        db.query(usuarioSql, usuarioValues, async (err, results) => {
            if (err) {
                console.log(err);
                return reject('Erro ao logar usuário');
            }

            if (results.length > 0) {
                const usuario = results[0];
                const senhaCorreta = await bcrypt.compare(senha, usuario.senha);
                console.log(senhaCorreta);
                console.log(senha);
                console.log(usuario.senha);

                if (senhaCorreta) {
                    const token = jwt.sign({ id: usuario.idUsuario, email: usuario.email }, secretKey, {
                        expiresIn: '1h',
                    });
                    resolve({ token, usuario });
                } else {
                    reject('Usuário ou senha incorretos');
                }
            } else {
                reject('Usuário ou senha incorretos');
            }
        });
    });
}

module.exports = { registrarUsuario, logarUsuario };