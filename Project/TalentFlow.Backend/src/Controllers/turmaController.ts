import { Request, Response } from "express";
import { TurmaNotFoundError, TurmaService } from "../Services/TurmaService.ts";

function handleTurmaError(error: unknown, res: Response) {
    if (error instanceof TurmaNotFoundError) {
      res.status(404).json({ message: error.message });
      return;
    }
  
    console.error(error);
    res.status(500).json({
      message: error instanceof Error ? error.message : "Erro interno",
    });
  }
export default class turmaController {

    static async criarTurma(req: Request, res: Response): Promise<void> {
        const { EDV_Instrutor, name_Curso } = req.body;
    
        try {
          const turma = await TurmaService.criar({ EDV_Instrutor, name_Curso });
          res.status(201).json({ message: "Turma criada com sucesso!", turma });
        } catch (error) {
          handleTurmaError(error, res);
        }
      }
    
      static async verTurmas(req: Request, res: Response): Promise<void> {
        try {
          const turmas = await TurmaService.listarTodas();
          res.status(200).json(turmas);
        } catch (error) {
          handleTurmaError(error, res);
        }
      }
    
      static async buscarTurma(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
    
        try {
          const turma = await TurmaService.buscarPorId(Number(id));
          res.status(200).json(turma);
        } catch (error) {
          handleTurmaError(error, res);
        }
      }
    
      static async atualizarTurma(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const data = req.body;
    
        try {
          const turma = await TurmaService.atualizar(Number(id), data);
          res.status(200).json({ message: "Turma atualizada com sucesso!", turma });
        } catch (error) {
          handleTurmaError(error, res);
        }
      }
    
      static async deletarTurma(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
    
        try {
          await TurmaService.deletar(Number(id));
          res.status(200).json({ message: "Turma deletada com sucesso!" });
        } catch (error) {
          handleTurmaError(error, res);
        }
      }

}