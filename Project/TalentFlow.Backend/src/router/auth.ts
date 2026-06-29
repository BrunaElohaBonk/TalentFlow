import express from 'express';


const route = express.Router();

route.post('/login');
route.post('/logout');
route.put('/redefinirSenha');


export default route;