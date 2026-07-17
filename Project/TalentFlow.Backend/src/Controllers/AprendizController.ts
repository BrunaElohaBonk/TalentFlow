import { Request, Response, NextFunction } from "express";
import AprendizService from "../Services/AprendizService.ts";


export default class aprendizController {


    static async criar(
        req: Request,
        res: Response,
        next: NextFunction
    ) {

        try {

            const aprendiz =
                await AprendizService.criar(req.body);


            return res.status(201).json({

                message:
                    "Aprendiz vinculado à turma com sucesso!",

                data: aprendiz

            });


        } catch(error) {

            next(error);

        }

    }





    static async delete(
        req: Request,
        res: Response,
        next: NextFunction
    ) {

        try {

            const { EDV } = req.params;


            await AprendizService.delete(
                Number(EDV)
            );


            return res.status(200).json({

                message:
                    "Aprendiz deletado com sucesso!"

            });


        } catch(error) {

            next(error);

        }

    }





    static async atualizarPerfil(
        req: Request,
        res: Response,
        next: NextFunction
    ) {

        try {

            const { idPerfil } = req.params;


            const perfilAtualizado =
                await AprendizService.atualizarPerfil(
                    Number(idPerfil),
                    req.body
                );


            return res.status(200).json({

                response:
                    "Perfil atualizado com sucesso!",

                perfil:
                    perfilAtualizado

            });


        } catch(error) {

            next(error);

        }

    }






    static async atualizarFormacaoAcademica(
        req: Request,
        res: Response,
        next: NextFunction
    ) {

        try {

            const { EDV, id } = req.params;


            const formacaoAtualizada =
                await AprendizService.atualizarFormacaoAcademica(
                    Number(EDV),
                    Number(id),
                    req.body
                );


            return res.status(200).json({

                response:
                    "Formação acadêmica atualizada com sucesso!",

                data:
                    formacaoAtualizada

            });


        } catch(error) {

            next(error);

        }

    }






    static async atualizarSituacaoProfissional(
        req: Request,
        res: Response,
        next: NextFunction
    ) {

        try {

            const { EDV, id } = req.params;


            const situacaoAtualizada =
                await AprendizService.atualizarSituacaoProfissional(
                    Number(EDV),
                    Number(id),
                    req.body
                );


            return res.status(200).json({

                response:
                    "Situação profissional atualizada com sucesso!",

                data:
                    situacaoAtualizada

            });


        } catch(error) {

            next(error);

        }

    }






    static async atualizarSoftskills(
        req: Request,
        res: Response,
        next: NextFunction
    ) {

        try {

            const { id, EDV } = req.params;


            const softskill =
                await AprendizService.atualizarSoftskills(
                    Number(EDV),
                    Number(id),
                    req.body
                );


            return res.status(200).json({

                response:
                    "Soft Skill atualizada com sucesso!",

                data:
                    softskill

            });


        } catch(error) {

            next(error);

        }

    }
    static async atualizarCompetencias(
        req: Request,
        res: Response,
        next: NextFunction
    ) {

        try {

            const { id, EDV } = req.params;


            const competencia =
                await AprendizService.atualizarCompetencias(
                    Number(EDV),
                    Number(id),
                    req.body
                );


            return res.status(200).json({

                response:
                    "Competência atualizada com sucesso!",

                data:
                    competencia

            });


        } catch(error) {

            next(error);

        }

    }





    static async atualizarIdiomas(
        req: Request,
        res: Response,
        next: NextFunction
    ) {

        try {

            const { id, EDV } = req.params;


            const idioma =
                await AprendizService.atualizarIdiomas(
                    Number(EDV),
                    Number(id),
                    req.body
                );


            return res.status(200).json({

                response:
                    "Idioma atualizado com sucesso!",

                data:
                    idioma

            });


        } catch(error) {

            next(error);

        }

    }





    static async atualizarCursos(
        req: Request,
        res: Response,
        next: NextFunction
    ) {

        try {

            const { id, EDV } = req.params;


            const curso =
                await AprendizService.atualizarCursos(
                    Number(EDV),
                    Number(id),
                    req.body
                );


            return res.status(200).json({

                response:
                    "Curso atualizado com sucesso!",

                data:
                    curso

            });


        } catch(error) {

            next(error);

        }

    }





    static async verPerfil(
        req: Request,
        res: Response,
        next: NextFunction
    ) {

        try {

            const { EDV, id } = req.params;


            const perfil =
                await AprendizService.verPerfil(
                    Number(EDV),
                    Number(id)
                );


            if (!perfil) {

                throw new Error(
                    "Perfil não encontrado"
                );

            }


            return res.status(200).json({

                data:
                    perfil

            });


        } catch(error) {

            next(error);

        }

    }






    static async verFormacaoAcademica(
        req: Request,
        res: Response,
        next: NextFunction
    ) {

        try {

            const { EDV, id } = req.params;


            const formacao =
                await AprendizService.verFormacaoAcademica(
                    Number(EDV),
                    Number(id)
                );


            return res.status(200).json({

                data:
                    formacao

            });


        } catch(error) {

            next(error);

        }

    }






    static async verSituacaoProfissional(
        req: Request,
        res: Response,
        next: NextFunction
    ) {

        try {

            const { EDV, id } = req.params;


            const situacao =
                await AprendizService.verSituacaoProfissional(
                    Number(EDV),
                    Number(id)
                );


            return res.status(200).json({

                data:
                    situacao

            });


        } catch(error) {

            next(error);

        }

    }






    static async verSoftskills(
        req: Request,
        res: Response,
        next: NextFunction
    ) {

        try {

            const { EDV, id } = req.params;


            const softskills =
                await AprendizService.verSoftskills(
                    Number(EDV),
                    Number(id)
                );


            return res.status(200).json({

                data:
                    softskills

            });


        } catch(error) {

            next(error);

        }

    }
    static async verCompetencias(
        req: Request,
        res: Response,
        next: NextFunction
    ) {

        try {

            const { EDV, id } = req.params;


            const competencias =
                await AprendizService.verCompetencias(
                    Number(EDV),
                    Number(id)
                );


            return res.status(200).json({

                data:
                    competencias

            });


        } catch(error) {

            next(error);

        }

    }





    static async verIdiomas(
        req: Request,
        res: Response,
        next: NextFunction
    ) {

        try {

            const { EDV, id } = req.params;


            const idiomas =
                await AprendizService.verIdiomas(
                    Number(EDV),
                    Number(id)
                );


            return res.status(200).json({

                data:
                    idiomas

            });


        } catch(error) {

            next(error);

        }

    }





    static async verCursos(
        req: Request,
        res: Response,
        next: NextFunction
    ) {

        try {

            const { EDV, id } = req.params;


            const cursos =
                await AprendizService.verCursos(
                    Number(EDV),
                    Number(id)
                );


            return res.status(200).json({

                data:
                    cursos

            });


        } catch(error) {

            next(error);

        }

    }





    static async filtrarApredizDashboart(
        req: Request,
        res: Response,
        next: NextFunction
    ) {

        try {

            const dashboard =
                await AprendizService.filtrarApredizDashboart();


            return res.status(200).json(dashboard);


        } catch(error) {

            next(error);

        }

    }





    static async filtrarTudoAprendiz(
        req: Request,
        res: Response,
        next: NextFunction
    ) {

        try {

            const aprendizes =
                await AprendizService.filtrarTudo(
                    req.query
                );


            return res.status(200).json(aprendizes);


        } catch(error) {

            next(error);

        }

    }


}