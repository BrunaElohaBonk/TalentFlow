import express from "express";
import aprendizController from "../Controllers/AprendizController.ts";
import { authMiddleware } from "../Middlewares/authMiddleware.ts";
import { roleMiddleware } from "../Middlewares/roleMiddleware.ts";
import { ownerMiddleware } from "../Middlewares/ownerMiddleware.ts";
import { validationMiddleware } from "../Middlewares/validationMiddleware.ts";
import { upload } from "../Middlewares/uploadMiddleware.ts";

import {
  criarAprendizSchema,
  atualizarPerfilSchema,
  atualizarSituacaoProfissionalSchema,
  atualizarFormacaoSchema,
  atualizarSoftSkillsSchema,
  atualizarCompetenciaSchema,
  atualizarIdiomaSchema,
  atualizarCursoSchema,
} from "../DTO/schemas/aprendizSchema.ts";

const route = express.Ro
//Rotas do Instrutor
route.post("/criar",authMiddleware,roleMiddleware("INSTRUTOR"),validationMiddleware(criarAprendizSchema),aprendizController.criar);
route.get("/aprendiz/:EDV",authMiddleware,roleMiddleware("INSTRUTOR"),aprendizController.verAprendiz); // EDV e ID_Turma
route.get("/perfil/:EDV",authMiddleware,roleMiddleware("INSTRUTOR"),aprendizController.verPerfil); // retorna objetos do perfil e id
route.get("/dashboard",authMiddleware,roleMiddleware("INSTRUTOR"),aprendizController.filtrarApredizDashboart);
route.get("/filtros",authMiddleware,roleMiddleware("INSTRUTOR"),aprendizController.filtrarTudoAprendiz);

//Rotas do aprendiz
route.get("/meuPerfil/:EDV",authMiddleware,roleMiddleware("APRENDIZ"),ownerMiddleware,aprendizController.verPerfil);

route.post("/adicionarIdioma/:EDV/:id",authMiddleware,roleMiddleware("APRENDIZ"),ownerMiddleware,aprendizController.adicionarIdioma);
route.post("/adicionarCursos/:EDV/:id",authMiddleware,roleMiddleware("APRENDIZ"),ownerMiddleware,aprendizController.adicionarCursos);
route.post("/adicionarCompetencia/:EDV/:id",authMiddleware,roleMiddleware("APRENDIZ"),ownerMiddleware,aprendizController.adicionarCompetencia);
route.post("/adicionarSoftskills/:EDV",authMiddleware,roleMiddleware("APRENDIZ"),ownerMiddleware,aprendizController.adicionarSoftskills,);
route.post("/adicionarFormacao/:EDV",authMiddleware,roleMiddleware("APRENDIZ"),ownerMiddleware,aprendizController.adicionarFormacaoAcademica);

route.put("/atualizarPerfil/:EDV/:idPerfil",authMiddleware,roleMiddleware("APRENDIZ"),ownerMiddleware,validationMiddleware(atualizarPerfilSchema),aprendizController.atualizarPerfil);
route.put("/atualizarFormacaoAcademica/:EDV/:id",authMiddleware,roleMiddleware("APRENDIZ"),ownerMiddleware,validationMiddleware(atualizarFormacaoSchema),aprendizController.atualizarFormacaoAcademica);
route.put("/atualizarSituacaoProfissional/:EDV/:id",authMiddleware,roleMiddleware("APRENDIZ"),ownerMiddleware,validationMiddleware(atualizarSituacaoProfissionalSchema),aprendizController.atualizarSituacaoProfissional);
route.put("/atualizarSoftskills/:EDV/:id",authMiddleware,roleMiddleware("APRENDIZ"),ownerMiddleware,validationMiddleware(atualizarSoftSkillsSchema),aprendizController.atualizarSoftskills,);
route.put("/atualizarCompetencias/:EDV/:id",authMiddleware,roleMiddleware("APRENDIZ"),ownerMiddleware,validationMiddleware(atualizarCompetenciaSchema),aprendizController.atualizarCompetencias);

route.put("/atualizarIdiomas/:EDV/:id",authMiddleware,roleMiddleware("APRENDIZ"),ownerMiddleware,validationMiddleware(atualizarIdiomaSchema),aprendizController.atualizarIdiomas);
route.put("/atualizarCursos/:EDV/:id",authMiddleware,roleMiddleware("APRENDIZ"),ownerMiddleware,validationMiddleware(atualizarCursoSchema),aprendizController.atualizarCursos);
route.put("/atualizarIdiomas/:EDV/:id",authMiddleware,roleMiddleware("APRENDIZ"),aprendizController.atualizarIdiomas,);

route.put("/foto/:EDV",authMiddleware,roleMiddleware("APRENDIZ"),upload.single("foto"),aprendizController.atualizarFoto,);
route.put("/idioma/certificado/:id",authMiddleware,roleMiddleware("APRENDIZ"),upload.single("certificado"),aprendizController.adicionarCertificadoIdioma);
route.put("/formacao/certificado/:id",authMiddleware,roleMiddleware("APRENDIZ"), upload.single("certificado"),aprendizController.adicionarCertificadoFormacao);
route.put("/curso/certificado/:id",authMiddleware,roleMiddleware("APRENDIZ"),upload.single("certificado"),aprendizController.adicionarCertificadoCurso);

route.get("/minhaFormacao/:EDV/:id",authMiddleware,roleMiddleware("APRENDIZ"),ownerMiddleware,aprendizController.verFormacaoAcademica);
route.get("/minhaSituacao/:EDV/:id",authMiddleware,roleMiddleware("APRENDIZ"),ownerMiddleware,aprendizController.verSituacaoProfissional);
route.get("/minhasSoftskills/:EDV/:id",authMiddleware,roleMiddleware("APRENDIZ"),ownerMiddleware,aprendizController.verSoftskills);
route.get("/minhasCompetencias/:EDV/:id",authMiddleware,roleMiddleware("APRENDIZ"),ownerMiddleware,aprendizController.verCompetencias);
route.get("/meusIdiomas/:EDV/:id",authMiddleware,roleMiddleware("APRENDIZ"),ownerMiddleware,aprendizController.verIdiomas);
route.get("/meusCursos/:EDV/:id",authMiddleware,roleMiddleware("APRENDIZ"),ownerMiddleware,aprendizController.verCursos);

route.delete("/deletarSoftskills/:EDV/:id",authMiddleware,roleMiddleware("APRENDIZ"),ownerMiddleware,aprendizController.deletarSoftskill,);
route.delete("/deletarIdioma/:EDV/:id",authMiddleware,roleMiddleware("APRENDIZ"),ownerMiddleware, aprendizController.deletarIdioma);
route.delete("/deletarCompetencia/:EDV/:id",authMiddleware,roleMiddleware("APRENDIZ"), ownerMiddleware, aprendizController.deletarCompetencia);
route.delete("/deletarCursos/:EDV/:id",authMiddleware,roleMiddleware("APRENDIZ"),ownerMiddleware,aprendizController.deletarCursos);
route.delete("/deletarformacao/:EDV/:id",authMiddleware,roleMiddleware("APRENDIZ"),ownerMiddleware,aprendizController.deletarFormacao);

export default route;
