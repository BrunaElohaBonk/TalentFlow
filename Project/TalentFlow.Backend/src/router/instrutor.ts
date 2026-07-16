import express from "express";

import instrutorController from "../Controllers/InstrutorController.ts";

import { authMiddleware } from "../Middlewares/authMiddleware.ts";
import { roleMiddleware } from "../Middlewares/roleMiddleware.ts";
import { ownerMiddleware } from "../Middlewares/ownerMiddleware.ts";


const route = express.Router();




route.post(
    "/criarInstrutor",

    authMiddleware,

    roleMiddleware("INSTRUTOR"),

    instrutorController.criarInstrutor
);






route.put(
    "/editarInstrutor/:EDV/:id",

    authMiddleware,

    roleMiddleware("INSTRUTOR"),

    ownerMiddleware,

    instrutorController.editarInstrutor
);






route.delete(
    "/excluirInstrutor/:EDV/:id",

    authMiddleware,

    roleMiddleware("INSTRUTOR"),

    ownerMiddleware,

    instrutorController.DeletarInstrutor
);



export default route;