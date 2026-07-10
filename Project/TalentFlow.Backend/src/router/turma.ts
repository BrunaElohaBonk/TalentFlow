import express from 'express'
import turmaController from '../Controllers/turmaController.ts';
const route = express.Router();

 route
    .post('/criarTurma',turmaController.criarTurma)
    .get('/visualizarTurmas',turmaController.verTurmas)
    .get('/buscarTurma/:id',turmaController.buscarTurma)
    .put('/atualizarTurma/:id',turmaController.atualizarTurma)
    .delete('/deletarTurma/:id',turmaController.atualizarTurma)

 
 export default route;