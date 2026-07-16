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
    )



    .get(
        "/visualizarTurmas",

        authMiddleware,

        roleMiddleware("INSTRUTOR"),

        turmaController.verTurmas
    )



    .get(
        "/buscarTurma/:id",

        authMiddleware,

        roleMiddleware("INSTRUTOR"),

        turmaController.buscarTurma
    )



    .put(
        "/atualizarTurma/:id",

        authMiddleware,

        roleMiddleware("INSTRUTOR"),

        turmaController.atualizarTurma
    )



    .delete(
        "/deletarTurma/:id",

        authMiddleware,

        roleMiddleware("INSTRUTOR"),

        turmaController.deletarTurma
    )



export default route;