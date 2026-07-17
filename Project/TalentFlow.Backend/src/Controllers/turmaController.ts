import { Request, Response, NextFunction } from "express";
import { TurmaService } from "../Services/TurmaService.ts";
import {CriarTurmaDTO} from "../DTO/turmaDTO.ts"


export default class turmaController {


    static async criarTurma(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {

        try {

            const data : CriarTurmaDTO = req.body;
            const turma =
                await TurmaService.criar({
                    nomeTurma : data.nomeTurma,
                    name_Curso : data.name_Curso,
                    nomeInstrutor : data.nomeInstrutor,
                    EDV_Instrutor :data.EDV_Instrutor
                });


            res.status(201).json({

                message:
                    "Turma criada com sucesso!",

                turma

            });


        } catch(error) {

            next(error);

        }

    }





    static async verTurmas(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {


        try {

            const turmas =
                await TurmaService.listarTodas();


            res.status(200).json(turmas);


        } catch(error) {

            next(error);

        }

    }






    static async buscarTurma(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {


        try {

            const { id } = req.params;


            const turma =
                await TurmaService.buscarPorId(
                    Number(id)
                );


            res.status(200).json(turma);


        } catch(error) {

            next(error);

        }

    }







    static async atualizarTurma(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {


        try {

            const { id } = req.params;


            const turma =
                await TurmaService.atualizar(
                    Number(id),
                    req.body
                );


            res.status(200).json({

                message:
                    "Turma atualizada com sucesso!",

                turma

            });


        } catch(error) {

            next(error);

        }

    }

    static async deletarTurma(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {


        try {

            const { id } = req.params;


            await TurmaService.deletar(
                Number(id)
            );


            res.status(200).json({

                message:
                    "Turma deletada com sucesso!"

            });


        } catch(error) {

            next(error);

        }

    }


}