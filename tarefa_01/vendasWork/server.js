const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Servidor Node.js 22+ rodando!');
});

app.listen(6664, () => {
    console.log('Servidor rodando em http://localhost:6664');
});