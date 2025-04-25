function calcularQuantidadeTotal(vendas) {
    return vendas.reduce((total, venda) => total + venda.quantidade, 0);
}

function calcularValorTotal(vendas) {
    return vendas.reduce((total, venda) => total + (venda.quantidade * venda.precoUnitario), 0);
}

function calcularPrecoMedio(vendas) {
    const quantidade = calcularQuantidadeTotal(vendas);
    const total = calcularValorTotal(vendas);
    return quantidade === 0 ? 0 : total / quantidade;
}

function agruparPor(vendas, chave) {
    const grupos = {};
    for (const venda of vendas) {
        const valor = venda[chave];
        if (!grupos[valor]) {
            grupos[valor] = [];
        }
        grupos[valor].push(venda);
    }
    return grupos;
}

function sumarizarGrupo(grupo) {
    return {
        quantidadeTotal: calcularQuantidadeTotal(grupo),
        valorTotal: calcularValorTotal(grupo).toFixed(2),
        precoMedio: calcularPrecoMedio(grupo).toFixed(2)
    };
}

module.exports = {
    calcularQuantidadeTotal,
    calcularValorTotal,
    calcularPrecoMedio,
    agruparPor,
    sumarizarGrupo
};
