import express from 'express';
import  AuthController  from '../Controllers/authController.ts';


const route = express.Router();

route
    .post('/registerUser/',AuthController.register)
    .post('/login',AuthController.login)
    .post('/logout',AuthController.)
    .post('/esqueciSenha',AuthController.EsqueceuSenha)
    .put('/alterarSenha',AuthController.RedefinirSenha)


export default route;