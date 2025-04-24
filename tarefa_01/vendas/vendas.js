class Venda {
    constructor({ pedido, precoUnitario, quantidade }) {
        this.pedido = pedido;
        this.precoUnitario = precoUnitario;
        this.quantidade = quantidade;
    }

    getValorTotal() {
        return this.precoUnitario * this.quantidade;
    }
}

module.exports = Venda;
