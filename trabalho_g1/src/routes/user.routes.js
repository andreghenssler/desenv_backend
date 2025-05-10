const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Rota de teste (GET)
router.get('/', (req, res) => {
  res.send('Rota de usuários funcionando!');
});

// Rota de cadastro (POST)
router.post('/register', async (req, res) => {
  const { nome, email, senha, tipo } = req.body;

  try {
    const senhaHash = await bcrypt.hash(senha, 10);

    const novoUsuario = await prisma.user.create({
        data: {
            nome: "João",
            email: "joao@email.com",
            senha: senhaHash,
            tipo: "servidor"
        },
    });

    res.status(201).json({ message: 'Usuário criado com sucesso', usuario: novoUsuario });
  } catch (error) {
    console.error('Erro ao registrar usuário:', error);
    res.status(500).json({ error: 'Erro interno ao registrar usuário' });
  }
});

module.exports = router;
