import { Request, Response } from "express"

export default class instrutorController{
    static async create(req: Request,res:Response){
        const data = req.body;
        try{
            return res.status(200).send({response: "Sucesso ao criar Instrutor!" })
    
        }
        catch (error){
            console.error(error)
            return res.status(200).send({
                messagem:error instanceof Error
                ? error.message
                : error
            })
        }

    }
    static async editar(req: Request,res:Response){
        const {EDV} = req.params;
        const data = req.body;
        try{
            return res.status(200).send({response: "Sucesso ao editar Instrutor!" })
    
        }
        catch (error){
            console.error(error)
            return res.status(200).send({
                messagem:error instanceof Error
                ? error.message
                : error
            })
        }

    }
    static async Deletar(req: Request,res:Response){
        const data = req.body;
        try{
            return res.status(200).send({response: "Sucesso ao Deletar Instrutor!" })
    
        }
        catch (error){
            console.error(error)
            return res.status(200).send({
                messagem:error instanceof Error
                ? error.message
                : error
            })
        }

    }
}