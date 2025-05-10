const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const obraController = {
  criarObra: async (req, res) => {
    const {
      nome, bairro, endereco, empresaResponsavel,
      status, cronograma, orcamento
    } = req.body;

    try {
      const novaObra = await prisma.obra.create({
        data: {
          nome,
          bairro,
          endereco,
          empresaResponsavel,
          status,
          cronograma,
          orcamento: parseFloat(orcamento)
        }
      });
      return res.status(201).json(novaObra);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Erro ao criar obra.' });
    }
  },

  listarObras: async (req, res) => {
    const { bairro } = req.query;
    try {
      const obras = await prisma.obra.findMany({
        where: bairro ? { bairro: { contains: bairro, mode: 'insensitive' } } : undefined
      });
      return res.json(obras);
    } catch (err) {
      return res.status(500).json({ error: 'Erro ao listar obras.' });
    }
  },

  buscarObraPorId: async (req, res) => {
    const { id } = req.params;
    try {
      const obra = await prisma.obra.findUnique({ where: { id: parseInt(id) } });
      if (!obra) return res.status(404).json({ error: 'Obra não encontrada' });
      return res.json(obra);
    } catch (err) {
      return res.status(500).json({ error: 'Erro ao buscar obra.' });
    }
  },

  atualizarObra: async (req, res) => {
    const { id } = req.params;
    const dados = req.body;
    try {
      const obraAtualizada = await prisma.obra.update({
        where: { id: parseInt(id) },
        data: dados
      });
      return res.json(obraAtualizada);
    } catch (err) {
      return res.status(500).json({ error: 'Erro ao atualizar obra.' });
    }
  },

  deletarObra: async (req, res) => {
    const { id } = req.params;
    try {
      await prisma.obra.delete({ where: { id: parseInt(1d) } });
      return res.status(204).send();
    } catch (err) {
      return res.status(500).json({ error: 'Erro ao deletar obra.' });
    }
  }
};

module.exports = obraController;
