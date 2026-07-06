import { response } from "express"

export default class AprendizController{
    static async create(req:Request, res:Response){
        const data = req.body
        try{
            return res.status(200).send({response:"Sucesso ao criar Aprediz"})
        }
        catch()        
    }
}