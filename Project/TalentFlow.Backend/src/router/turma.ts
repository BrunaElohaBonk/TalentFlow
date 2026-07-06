import express from 'express'
const route = express.Router();

 route
    .post('/criarTurma')
    .get('/visualizarTurmas')
    .get('/buscarTurma/:id')
    .put('/atualizarTurma/:id')
    .delete('/deletarTurma/:id')

 
 export default route;