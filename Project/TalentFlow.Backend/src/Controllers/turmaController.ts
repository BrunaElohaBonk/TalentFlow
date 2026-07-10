import { Request, Response } from "express";
import { prisma } from "../lib/prisma.js";

export default class turmaController {

    static async criarTurma(req: Request, res: Response) {

        const { EDV_Instrutor, name_Curso } = req.body;

        try {

            const turma = await prisma.turma.create({
                data: {
                    EDV_Instrutor,
                    name_Curso
                }
            });

            return res.status(201).json({
                message: "Turma criada com sucesso!",
                turma
            });

        } catch (error) {

            console.error(error);

            return res.status(500).json({
                message: error instanceof Error
                    ? error.message
                    : error
            });

        }

    }


    static async verTurmas(req: Request, res: Response) {
        try {

            const turmas = await prisma.turma.findMany({
                include: {
                    user: true,
                    aprendiz: true
                }
            });

            return res.status(200).json(turmas);

        } catch (error) {
            console.error(error);

            return res.status(500).json({
                message: error instanceof Error
                    ? error.message
                    : error
            });
        }
    }

    static async buscarTurma(req: Request, res: Response) {

        const { id } = req.params;

        try {

            const turma = await prisma.turma.findUnique({
                where: {
                    id: Number(id)
                },
                include: {
                    user: true,
                    aprendiz: true
                }
            });

            if (!turma) {
                return res.status(404).json({
                    message: "Turma não encontrada."
                });
            }

            return res.status(200).json(turma);

        } catch (error) {

            console.error(error);

            return res.status(500).json({
                message: error instanceof Error
                    ? error.message
                    : error
            });

        }
    }

    static async atualizarTurma(req: Request, res: Response) {

        const { id } = req.params;
        const data = req.body;

        try {

            const turma = await prisma.turma.update({
                where: {
                    id: Number(id)
                },
                data
            });

            return res.status(200).json({
                message: "Turma atualizada com sucesso!",
                turma
            });

        } catch (error) {

            console.error(error);

            return res.status(500).json({
                message: error instanceof Error
                    ? error.message
                    : error
            });

        }
    }

    static async deletarTurma(req: Request, res: Response) {

        const { id } = req.params;

        try {

            await prisma.turma.delete({
                where: {
                    id: Number(id)
                }
            });

            return res.status(200).json({
                message: "Turma deletada com sucesso!"
            });

        } catch (error) {

            console.error(error);

            return res.status(500).json({
                message: error instanceof Error
                    ? error.message
                    : error
            });

        }

    }
}