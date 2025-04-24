const pedidos = require('./clientes'); // importando o arquivo clientes.js

const formatadorMoeda = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
});

function calcularQuantidadeTotal(pedidos) {
    let total = 0;
    for (let pedido of pedidos) {
        total += pedido.quantidade;
    }
    return total;
}

function calcularPrecoMedioGeral(pedidos) {
    let totalPreco = 0;
    for (let pedido of pedidos) {
        totalPreco += pedido.precoUnitario;
    }
    return totalPreco / pedidos.length;
}

function calcularValorTotal(pedidos) {
    let valorTotal = 0;
    for (let pedido of pedidos) {
        valorTotal += pedido.precoUnitario * pedido.quantidade;
    }
    return valorTotal;
}

// Executando e mostrando os resultados
const quantidadeTotal = calcularQuantidadeTotal(pedidos);
const precoMedioGeral = calcularPrecoMedioGeral(pedidos);
const valorTotal = calcularValorTotal(pedidos);

console.log("Quantidade Total:", quantidadeTotal);
console.log("Preço Médio Geral:", formatadorMoeda.format(precoMedioGeral));
console.log("Valor Total:", formatadorMoeda.format(valorTotal));

