const express = require('express');
const app = express();
const userRoutes = require('./src/routes/user.routes'); // ou caminho relativo correto

app.use(express.json());
app.use('/api/usuarios', userRoutes);

app.listen(3000, () => console.log('Servidor rodando na porta http://localhost:3000'));
