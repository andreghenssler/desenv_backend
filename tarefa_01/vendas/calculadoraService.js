function calcularQuantidadeTotal(vendas) {
    let total = 0;
    for (const venda of vendas) {
        total += venda.quantidade;
    }
    return total;
}

function calcularValorTotal(vendas) {
    let total = 0;
    for (const venda of vendas) {
        total += venda.precoUnitario * venda.quantidade;
    }
    return total;
}

function calcularPrecoMedio(vendas) {
    const quantidadeTotal = calcularQuantidadeTotal(vendas);
    const valorTotal = calcularValorTotal(vendas);
    return quantidadeTotal === 0 ? 0 : valorTotal / quantidadeTotal;
}

module.exports = {
    calcularQuantidadeTotal,
    calcularValorTotal,
    calcularPrecoMedio
};
