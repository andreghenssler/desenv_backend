import express from 'express';
const app = express();
const PORT = 3000;

app.use(express.json());
app.get('/', (req, res) => {
    res.send('API funcionando!');
});

app.post('/usuarios', (req, res) => {      
    const { nome } = req.body;
    res.json({
        message: `Usuario ${nome} criado com sucesso!`,
    });
});

app.listen(PORT, () => {
    console.log(`Example app listening on PORT http://localhost:${PORT}/`)
});