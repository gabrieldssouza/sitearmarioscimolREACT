const app = require('../src/api');

app.use((req, res, next) => {
    next();
});

app.listen(21121, () => {
    console.log('Servidor online');
});