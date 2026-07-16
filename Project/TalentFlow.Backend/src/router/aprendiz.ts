import express from "express";

import AprendizController from "../Controllers/AprendizController.js";


import { authMiddleware } from "../Middlewares/authMiddleware.ts";
import { roleMiddleware } from "../Middlewares/roleMiddleware.ts";
import { ownerMiddleware } from "../Middlewares/ownerMiddleware.ts";
import { notFoundMiddleware } from "../Middlewares/notFoundMiddleware.ts";



const route = express.Router();



route.post(
    "/associarAprendiz",
    authMiddleware,
    roleMiddleware("INSTRUTOR"),
    AprendizController.criar
    
);



route.delete(
    "/deletarAprendiz/:EDV",
    authMiddleware,
    roleMiddleware("INSTRUTOR"),
    AprendizController.delete
);


route.put(
    "/atualizarPerfil/:EDV/:id",
    authMiddleware,
    roleMiddleware("APRENDIZ"),
    ownerMiddleware,
    AprendizController.atualizarPerfil
);


route.put(
    "/atualizarPerfil/formacaoAcademica/:EDV/:id",
    authMiddleware,
    roleMiddleware("APRENDIZ"),
    ownerMiddleware,
    AprendizController.atualizarFormacaoAcademica
);


route.put(
    "/atualizarPerfil/situacaoProfissional/:EDV/:id",
    authMiddleware,
    roleMiddleware("APRENDIZ"),
    ownerMiddleware,
    AprendizController.atualizarSituacaoProfissional
);


route.put(
    "/atualizarPerfil/softskills/:EDV/:id",
    authMiddleware,
    roleMiddleware("APRENDIZ"),
    ownerMiddleware,
    AprendizController.atualizarSoftskills
);


route.put(
    "/atualizarPerfil/competencias/:EDV/:id",
    authMiddleware,
    roleMiddleware("APRENDIZ"),
    ownerMiddleware,
    AprendizController.atualizarCompetencias
);


route.put(
    "/atualizarPerfil/idiomas/:EDV/:id",
    authMiddleware,
    roleMiddleware("APRENDIZ"),
    ownerMiddleware,
    AprendizController.atualizarIdiomas
);


route.put(
    "/atualizarPerfil/cursos/:EDV/:id",
    authMiddleware,
    roleMiddleware("APRENDIZ"),
    ownerMiddleware,
    AprendizController.atualizarCursos
);





route.get(
    "/verPerfil/:EDV/:id",
    authMiddleware,
    roleMiddleware("APRENDIZ", "INSTRUTOR"),
    AprendizController.verPerfil
);


route.get(
    "/verPerfil/formacaoAcademica/:EDV/:id",
    authMiddleware,
    roleMiddleware("APRENDIZ", "INSTRUTOR"),
    AprendizController.verFormacaoAcademica
);


route.get(
    "/verPerfil/situacaoProfissional/:EDV/:id",
    authMiddleware,
    roleMiddleware("APRENDIZ", "INSTRUTOR"),
    AprendizController.verSituacaoProfissional
);


route.get(
    "/verPerfil/softskills/:EDV/:id",
    authMiddleware,
    roleMiddleware("APRENDIZ", "INSTRUTOR"),
    AprendizController.verSoftskills
);


route.get(
    "/verPerfil/competencias/:EDV/:id",
    authMiddleware,
    roleMiddleware("APRENDIZ", "INSTRUTOR"),
    AprendizController.verCompetencias
);


route.get(
    "/verPerfil/idiomas/:EDV/:id",
    authMiddleware,
    roleMiddleware("APRENDIZ", "INSTRUTOR"),
    AprendizController.verIdiomas
);


route.get(
    "/verPerfil/cursos/:EDV/:id",
    authMiddleware,
    roleMiddleware("APRENDIZ", "INSTRUTOR"),
    AprendizController.verCursos
);


route.get(
    "/filtrarAprendizes/todos",
    authMiddleware,
    roleMiddleware("INSTRUTOR"),
    AprendizController.filtrarApredizDashboart
);


route.get(
    "/filtrarAprendizes/turma",
    authMiddleware,
    roleMiddleware("INSTRUTOR"),
    AprendizController.filtrarTudoAprendiz
);


export default route;

