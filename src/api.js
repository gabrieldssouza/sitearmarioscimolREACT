const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const router = express.Router();

app.use('/', router.get('/', (req, res) => {
    res.status(200).send('API online');
}));

const armarioController = require('./controllers/armarioController');
const alocacaoController = require('./controllers/alocacaoController.js');
const usuarioController = require('./controllers/usuarioController');

app.use('/registrar', router.post('/registrar', usuarioController.registrar));
app.use('/logar', router.post('/logar', usuarioController.logar));

app.use('/armarios', router.get('/armarios', armarioController.listarArmarios));
app.use('/adicionararmarios', router.post('/adicionararmarios', armarioController.adicionarArmario));
app.use('/armario/local/:local', router.get('/armario/local/:local', armarioController.listarArmariosPorLocal));
app.use('/armario/:id', router.get('/armario/:id', armarioController.listarArmarioPorId));
app.use('/editararmario/:id', router.put('/editararmario/:id', armarioController.editarArmario));
app.use('/deletararmario/:id', router.delete('/deletararmario/:id', armarioController.removerArmario));

app.use('/alocar', router.post('/alocar', alocacaoController.alocarArmario));
app.use('/alocacao/id/:idArmario', router.get('/alocacao/id/:idArmario', alocacaoController.buscarAlocacoesPorAluno));
app.use('/alocacao/:id', router.delete('/alocacao/:id', alocacaoController.desalocarArmario));

app.use('/editarLocacao', router.put('/editarLocacao', alocacaoController.editarLocacaoController))


module.exports = app;
