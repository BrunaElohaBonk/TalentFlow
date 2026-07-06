import express from 'express';


const route = express.Router();

route
    .post('/criarInstrutor')
    .put('/editarInstrutor/:EDV/:id')
    .delete('/excluirInstrutor/:EDV/:id')


export default route;