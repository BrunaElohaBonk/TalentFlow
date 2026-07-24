import { Request, Response, NextFunction } from "express";
import AprendizService, {
  DashboardService,
} from "../Services/AprendizService.ts";
import { AuthRequest } from "../Middlewares/authMiddleware.ts";

export default class aprendizController {
  static async criar(req: AuthRequest, res: Response) {
    const aprendiz = await AprendizService.criar(req.body, req.user!.EDV);

    return res.status(201).json({
      message: "Aprendiz vinculado à turma com sucesso!",

      data: aprendiz,
    });
  }
  static async atualizarFoto(req: Request, res: Response) {
    const { EDV } = req.params;

    const foto = req.file?.path;

    const resultado = await AprendizService.atualizarFoto(Number(EDV), foto);

    return res.status(200).json({
      message: "Foto atualizada com sucesso!",
      data: resultado,
    });
  }
  static async adicionarCertificadoCurso(req: Request, res: Response) {
    const { id } = req.params;

    const certificado = req.file?.path;

    const curso = await AprendizService.adicionarCertificadoCurso(
      Number(id),
      certificado,
    );

    return res.status(200).json({
      message: "Certificado adicionado!",
      data: curso,
    });
  }
  static async adicionarCertificadoFormacao(req: Request, res: Response) {
    const { id } = req.params;

    const certificado = req.file?.path;

    const formacao = await AprendizService.adicionarCertificadoFormacao(
      Number(id),
      certificado,
    );

    return res.status(200).json({
      message: "Certificado da formação adicionado!",
      data: formacao,
    });
  }
  static async adicionarCertificadoIdioma(req: Request, res: Response) {
    const { id } = req.params;

    const certificado = req.file?.path;

    const idioma = await AprendizService.adicionarCertificadoIdioma(
      Number(id),
      certificado,
    );

    return res.status(200).json({
      message: "Certificado de idioma adicionado!",
      data: idioma,
    });
  }
  static async atualizarPerfil(
    req: AuthRequest, // mudar todos para AuthRequest
    res: Response,
    next: NextFunction,
  ) {
    const { idPerfil } = req.params;

    const perfilAtualizado = await AprendizService.atualizarPerfil(
      Number(idPerfil),
      req.body,
      req.user!.EDV, // mudar todos para  req.user!.EDV
    );

    return res.status(200).json({
      response: "Perfil atualizado com sucesso!",

      perfil: perfilAtualizado,
    });
  }

  static async atualizarFormacaoAcademica(
    req: AuthRequest,
    res: Response,
    next: NextFunction,
  ) {
    const { EDV, id } = req.params;

    const formacaoAtualizada = await AprendizService.atualizarFormacaoAcademica(
      Number(EDV),
      Number(id),
      req.body,
      req.user!.EDV,
    );

    return res.status(200).json({
      response: "Formação acadêmica atualizada com sucesso!",

      data: formacaoAtualizada,
    });
  }

  static async atualizarSituacaoProfissional(
    req: AuthRequest,
    res: Response,
    next: NextFunction,
  ) {
    const { EDV, id } = req.params;

    const situacaoAtualizada =
      await AprendizService.atualizarSituacaoProfissional(
        Number(EDV),
        Number(id),
        req.body,
        req.user!.EDV,
      );

    return res.status(200).json({
      response: "Situação profissional atualizada com sucesso!",

      data: situacaoAtualizada,
    });
  }
  static async atualizarSoftskills(
    req: AuthRequest,
    res: Response,
    next: NextFunction,
  ) {
    const { id, EDV } = req.params;

    const softskill = await AprendizService.atualizarSoftskills(
      Number(EDV),
      Number(id),
      req.body,
      req.user!.EDV,
    );

    return res.status(200).json({
      response: "Soft Skill atualizada com sucesso!",

      data: softskill,
    });
  }
  static async atualizarCompetencias(
    req: AuthRequest,
    res: Response,
    next: NextFunction,
  ) {
    const { id, EDV } = req.params;

    const competencia = await AprendizService.atualizarCompetencias(
      Number(EDV),
      Number(id),
      req.body,
      req.user!.EDV,
    );

    return res.status(200).json({
      response: "Competência atualizada com sucesso!",

      data: competencia,
    });
  }

  static async atualizarIdiomas(
    req: AuthRequest,
    res: Response,
    next: NextFunction,
  ) {
    const { id, EDV } = req.params;

    const idioma = await AprendizService.atualizarIdiomas(
      Number(EDV),
      Number(id),
      req.body,
      req.user!.EDV,
    );

    return res.status(200).json({
      response: "Idioma atualizado com sucesso!",
      data: idioma,
    });
  }
  static async atualizarCursos(
    req: AuthRequest,
    res: Response,
    next: NextFunction,
  ) {
    const { id, EDV } = req.params;

    const curso = await AprendizService.atualizarCursos(
      Number(EDV),
      Number(id),
      req.body,
      req.user!.EDV,
    );

    return res.status(200).json({
      response: "Curso atualizado com sucesso!",

      data: curso,
    });
  }
  static async verPerfil(req: Request, res: Response, next: NextFunction) {
    const { EDV } = req.params;

    const perfil = await AprendizService.verPerfil(Number(EDV));

    if (!perfil) {
      throw new Error("Perfil não encontrado");
    }

    return res.status(200).json({
      data: perfil,
    });
  }
  static async verFormacaoAcademica(
    req: AuthRequest,
    res: Response,
    next: NextFunction,
  ) {
    const { EDV, id } = req.params;

    const formacao = await AprendizService.verFormacaoAcademica(
      Number(EDV),
      Number(id),
    );

    return res.status(200).json({
      data: formacao,
    });
  }
  static async verSituacaoProfissional(
    req: AuthRequest,
    res: Response,
    next: NextFunction,
  ) {
    const { EDV, id } = req.params;

    const situacao = await AprendizService.verSituacaoProfissional(
      Number(EDV),
      Number(id),
    );

    return res.status(200).json({
      data: situacao,
    });
  }

  static async verSoftskills(req: Request, res: Response, next: NextFunction) {
    const { EDV, id } = req.params;

    const softskills = await AprendizService.verSoftskills(
      Number(EDV),
      Number(id),
    );

    return res.status(200).json({
      data: softskills,
    });
  }
  static async verCompetencias(
    req: AuthRequest,
    res: Response,
    next: NextFunction,
  ) {
    const { EDV, id } = req.params;

    const competencias = await AprendizService.verCompetencias(
      Number(EDV),
      Number(id),
    );

    return res.status(200).json({
      data: competencias,
    });
  }
  static async verIdiomas(req: Request, res: Response, next: NextFunction) {
    const { EDV, id } = req.params;

    const idiomas = await AprendizService.verIdiomas(Number(EDV), Number(id));

    return res.status(200).json({
      data: idiomas,
    });
  }
  static async verCursos(req: Request, res: Response, next: NextFunction) {
    const { EDV, id } = req.params;

    const cursos = await AprendizService.verCursos(Number(EDV), Number(id));

    return res.status(200).json({
      data: cursos,
    });
  }
  static async filtrarApredizDashboart(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    const dashboard = await DashboardService.dashboardAprendiz();

    return res.status(200).json(dashboard);
  }
  static async filtrarTudoAprendiz(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    const aprendizes = await DashboardService.filtrarTudo(req.query);

    return res.status(200).json(aprendizes);
  }
}
