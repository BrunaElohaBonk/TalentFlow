import express from 'express';
import AprendizController from '../Controllers/AprendizController.js';

const route = express.Router();

route
    .delete('/deletarAprendiz/:EDV', AprendizController.delete)

    .put('/atualizarPerfil/:EDV/:id', AprendizController.atualizarPerfil)
    .put('/atualizarPerfil/formacaoAcademica/:EDV/:id',AprendizController.atualizarFormacaoAcademica)
    .put('/atualizarPerfil/situacaoProfissional/:EDV/:id',AprendizController.atualizarSituacaoProfissional)
    .put('/atualizarPerfil/softskills/:EDV/:id',AprendizController.atualizarSoftskills)
    .put('/atualizarPerfil/competencias/:EDV/:id',AprendizController.atualizarCompetencias)
    .put('/atualizarPerfil/idiomas/:EDV/:id',AprendizController.atualizarIdiomas)
    .put('/atualizarPerfil/cursos/:EDV/:id',AprendizController.atualizarCursos)

    .get('/verPerfil/:EDV/:id',AprendizController.verPerfil)
    .get('/verPerfil/formacaoAcademica/:EDV/:id',AprendizController.verFormacaoAcademica)
    .get('/verPerfil/situacaoProfissional/:EDV/:id',AprendizController.verSituacaoProfissional)
    .get('/verPerfil/softskills/:EDV/:id',AprendizController.verSoftskills)
    .get('/verPerfil/competencias/:EDV/:id',AprendizController.verCompetencias)
    .get('/verPerfil/idiomas/:EDV/:id',AprendizController.atualizarIdiomas)
    .get('/verPerfil/cursos/:EDV/:id',AprendizController.verCursos)

    .get('/filtrarAprendizes/todos',AprendizController.filtrarApredizDashboart)
    .get('/filtrarAprendizes/turma');

export default route;

// localhost:8080/aprendiz/verPerfil/92906822/3
// 47 aprendiz
// 59 instrutor