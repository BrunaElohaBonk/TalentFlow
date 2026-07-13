import { Request, Response } from "express";
import { AdicionarUserDto } from "../DTO/userDTO.ts";
import InstrutorService from "../Services/InstrutorService.ts";


export default class instrutorController {


    static async criarInstrutor(req: Request, res: Response) {

        try {

            const data: AdicionarUserDto = req.body;


            const instrutor =
                await InstrutorService.create(data);


            return res.status(200).send({
                response: "Sucesso ao criar Instrutor!",
                data: instrutor
            });


        } catch (error) {

            console.error(error);

            return res.status(500).send({
                mensagem: error instanceof Error
                    ? error.message
                    : error
            });

        }

    }




    static async editarInstrutor(req: Request, res: Response) {

        try {

            const { EDV } = req.params;

            const data = req.body;


            const instrutor =
                await InstrutorService.editar(
                    Number(EDV),
                    data
                );


            return res.status(200).send({
                response: "Sucesso ao editar Instrutor!",
                data: instrutor
            });


        } catch (error) {

            console.error(error);

            return res.status(500).send({
                mensagem: error instanceof Error
                    ? error.message
                    : error
            });

        }

    }





    static async DeletarInstrutor(req: Request, res: Response) {

        try {

            const { EDV } = req.params;


            await InstrutorService.deletar(
                Number(EDV)
            );


            return res.status(200).send({
                response: "Sucesso ao Deletar Instrutor!"
            });


        } catch (error) {

            console.error(error);

            return res.status(500).send({
                mensagem: error instanceof Error
                    ? error.message
                    : error
            });

        }

    }

}