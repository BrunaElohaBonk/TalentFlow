import express from "express";
import routes  from "./router/routers.ts";
import cors from "cors"
import dotenv from "dotenv";

const app = express();
const port = 8080;
dotenv.config({ quiet: true })

app.use(cors({
    origin: '*'
}))

routes(app)

app.get('/', (req, res) => {
    res.status(200).send({response : "Sucesso ao Carregar a pagina"})
});

app.listen(port, () => console.log(`Acesse: http://localhost:${port}/`));



