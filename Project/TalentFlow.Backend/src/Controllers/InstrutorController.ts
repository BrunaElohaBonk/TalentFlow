import { Request, Response, NextFunction } from "express";
import InstrutorService from "../Services/InstrutorService.ts";


export default class instrutorController {
    static async editarInstrutor(
        req: Request,
        res: Response,
        next: NextFunction
    ) {


        try {

            const { EDV } = req.params;


            const instrutor =
                await InstrutorService.editar(
                    Number(EDV),
                    req.body
                );


            return res.status(200).send({

                response:
                    "Sucesso ao editar Instrutor!",

                data: instrutor

            });


        } catch(error) {

            next(error);

        }

    }

}