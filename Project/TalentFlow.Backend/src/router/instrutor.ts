import express from "express";

import instrutorController from "../Controllers/InstrutorController.ts";

import { authMiddleware } from "../Middlewares/authMiddleware.ts";
import { roleMiddleware } from "../Middlewares/roleMiddleware.ts";
import { validationMiddleware } from "../Middlewares/validationMiddleware.ts";

import {
    criarInstrutorSchema,
    editarInstrutorSchema
} from "../DTO/schemas/instrutorSchema.ts";


const route = express.Router();



route

    .post(
        "/criarInstrutor",

        authMiddleware,

        roleMiddleware("INSTRUTOR"),

        validationMiddleware(criarInstrutorSchema),

        instrutorController.criarInstrutor
    )



    .put(
        "/editarInstrutor/:EDV",

        authMiddleware,

        roleMiddleware("INSTRUTOR"),

        validationMiddleware(editarInstrutorSchema),

        instrutorController.editarInstrutor
    )



    .delete(
        "/deletarInstrutor/:EDV",

        authMiddleware,

        roleMiddleware("INSTRUTOR"),

        instrutorController.DeletarInstrutor
    )



export default route;