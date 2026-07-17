import express from "express";
import {roleMiddleware} from "../Middlewares/roleMiddleware.ts"
import {authMiddleware} from "../Middlewares/authMiddleware.ts"
import AuthController from "../Controllers/authController.ts";
import { validationMiddleware } from "../Middlewares/validationMiddleware.ts";


import {
    loginSchema, 
    redefinirSenhaSchema,
    esqueceuSenhaSchema
} from "../DTO/schemas/authSchema.ts";
import{criarUserSchema} from "../DTO/schemas/instrutorSchema.ts"


const route = express.Router();


route.post(
    "/register",

    validationMiddleware(criarUserSchema),

    AuthController.register
);


route.post(
    "/login",

    validationMiddleware(loginSchema),

    AuthController.login
);


route.post(
    "/redefinirSenha",

    validationMiddleware(redefinirSenhaSchema),

    AuthController.redefinirSenha
);


route.post(
    "/esqueceuSenha",

    validationMiddleware(esqueceuSenhaSchema),

    AuthController.esqueceuSenha
);


route.post(
    "/logout",

    AuthController.logout
);


route.put(
        "/deletarInstrutor/:EDV",

        authMiddleware,

        roleMiddleware("INSTRUTOR"),

        AuthController.DeletarUser
    )

export default route;