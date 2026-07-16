import express from "express";

import turmaController from "../Controllers/turmaController.ts";

import { authMiddleware } from "../Middlewares/authMiddleware.ts";
import { roleMiddleware } from "../Middlewares/roleMiddleware.ts";


const route = express.Router();



route
    .post(
        "/criarTurma",

        authMiddleware,

        roleMiddleware("INSTRUTOR"),

        turmaController.criarTurma
    ) // funcionou no postman sem middleware



    .get(
        "/visualizarTurmas",

        authMiddleware,

        roleMiddleware("INSTRUTOR"),

        turmaController.verTurmas
    ) // funcionou no postman sem middleware




    .get(
        "/buscarTurma/:id",

        authMiddleware,

        roleMiddleware("INSTRUTOR"),

        turmaController.buscarTurma
    ) // funcionou no postman sem middleware




    .put(
        "/atualizarTurma/:id",

        authMiddleware,

        roleMiddleware("INSTRUTOR"),

        turmaController.atualizarTurma
    ) // funcionou no postman sem middleware



    .delete(
        "/deletarTurma/:id",

        authMiddleware,

        roleMiddleware("INSTRUTOR"),

        turmaController.deletarTurma
    ) // funcionou no postman sem middleware



export default route;