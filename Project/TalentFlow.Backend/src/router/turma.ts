import express from 'express'
const route = express.Router();

 route
    .get('/visualizarTurmas')
    .get('/verTurma/:id')
    .put('/updateTurma/:id')
    .delete('/deletarTurma/:id')

 
 export default route;