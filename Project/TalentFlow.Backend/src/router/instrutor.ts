import express from "express";

import instrutorController from "../Controllers/InstrutorController.ts";

import { authMiddleware } from "../Middlewares/authMiddleware.ts";
import { roleMiddleware } from "../Middlewares/roleMiddleware.ts";
import { validationMiddleware } from "../Middlewares/validationMiddleware.ts";

import {
    criarUserSchema,
    editarInstrutorSchema
} from "../DTO/schemas/instrutorSchema.ts";
import AuthController from "../Controllers/authController.ts";


const route = express.Router();



route

    .post(
        "/criarInstrutor",

        authMiddleware,

        roleMiddleware("INSTRUTOR"),

        validationMiddleware(criarUserSchema),

        AuthController.register
    )



    .put(
        "/editarInstrutor/:EDV",

        authMiddleware,

        roleMiddleware("INSTRUTOR"),

        validationMiddleware(editarInstrutorSchema),

        instrutorController.editarInstrutor
    )

export default route;