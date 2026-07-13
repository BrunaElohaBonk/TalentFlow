import express from 'express';
import instrutorController from '../Controllers/InstrutorController.ts';


const route = express.Router();

route
    .post('/criarInstrutor',instrutorController.criarInstrutor)
    .put('/editarInstrutor/:EDV/:id',instrutorController.editarInstrutor)
    .delete('/excluirInstrutor/:EDV/:id',instrutorController.DeletarInstrutor)


export default route;