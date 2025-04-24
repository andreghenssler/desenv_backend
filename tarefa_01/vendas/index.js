import express from 'express';
const app = express();
const port = 3000;


app.use(express.json());
app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.post('/vendas', (req, res) => {
    const { produto, vendedor, valor } = req.body;
    res.json({
        produto,
        vendedor,
        valor
    });
});

app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`);
});
