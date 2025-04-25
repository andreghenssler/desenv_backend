const express = require('express');
const fs = require('fs');
const path = require('path');
const {
    calcularQuantidadeTotal,
    calcularValorTotal,
    calcularPrecoMedio,
    agruparPor,
    sumarizarGrupo
} = require('../services/calculadoraService');

const router = express.Router();

function carregarVendas() {
    const vendasRaw = JSON.parse(
        fs.readFileSync(path.join(__dirname, '../vendas1.json'), 'utf-8')
    );
    return vendasRaw;
}

// Sumarização geral
router.get('/resumo/geral', (req, res) => {
    const vendas = carregarVendas();
    res.json({
        quantidadeTotal: calcularQuantidadeTotal(vendas),
        valorTotal: calcularValorTotal(vendas).toFixed(2),
        precoMedio: calcularPrecoMedio(vendas).toFixed(2)
    });
});

// Sumarização por data
router.get('/resumo/data', (req, res) => {
    const vendas = carregarVendas();
    const agrupado = agruparPor(vendas, 'data');

    const resultado = {};
    for (const data in agrupado) {
        resultado[data] = sumarizarGrupo(agrupado[data]);
    }

    res.json(resultado);
});

// Sumarização por estado (UF)
router.get('/resumo/estado', (req, res) => {
    const vendas = carregarVendas();
    const agrupado = agruparPor(vendas, 'uf');

    const resultado = {};
    for (const uf in agrupado) {
        resultado[uf] = sumarizarGrupo(agrupado[uf]);
    }

    res.json(resultado);
});

module.exports = router;
