import express from "express";

const app = express();
const port = 8080;

app.get('/', (req, res) => {
    res.status(200).send({response : "Sucesso ao Carregar a pagina"})
});

app.listen(port, () => console.log(`Acesse: http://localhost:${port}/`));