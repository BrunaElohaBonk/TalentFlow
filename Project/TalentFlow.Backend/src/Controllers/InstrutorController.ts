import { Request, Response, NextFunction } from "express";
import { AdicionarUserDto } from "../DTO/authDTO.ts";
import InstrutorService from "../Services/InstrutorService.ts";


export default class instrutorController {


    static async criarInstrutor(
        req: Request,
        res: Response,
        next: NextFunction
    ) {

        try {

            const data: AdicionarUserDto = req.body;


            const instrutor =
                await InstrutorService.create(data);


            return res.status(200).send({

                response:
                    "Sucesso ao criar Instrutor!",

                data: instrutor

            });


        } catch(error) {

            next(error);

        }

    }





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







    static async DeletarInstrutor(
        req: Request,
        res: Response,
        next: NextFunction
    ) {


        try {

            const { EDV } = req.params;


            await InstrutorService.deletar(
                Number(EDV)
            );


            return res.status(200).send({

                response:
                    "Sucesso ao Deletar Instrutor!"

            });


        } catch(error) {

            next(error);

        }

    }


}