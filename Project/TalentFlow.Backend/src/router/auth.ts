import express from 'express';


const route = express.Router();

route
    .post('/login')
    .post('/logout')
    .post('/esqueciSenha')
    .put('/alterarSenha')


export default route;