const express = require('express');
const app = express();
const cors = require('cors');
const db = require('./models/db');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const router = express.Router();

app.use('/', router.get('/', (req, res) => {    
    res.status(200).send('API online');
}));

app.use('/registrar', router.post('/registrar', async (req, res) => {
    const usuarioController = require('./controllers/usuarioController');
    await usuarioController.registrar(req, res);
}));   

app.use('/logar', router.post('/logar', async (req, res) => {
    const usuarioController = require('./controllers/usuarioController');
    await usuarioController.logar(req, res);
}));

module.exports = app;