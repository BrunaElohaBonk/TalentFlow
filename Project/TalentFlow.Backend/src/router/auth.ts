import express from "express";

import AuthController from "../Controllers/authController.ts";

import { authMiddleware } from "../Middlewares/authMiddleware.ts";


const route = express.Router();



route.post(
    "/registerUser",
    AuthController.register
);



route.post(
    "/login",
    AuthController.login
);



route.post(
    "/logout",
    authMiddleware,
    AuthController.logout
);


route.post(
    "/esqueciSenha",
    AuthController.esqueceuSenha
);


route.put(
    "/alterarSenha",
    AuthController.redefinirSenha
);



export default route;