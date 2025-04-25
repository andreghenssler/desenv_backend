const express = require('express');
const vendasRoutes = require('./routes/vendas');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use('/vendas', vendasRoutes);
app.get('/', (req, res) => {
    res.send(`
        <h1>Resumo de Vendas</h1>
        <ul>
            <li><a href="/vendas/resumo/geral">Resumo Geral</a></li>
            <li><a href="/vendas/resumo/data">Resumo por Data</a></li>
            <li><a href="/vendas/resumo/estado">Resumo por Estado (UF)</a></li>
        </ul>
    `);
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}/`);
});
