import express from 'express'

const route = express.Router();

route
    // .post('/adicionarAprendiz/:EDV')
    .delete('/deletarAprendiz/:EDV')

    
    .put('/atualizarPerfil/:EDV/:id')
    .put('atualizarPerfil/formacaoAcademica/:EDV/:id') //
    .put('atualizarPerfil/situacaoProfissional/:EDV/:id')//
    .put('atualizarPerfil/softskills/:EDV/:id')//
    .put('atualizarPerfil/competencias/:EDV/:id')//
    .put('atualizarPerfil/idiomas/:EDV/:id')//
    .put('atualizarPerfil/cursos/:EDV/:id')//

    .get('/verPerfil/:EDV/:id')
    .get('verPerfil/formacaoAcademica/:EDV/:id')
    .get('verPerfil/situacaoProfissional/:EDV/:id')
    .get('verPerfil/softskills/:EDV/:id')
    .get('verPerfil/competencias/:EDV/:id')
    .get('verPerfil/idiomas/:EDV/:id')
    .get('verPerfil/cursos/:EDV/:id')

    .get('filtrarAprendizes/todos') //dashboard
    .get('filtrarAprendizes/turma') //


export default route;

// localhost:8080/aprendiz/verPerfil/92906822/3
// 47 aprendiz
// 59 instrutor