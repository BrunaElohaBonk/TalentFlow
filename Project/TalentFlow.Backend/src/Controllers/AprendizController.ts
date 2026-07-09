import { Request, Response } from "express";
import { prisma } from "../lib/prisma.js";

export default class aprendizController {
    static async delete(req: Request, res: Response) {
        const {EDV} = req.params

    try {
        await prisma.aprendiz.delete({
            where: {
                EDV: Number(EDV),
            },
        });
        return res.status(200).json({
            message: "Aprendiz deletado com sucesso!",
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: error instanceof Error
                ? error.message
                : "Erro interno do servidor",
        });
    }
}

    static async atualizarPerfil(req:Request, res: Response){
        const { idPerfil } = req.params
        const data = req.params;

        try {
            const perfilAtualizado = await prisma.profile.update({
                where : {
                    id:Number(idPerfil),
                },
                data,
            });
        return res.status(200).json({
            response: "Perfil atualizado com sucesso!",
            perfil: perfilAtualizado,
        });

    } catch(error) {
        console.error(error);

        return res.status(500).json({
            message: error instanceof Error
                ? error.message
                : error
        });
    }
}

    static async atualizarFormacaoAcademica(req: Request, res: Response) {
        const { EDV, id } = req.params;
        const data = req.body;

    try {
        const formacaoAtualizada = await prisma.formacao_Academica.update({
            where: {
                id: Number(id),
                profile: {
                    EDV_Aprendiz: Number(EDV)
                }
            },
            data,
        });

        return res.status(200).json({
            response: "Formação acadêmica atualizada com sucesso!",
            data: formacaoAtualizada,
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: error instanceof Error
                ? error.message
                : error,
        });
    }
}


    static async atualizarSituacaoProfissional(req: Request, res: Response) {
    const { EDV, id } = req.params;
    const data = req.body;

    try {
        const situacaoAtualizada = await prisma.situacao_profissional.update({
            where: {
                id: Number(id),
                profile: {
                    EDV_Aprendiz: Number(EDV)
                }
            },
            data,
        });

        return res.status(200).json({
            response: "Situação profissional atualizada com sucesso!",
            data: situacaoAtualizada,
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: error instanceof Error
                ? error.message
                : error,
        });
    }
}

    static async atualizarSoftskills(req: Request, res: Response) {
    const { id, EDV } = req.params;
    const data = req.body;

    try {
        const softskill = await prisma.soft_Skills.update({
            where: {
                id: Number(id),
                profile:{
                    EDV_Aprendiz: Number(EDV)
                }
            },
            data
        });

        return res.status(200).send({
            response: "Soft Skill atualizada com sucesso!",
            data: softskill
        });
    }
    catch(error) {
        console.error(error);

        return res.status(500).send({
            mensagem: error instanceof Error
                ? error.message
                : error
        });
    }
}

    static async atualizarCompetencias(req: Request, res: Response) {
        const { id, EDV } = req.params;
        const data = req.body;

    try {
        const competencia = await prisma.competencia.update({
            where: {
                id: Number(id),
                profile:{
                    EDV_Aprendiz: Number(EDV)
                }                
            },
            data
        });

        return res.status(200).send({
            response: "Competência atualizada com sucesso!",
            data: competencia
        });
    }
    catch(error) {
        console.error(error);

        return res.status(500).send({
            mensagem: error instanceof Error
                ? error.message
                : error
        });
    }
}

    static async atualizarIdiomas(req: Request, res: Response) {
        const { id, EDV } = req.params;
        const data = req.body;

    try {
        const idioma = await prisma.idiomas.update({
            where: {
                id: Number(id),
                profile:{
                    EDV_Aprendiz: Number(EDV)
                }
            },
            data
        });

        return res.status(200).send({
            response: "Idioma atualizado com sucesso!",
            data: idioma
        });
    }
    catch(error) {
        console.error(error);

        return res.status(500).send({
            mensagem: error instanceof Error
                ? error.message
                : error
        });
    }
}

    static async atualizarCursos(req: Request, res: Response) {
        const { id,EDV} = req.params;
        const data = req.body;

    try {
        const curso = await prisma.cursos.update({
            where: {
                id: Number(id),
                profile:{
                    EDV_Aprendiz:Number(EDV)
                }
            },
            data
        });

        return res.status(200).send({
            response: "Curso atualizado com sucesso!",
            data: curso
        });
    }
    catch(error) {
        console.error(error);

        return res.status(500).send({
            mensagem: error instanceof Error
                ? error.message
                : error
        });
    }
}

    static async verPerfil(req: Request, res: Response) {
        const { EDV, id } = req.params;

    try {
        const perfil = await prisma.profile.findFirst({
            where: {
                id: Number(id),
                EDV_Aprendiz: Number(EDV)
            },
            include: {
                situacao_profissional: true,
                soft_Skills: true,
                competencia: true,
                formacao_Academica: true,
                idiomas: true,
                cursos: true
            }
        });

        if (!perfil) {
            return res.status(404).send({
                message: "Perfil não encontrado"
            });
        }

        return res.status(200).send({
            data: perfil
        });

    } catch(error) {
        console.error(error);

        return res.status(500).send({
            mensagem: error instanceof Error
                ? error.message
                : error
        });
    }
}

    static async verFormacaoAcademica(req: Request, res: Response) {
        const { EDV, id } = req.params;

    try {
        const formacao = await prisma.formacao_Academica.findMany({
            where: {
                Id_Profile: Number(id),
                profile: {
                    EDV_Aprendiz: Number(EDV)
                }
            }
        });

        return res.status(200).send({
            data: formacao
        });

    } catch(error) {
        console.error(error);

        return res.status(500).send({
            mensagem: error instanceof Error
                ? error.message
                : error
        });
    }
}

    static async verSituacaoProfissional(req: Request, res: Response) {
        const { EDV, id } = req.params;

    try {
        const situacao = await prisma.situacao_profissional.findMany({
            where: {
                Id_Profile: Number(id),
                profile: {
                    EDV_Aprendiz: Number(EDV)
                }
            }
        });

        return res.status(200).send({
            data: situacao
        });

    } catch(error) {
        console.error(error);

        return res.status(500).send({
            mensagem: error instanceof Error
                ? error.message
                : error
        });
    }
}

    static async verSoftskills(req: Request, res: Response) {
        const { EDV, id } = req.params;

    try {
        const softskills = await prisma.soft_Skills.findMany({
            where: {
                Id_Profile: Number(id),
                profile: {
                    EDV_Aprendiz: Number(EDV)
                }
            }
        });

        return res.status(200).send({
            data: softskills
        });

    } catch(error) {
        console.error(error);

        return res.status(500).send({
            mensagem: error instanceof Error
                ? error.message
                : error
        });
    }
}

    static async verCompetencias(req: Request, res: Response) {
        const { EDV, id } = req.params;

    try {
        const competencias = await prisma.competencia.findMany({
            where: {
                Id_Profile: Number(id),
                profile: {
                    EDV_Aprendiz: Number(EDV)
                }
            }
        });

        return res.status(200).send({
            data: competencias
        });

    } catch(error) {
        console.error(error);

        return res.status(500).send({
            mensagem: error instanceof Error
                ? error.message
                : error
        });
    }
}

    static async verIdiomas(req: Request, res: Response) {
        const { EDV, id } = req.params;

    try {
        const idiomas = await prisma.idiomas.findMany({
            where: {
                Id_Profile: Number(id),
                profile: {
                    EDV_Aprendiz: Number(EDV)
                }
            }
        });

        return res.status(200).send({
            data: idiomas
        });

    } catch(error) {
        console.error(error);

        return res.status(500).send({
            mensagem: error instanceof Error
                ? error.message
                : error
        });
    }
}

    static async verCursos(req: Request, res: Response) {
        const { EDV, id } = req.params;

    try {
        const cursos = await prisma.cursos.findMany({
            where: {
                Id_Profile: Number(id),
                profile: {
                    EDV_Aprendiz: Number(EDV)
                }
            }
        });

        return res.status(200).send({
            data: cursos
        });

    } catch(error) {
        console.error(error);

        return res.status(500).send({
            mensagem: error instanceof Error
                ? error.message
                : error
        });
    }
}

static async filtrarApredizDashboart(req: Request, res: Response) {

    try {

        // 1 - Quantidade de aprendizes em estágio
        const aprendizesEstagio = await prisma.situacao_profissional.count({
            where: {
                cumprido_Estagio: true
            }
        });


        // 2 - Idade dos aprendizes
        const aprendizes = await prisma.aprendiz.findMany({
            include: {
                user: true
            }
        });


        const idades = aprendizes.map(aprendiz => {

            const nascimento = new Date(
                aprendiz.user.data_nascimento
            );

            const hoje = new Date();

            let idade = hoje.getFullYear() - nascimento.getFullYear();

            const mes = hoje.getMonth() - nascimento.getMonth();

            if (
                mes < 0 || 
                (mes === 0 && hoje.getDate() < nascimento.getDate())
            ) {
                idade--;
            }

            return idade;

        });


        // 3 - Quantidade de aprendizes que falam outro idioma
        const aprendizesIdioma = await prisma.idiomas.findMany({
            distinct: [
                "Id_Profile"
            ]
        });


        // 4 - Quantidade de aprendizes acima do ensino médio
        const aprendizesMaisQueMedio = await prisma.formacao_Academica.count({
            where: {
                nivel_formacao: {
                    in: [
                        "TECNICO",
                        "GRADUACAO",
                        "POS_GRADUACAO"
                    ]
                }
            }
        });


        return res.status(200).send({

            estagio: {
                quantidade: aprendizesEstagio
            },

            idade: {
                idades
            },

            idiomas: {
                quantidade: aprendizesIdioma.length
            },

            formacao: {
                acimaEnsinoMedio: aprendizesMaisQueMedio
            }

        });


    } catch(error) {

        console.error(error);

        return res.status(500).send({
            mensagem: error instanceof Error
                ? error.message
                : error
        });

    }
}
    static async filtrarTudoAprediz(req:Request, res: Response){
        
        try {
            return res.status(200).send({response: "Atualizado Sucesso!"})
        }
        catch(error){
            console.error(error)
            return res.status(200).send({
                messagem: error instanceof Error
                ? error.message
                :error
            })
        }
    }

    
}