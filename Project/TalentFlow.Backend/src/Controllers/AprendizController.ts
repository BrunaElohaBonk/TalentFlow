import { Request, Response } from "express"

export default class aprendizController {
    static async create(req: Request, res: Response) {
        const data = req.body
        try {
            return res.status(200).send({ response: "Sucesso ao criar Aprendiz!" })
        }
        catch (error) {
            console.error(error)
            return res.status(200).send({
                messagem: error instanceof Error
                    ? error.message
                    : error
            })
        }
    }
    static async delete(req: Request, res: Response) {
        const { id } = req.params
        try {
            return res.status(200).send({response: "Aprendiz deletado com Sucesso!"})
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
    static async atualizarPerfil(req:Request, res: Response){
        const { idPerfil } = req.params
        const {EDV} = req.params
        const data = req.body

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
    static async atualizarFormacaoAcademica(req:Request, res: Response){
        const { idPerfil } = req.params
        const {EDV} = req.params
        const data = req.body
        
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
        const data = req.body
        
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
        const data = req.body
        
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
        const data = req.body
        
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
        const data = req.body
        
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
        const data = req.body
        
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
        const data = req.body

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
        const data = req.body
        
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
        const data = req.body
        
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
        const data = req.body
        
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
        const data = req.body
        
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
        const data = req.body
        
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
        const data = req.body
        
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
        const data = req.query.body 
        
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
        const data = req.query.params
        
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