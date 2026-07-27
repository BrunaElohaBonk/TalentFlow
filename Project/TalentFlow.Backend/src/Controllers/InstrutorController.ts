import { Request, Response, NextFunction } from "express";
import { AuthRequest } from "../Middlewares/authMiddleware.ts";
import InstrutorService from "../Services/InstrutorService.ts";


export default class instrutorController {
    static async editarInstrutor(
        req: AuthRequest,
        res: Response,
        next: NextFunction
    ) {

        const { EDV } = req.params;


        const instrutor =
            await InstrutorService.editar(
                Number(EDV),
                req.body,
                req.user!.EDV
            );


        return res.status(200).send({

            response:
                "Sucesso ao editar Instrutor!",

            data: instrutor

        });

    }

}