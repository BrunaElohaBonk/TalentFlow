import { Request, Response } from "express";
import { HistoricoService } from "../Services/HistoricoService.ts";

export class HistoricoController {
    static async listar(req: Request, res: Response){
        try {
            const historico = await HistoricoService.listarHistorico();
            return res.json(historico);

        } catch(error){
            console.error(error);
            return res.status(500).json({
                message:"Erro ao buscar histórico"
            });
        }
    }
}