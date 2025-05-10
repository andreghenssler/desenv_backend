const express = require('express');
const router = express.Router();
const obraController = require('../controllers/obra.controller');
const authMiddleware = require('../middlewares/auth'); // Protege criação, edição, exclusão
const roleMiddleware = require('../middlewares/role'); // Protege criação, edição, exclusão

router.post(
  '/',
  authMiddleware,
  roleMiddleware(['SERVIDOR']),
  obraController.criarObra
);

router.put(
  '/:id',
  authMiddleware,
  roleMiddleware(['SERVIDOR']),
  obraController.atualizarObra
);

router.delete(
  '/:id',
  authMiddleware,
  roleMiddleware(['SERVIDOR']),
  obraController.deletarObra
);

module.exports = router;
