import express from "express";
import routes from "./router/routers.ts";
import cors from "cors";
import dotenv from "dotenv";

import { errorMiddleware } from "./Middlewares/erroMiddleware.ts";


const app = express();

const port = 8080;

app.use(
    "/uploads",
    express.static("uploads")
);


dotenv.config({
    quiet:true
});


app.use(cors({
    origin:'*'
}));


routes(app);



app.get('/', (req,res)=>{

    res.status(200).send({
        response:"Sucesso ao Carregar a pagina"
    });

});



// SEMPRE POR ÚLTIMO
app.use(errorMiddleware);



app.listen(port,()=>{

    console.log(
        `Acesse: http://localhost:${port}/`
    );

});