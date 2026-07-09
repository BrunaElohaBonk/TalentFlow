import { Request, Response } from "express";
import { prisma } from "../lib/prisma.js";

export default class aprendizController {
    static async delete(req: Request, res: Response) {
        const {EDV} = req.params

    try {
        await prisma.aprendiz.delete({
            where: {
                EDV: Number(EDV),
            },
        });
        return res.status(200).json({
            message: "Aprendiz deletado com sucesso!",
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: error instanceof Error
                ? error.message
                : "Erro interno do servidor",
        });
    }
}

    static async atualizarPerfil(req:Request, res: Response){
        const { idPerfil } = req.params
        const data = req.params;

        try {
            const perfilAtualizado = await prisma.profile.update({
                where : {
                    id:Number(idPerfil),
                },
                data,
            });
        return res.status(200).json({
            response: "Perfil atualizado com sucesso!",
            perfil: perfilAtualizado,
        });

    } catch(error) {
        console.error(error);

        return res.status(500).json({
            message: error instanceof Error
                ? error.message
                : error
        });
    }
}
    static async atualizarFormacaoAcademica(req:Request, res: Response){
        const { idPerfil } = req.params
        const {EDV} = req.params
        
        try {
            return res.status(200).send({response: "Atualizado Sucesso!"})
        }
        catch(error){
            console.error(error)
            return res.status(200).send({
                messagem: error instanceof Error
                ? error.message
                :error
            })
        }
    }
    static async atualizarSituacaoProfissional(req:Request, res: Response){
        const { idPerfil } = req.params
        const {EDV} = req.params
        
        try {
            return res.status(200).send({response: "Atualizado Sucesso!"})
        }
        catch(error){
            console.error(error)
            return res.status(200).send({
                messagem: error instanceof Error
                ? error.message
                :error
            })
        }
    }
    static async atualizarSoftskills(req:Request, res: Response){
        const { idPerfil } = req.params
        const {EDV} = req.params
        
        try {
            return res.status(200).send({response: "Atualizado Sucesso!"})
        }
        catch(error){
            console.error(error)
            return res.status(200).send({
                messagem: error instanceof Error
                ? error.message
                :error
            })
        }
    }
    static async atualizarCompetencias(req:Request, res: Response){
        const { idPerfil } = req.params
        const {EDV} = req.params
        
        try {
            return res.status(200).send({response: "Atualizado Sucesso!"})
        }
        catch(error){
            console.error(error)
            return res.status(200).send({
                messagem: error instanceof Error
                ? error.message
                :error
            })
        }
    }
    static async atualizarIidiomas(req:Request, res: Response){
        const { idPerfil } = req.params
        const {EDV} = req.params
        
        try {
            return res.status(200).send({response: "Atualizado Sucesso!"})
        }
        catch(error){
            console.error(error)
            return res.status(200).send({
                messagem: error instanceof Error
                ? error.message
                :error
            })
        }
    }
    static async atualizarCursos(req:Request, res: Response){
        const { idPerfil } = req.params
        const {EDV} = req.params
        
        try {
            return res.status(200).send({response: "Atualizado Sucesso!"})
        }
        catch(error){
            console.error(error)
            return res.status(200).send({
                messagem: error instanceof Error
                ? error.message
                :error
            })
        }
    }
    static async verPerfil(req:Request, res: Response){
        const { idPerfil } = req.params
        const {EDV} = req.params

        try {
            return res.status(200).send({response: "Atualizado Sucesso!"})
        }
        catch(error){
            console.error(error)
            return res.status(200).send({
                messagem: error instanceof Error
                ? error.message
                :error
            })
        }
    }
    static async verFormacaoAcademica(req:Request, res: Response){
        const { idPerfil } = req.params
        const {EDV} = req.params
        
        try {
            return res.status(200).send({response: "Atualizado Sucesso!"})
        }
        catch(error){
            console.error(error)
            return res.status(200).send({
                messagem: error instanceof Error
                ? error.message
                :error
            })
        }
    }
    static async verSituacaoProfissional(req:Request, res: Response){
        const { idPerfil } = req.params
        const {EDV} = req.params
        
        try {
            return res.status(200).send({response: "Atualizado Sucesso!"})
        }
        catch(error){
            console.error(error)
            return res.status(200).send({
                messagem: error instanceof Error
                ? error.message
                :error
            })
        }
    }
    static async verSoftskills(req:Request, res: Response){
        const { idPerfil } = req.params
        const {EDV} = req.params
        
        try {
            return res.status(200).send({response: "Atualizado Sucesso!"})
        }
        catch(error){
            console.error(error)
            return res.status(200).send({
                messagem: error instanceof Error
                ? error.message
                :error
            })
        }
    }
    static async verCompetencias(req:Request, res: Response){
        const { idPerfil } = req.params
        const {EDV} = req.params
        
        try {
            return res.status(200).send({response: "Atualizado Sucesso!"})
        }
        catch(error){
            console.error(error)
            return res.status(200).send({
                messagem: error instanceof Error
                ? error.message
                :error
            })
        }
    }
    static async verIidiomas(req:Request, res: Response){
        const { idPerfil } = req.params
        const {EDV} = req.params
        
        try {
            return res.status(200).send({response: "Atualizado Sucesso!"})
        }
        catch(error){
            console.error(error)
            return res.status(200).send({
                messagem: error instanceof Error
                ? error.message
                :error
            })
        }
    }
    static async verCursos(req:Request, res: Response){
        const { idPerfil } = req.params
        const {EDV} = req.params
        
        try {
            return res.status(200).send({response: "Atualizado Sucesso!"})
        }
        catch(error){
            console.error(error)
            return res.status(200).send({
                messagem: error instanceof Error
                ? error.message
                :error
            })
        }
    }
    static async filtrarApredizDashboart(req:Request, res: Response){
        
        try {
            return res.status(200).send({response: "Atualizado Sucesso!"})
        }
        catch(error){
            console.error(error)
            return res.status(200).send({
                messagem: error instanceof Error
                ? error.message
                :error
            })
        }
    }
    static async filtrarTudoAprediz(req:Request, res: Response){
        
        try {
            return res.status(200).send({response: "Atualizado Sucesso!"})
        }
        catch(error){
            console.error(error)
            return res.status(200).send({
                messagem: error instanceof Error
                ? error.message
                :error
            })
        }
    }

    
}