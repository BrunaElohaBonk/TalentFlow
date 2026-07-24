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

const route = express.Router();
route.post(
  "/criar",
  (req, res, next) => {
    console.log("ENTROU NA ROTA CRIAR APRENDIZ");
    next();
  },
  authMiddleware,
  roleMiddleware("INSTRUTOR"),
  validationMiddleware(criarAprendizSchema),
  aprendizController.criar,
);

route.get(
  "/perfil/:EDV",
  authMiddleware,
  roleMiddleware("INSTRUTOR"),
  aprendizController.verPerfil,
);

route.put(
  "/atualizarPerfil/:EDV/:idPerfil",
  authMiddleware,
  roleMiddleware("APRENDIZ"),
  ownerMiddleware,
  validationMiddleware(atualizarPerfilSchema),
  aprendizController.atualizarPerfil,
);

route.put(
  "/atualizarFormacaoAcademica/:EDV/:id",
  authMiddleware,
  roleMiddleware("APRENDIZ"),
  ownerMiddleware,
  validationMiddleware(atualizarFormacaoSchema),
  aprendizController.atualizarFormacaoAcademica,
);

route.put(
  "/atualizarSituacaoProfissional/:EDV/:id",
  authMiddleware,
  roleMiddleware("APRENDIZ"),
  ownerMiddleware,
  validationMiddleware(atualizarSituacaoProfissionalSchema),
  aprendizController.atualizarSituacaoProfissional,
);

route.put(
  "/atualizarSoftskills/:EDV/:id",
  authMiddleware,
  roleMiddleware("APRENDIZ"),
  ownerMiddleware,
  validationMiddleware(atualizarSoftSkillsSchema),
  aprendizController.atualizarSoftskills,
);

route.put(
  "/atualizarCompetencias/:EDV/:id",
  authMiddleware,
  roleMiddleware("APRENDIZ"),
  ownerMiddleware,
  validationMiddleware(atualizarCompetenciaSchema),
  aprendizController.atualizarCompetencias,
);

route.put(
  "/foto/:EDV",
  authMiddleware,
  roleMiddleware("APRENDIZ"),
  upload.single("foto"),
  aprendizController.atualizarFoto,
);
route.put(
    "/idioma/certificado/:id",
    authMiddleware,
    roleMiddleware("APRENDIZ"),
    upload.single("certificado"),
    aprendizController.adicionarCertificadoIdioma
);

route.put(
    "/formacao/certificado/:id",
    authMiddleware,
    roleMiddleware("APRENDIZ"),
    upload.single("certificado"),
    aprendizController.adicionarCertificadoFormacao
);

route.put(
    "/curso/certificado/:id",
    authMiddleware,
    roleMiddleware("APRENDIZ"),
    upload.single("certificado"),
    aprendizController.adicionarCertificadoCurso
);

route.put(
  "/atualizarIdiomas/:EDV/:id",
  authMiddleware,
  roleMiddleware("APRENDIZ"),
  ownerMiddleware,
  validationMiddleware(atualizarIdiomaSchema),
  aprendizController.atualizarIdiomas,
);

route.put(
  "/atualizarCursos/:EDV/:id",
  authMiddleware,
  roleMiddleware("APRENDIZ"),
  ownerMiddleware,
  validationMiddleware(atualizarCursoSchema),
  aprendizController.atualizarCursos,
);

route.get(
  "/meuPerfil/:EDV/:id",
  authMiddleware,
  roleMiddleware("APRENDIZ"),
  ownerMiddleware,
  aprendizController.verPerfil,
);

route.get(
  "/minhaFormacao/:EDV/:id",
  authMiddleware,
  roleMiddleware("APRENDIZ"),
  ownerMiddleware,
  aprendizController.verFormacaoAcademica,
);

route.get(
  "/minhaSituacao/:EDV/:id",
  authMiddleware,
  roleMiddleware("APRENDIZ"),
  ownerMiddleware,
  aprendizController.verSituacaoProfissional,
);

route.get(
  "/minhasSoftskills/:EDV/:id",
  authMiddleware,
  roleMiddleware("APRENDIZ"),
  ownerMiddleware,
  aprendizController.verSoftskills,
);

route.get(
  "/minhasCompetencias/:EDV/:id",
  authMiddleware,
  roleMiddleware("APRENDIZ"),
  ownerMiddleware,
  aprendizController.verCompetencias,
);

route.get(
  "/meusIdiomas/:EDV/:id",
  authMiddleware,
  roleMiddleware("APRENDIZ"),
  ownerMiddleware,
  aprendizController.verIdiomas,
);

route.get(
  "/meusCursos/:EDV/:id",
  authMiddleware,
  roleMiddleware("APRENDIZ"),
  ownerMiddleware,
  aprendizController.verCursos,
);

route.get(
  "/dashboard",
  authMiddleware,
  roleMiddleware("INSTRUTOR"),
  aprendizController.filtrarApredizDashboart,
);

route.get(
  "/filtros",
  authMiddleware,
  roleMiddleware("INSTRUTOR"),
  aprendizController.filtrarTudoAprendiz,
);

export default route;
