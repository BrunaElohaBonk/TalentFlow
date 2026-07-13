import express from 'express';
import  AuthController  from '../Controllers/authController.ts';


const route = express.Router();

route
    .post('/registerUser/',AuthController.register)
    .post('/login',AuthController.login)
    .post('/logout',AuthController.Logout)
    .post('/esqueciSenha',AuthController.EsqueceuSenha)
    .put('/alterarSenha',AuthController.redefinirSenha)


export default route;