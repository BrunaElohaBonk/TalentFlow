import { Request, Response } from "express"
export default class turmaController{
    static async create(req:Request, res:Response){
        const data = req.body
        try{
            return res.status(200).send({response:"Sucesso ao criar a turma"})
        }
        catch(error){
            console.error(error)
            return res.status(500).send({
                menssagem: error instanceof Error
                ?error.message
                :error
            })
        }
    }
    static async verTurmas(req:Request, res:Response){
        try{
            return res.status(200).send({response:"Sucesso ao visualizar Turmas"})
        }
        catch(error){
            console.error(error)
            return res.status(500).send({
                menssagem: error instanceof Error
                ?error.message
                :error
            })
        }
    }
    static async buscarTurma(req:Request, res:Response){
        const {id} = req.params
        try{
            return res.status(200).send({response:"Sucesso ao visualizar Turmas"})
        }
        catch(error){
            console.error(error)
            return res.status(500).send({
                menssagem: error instanceof Error
                ?error.message
                :error
            })
        }
    }
    static async atualizar(req:Request, res:Response){
        const data = req.body
        const {id} = req.params
        try{
            return res.status(200).send({response:"Sucesso ao criar a turma"})
        }
        catch(error){
            console.error(error)
            return res.status(500).send({
                menssagem: error instanceof Error
                ?error.message
                :error
            })
        }
    }
     static async deletar(req:Request, res:Response){
        const {id} = req.params
        try{
            return res.status(200).send({response:"Sucesso ao deletar Turmas"})
        }
        catch(error){
            console.error(error)
            return res.status(500).send({
                menssagem: error instanceof Error
                ?error.message
                :error
            })
        }
    }
}