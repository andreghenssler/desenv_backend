const express = require('express');
const fs = require('fs');
const path = require('path');
const Venda = require('Venda');
const {
    calcularQuantidadeTotal,
    calcularValorTotal,
    calcularPrecoMedio
} = require('calculadoraService');

const router = express.Router();

router.get('/resumo', (req, res) => {
    const vendasRaw = JSON.parse(
        fs.readFileSync(path.join(__dirname, 'vendas1.json'), 'utf-8')
    );

    const vendas = vendasRaw.map(v => new Venda(v));

    const quantidadeTotal = calcularQuantidadeTotal(vendas);
    const valorTotal = calcularValorTotal(vendas);
    const precoMedio = calcularPrecoMedio(vendas);

    res.json({
        quantidadeTotal,
        valorTotal: valorTotal.toFixed(2),
        precoMedio: precoMedio.toFixed(2)
    });
});

module.exports = router;
