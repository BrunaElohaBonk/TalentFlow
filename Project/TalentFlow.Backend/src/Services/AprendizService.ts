import { Prisma } from "@prisma/client";
import { prisma } from "../lib/prisma.js";
import { TipoHistorico } from "@prisma/client";
import { idiomas_nome_Idioma } from "@prisma/client";

export default class AprendizService {
    //Metado para registrar tudo desde criar ate deletar

    private static async registrarHistorico(
        tx: Prisma.TransactionClient,
        idProfile: number,
        tipo: "PROFILE" | "CURSO" | "COMPETENCIA" | "competencia" | "FORMACAO_ACADEMICA" | "SITUACAO_PROFISSIONAL",
        idRegistro: number,
        usuario: { EDV: number },
        antes: any,
        depois: any
    ) {
        await tx.perfilhistorico.create({
            data: {
                Id_Profile: idProfile,
                Tipo: tipo,
                IdRegistro: idRegistro,
                Acao: "UPDATE",
                EDVAlteradoPor: usuario.EDV,
                Dados: {
                    antes,
                    depois
                }
            }
        });
    }

    static async criar(data: { EDV: number;Id_Turma: number;},
        usuarioLogado: { EDV: number; name: string; }
) {
        return await prisma.$transaction(async (tx) => {

            const criadoaprendiz = await tx.aprendiz.create({
                data: {
                    EDV: data.EDV,
                    Id_Turma: data.Id_Turma,
                    profile: {
                        create: {}
                    }
                },
                include: {
                    user: true,
                    turma: false,
                    profile: true
                }
            });
    
            await tx.perfilhistorico.create({
                data: {
                    Id_Profile: criadoaprendiz.profile?.id,
                    Tipo: TipoHistorico.PROFILE,
                    IdRegistro:criadoaprendiz.profile?.id,
                    Acao: "CREATE",
                    EDVAlteradoPor: usuarioLogado.EDV,
                    Dados: {
                        criadoaprendiz: null
                    }
                }
            });
    
            return criadoaprendiz;
        });

    }


    static async atualizarPerfil(
        idPerfil: number,
        data: any,
        usuarioLogado: {
            EDV: number;
            name: string;
        }
    ) {
        return await prisma.$transaction(async (tx: any) => {

            const perfilAntigo = await tx.profile.findUnique({
                where: { id: idPerfil}
            });

            if (!perfilAntigo) {
                throw new Error("Perfil não encontrado.");
            }

            const perfilAtualizado = await tx.profile.update({
                where: { id: idPerfil },
                data
            });

            await this.registrarHistorico(
                tx,
                idPerfil,
                TipoHistorico.PROFILE,
                idPerfil,
                usuarioLogado,
                perfilAntigo,
                perfilAtualizado
            );

            return perfilAtualizado;
        });
    }

    static async atualizarFormacaoAcademica(
        EDV: number,
        id: number,
        Id_Profile: number,
        data: any,
        usuarioLogado: {
            EDV: number;
            name: string;
        }
    ) {
        return await prisma.$transaction(async (tx: any) => {
            const formacaoAcademicaAntigo = await tx.formacao_academica.findUnique({

                where: {
                    id,
                    profile: { EDV_Aprendiz: EDV}
                },
            });

            if (!formacaoAcademicaAntigo) {
                throw new Error("Perfil não encontrado.");
            }
            const formacaoAcademicaAtualizado = await tx.formacao_academica.update({
                where: {
                    id: id
                },
                data
            });
            
            await this.registrarHistorico(
                tx,
                Id_Profile,
                TipoHistorico.FORMACAO_ACADEMICA,
                id,
                usuarioLogado,
                formacaoAcademicaAntigo,
                formacaoAcademicaAtualizado
            );
            return formacaoAcademicaAtualizado;
        });
    }

    static async atualizarSituacaoProfissional(
        EDV: number,
        id: number,
        Id_Profile: number,
        data: any,
        usuarioLogado: {
            EDV: number;
            name: string;
        }
    ) {
        return await prisma.$transaction(async (tx: any) => {
            const SituacaoProfissionalAntigo = await tx.situacao_profissional.findUnique({
                where: {
                    id,
                    profile: { EDV_Aprendiz: EDV }
                }
            });

            if (!SituacaoProfissionalAntigo){
                throw new Error("Perfil não encontrado.");  
            }
            const situacaoProfissionalAtualizado = await tx.situacao_profissional.update({
                where: {
                    id,
                    profile: { EDV_Aprendiz: EDV }
                },
                data
            });
             await this.registrarHistorico(
                tx,
                Id_Profile,
                TipoHistorico.SITUACAO_PROFISSIONAL,
                id,
                usuarioLogado,
                SituacaoProfissionalAntigo,
                situacaoProfissionalAtualizado
            );    
            return situacaoProfissionalAtualizado;
        });
    }

    static async atualizarcompetencias(
        EDV: number,
        id: number,
        Id_Profile: number,
        data: any,
        usuarioLogado: {
            EDV: number;
            name: string;
        }
    ) {
        return await prisma.$transaction(async (tx: any) =>{
            const competenciaAntigo = await tx.competencia.findUnique({
                where: {
                    id,
                    profile: { EDV_Aprendiz: EDV }
                }
            })
            if (!competenciaAntigo) {
                throw new Error("Perfil não encontrado.");
            }
            const competenciaAtualizado = await tx.competencia.update({
                where: {
                    id,
                    profile: { EDV_Aprendiz: EDV }
                },
                data
            })

            await this.registrarHistorico(
                tx,
                Id_Profile,
                TipoHistorico.COMPETENCIA,
                id,
                usuarioLogado,
                competenciaAntigo,
                competenciaAtualizado
            );             
        return competenciaAtualizado;

        });
    }

    static async atualizarCompetencias(
        EDV: number,
        id: number,
        Id_Profile: number,
        data: any,
        usuarioLogado: {
            EDV: number;
            name: string;
        }
    ) {
        return await prisma.$transaction(async (tx: any) =>{
            const competenciaAntigo = await tx.competencia.findUnique({
                where: {
                    id,
                    profile: { EDV_Aprendiz: EDV }
                }
            });
            if (!competenciaAntigo) {
                throw new Error("Perfil não encontrado.");
            }
            const competenciaAtualizado = await tx.competencia.update({
                where: {
                    id,
                    profile: { EDV_Aprendiz: EDV }
                },
                data
            });

            await this.registrarHistorico(
                tx,
                Id_Profile,
                TipoHistorico.COMPETENCIA,
                id,
                usuarioLogado,
                competenciaAntigo,
                competenciaAtualizado
            ); 
    
            return competenciaAtualizado;

        });
    }

    static async atualizarCursos(
        EDV: number,
        id: number,
        Id_Profile: number,
        data: any,
        usuarioLogado: {
            EDV: number;
            name: string;
        }
    ) {
        return await prisma.$transaction(async (tx: any) => {

            const cursosAntigo = await tx.cursos.findUnique({
                where: {
                    id,
                    profile: { EDV_Aprendiz: EDV }
                }
            });
            if (!cursosAntigo) {
                throw new Error("Perfil não encontrado.");
            }
            const cursosAtualizado = await tx.cursos.update({
                where: {
                    id,
                    profile: { EDV_Aprendiz: EDV }
                },
                data
            });
            await this.registrarHistorico(
                tx,
                Id_Profile,
                TipoHistorico.CURSO,
                id,
                usuarioLogado,
                cursosAntigo,
                cursosAtualizado
            ); 

            return cursosAtualizado;
        });
    }

    static async verPerfil(EDV: number, id: number) {
        return await prisma.profile.findFirst({
            where: {
                id,
                EDV_Aprendiz: EDV
            },
            include: {
                situacao_profissional: true,
                soft_skills: true,
                competencia: true,
                formacao_academica: true,
                cursos: true
            }
        });
    }


    static async verFormacaoAcademica(EDV: number, id: number) {
        return await prisma.formacao_academica.findMany({
            where: {
                Id_Profile: id,
                profile: {
                    EDV_Aprendiz: EDV
                }
            }
        });
    }


    static async verSituacaoProfissional(EDV: number, id: number) {
        return await prisma.situacao_profissional.findMany({
            where: {
                Id_Profile: id,
                profile: {
                    EDV_Aprendiz: EDV
                }
            }
        });
    }


    static async vercompetencias(EDV: number, id: number) {
        return await prisma.soft_skills.findMany({
            where: {
                Id_Profile: id,
                profile: {
                    EDV_Aprendiz: EDV
                }
            }
        });
    }


    static async verCompetencias(EDV: number, id: number) {
        return await prisma.competencia.findMany({
            where: {
                Id_Profile: id,
                profile: {
                    EDV_Aprendiz: EDV
                }
            }
        });
    }


    static async vercursos(EDV: number, id: number) {
        return await prisma.cursos.findMany({
            where: {
                Id_Profile: id,
                profile: {
                    EDV_Aprendiz: EDV
                }
            }
        });
    }


    static async verCursos(EDV: number, id: number) {
        return await prisma.cursos.findMany({
            where: {
                Id_Profile: id,
                profile: {
                    EDV_Aprendiz: EDV
                }
            }
        });
    }
    static async filtrarApredizDashboart() {

        const aprendizesEstagio = await prisma.situacao_profissional.count({
            where: {
                cumprido_Estagio: true
            }
        });


        const aprendizes = await prisma.aprendiz.findMany({
            include: {
                user: true
            }
        });


        const idades = aprendizes.map((aprendiz:any) => {

            const nascimento = new Date(
                aprendiz.user.data_nascimento
            );

            const hoje = new Date();

            let idade =
                hoje.getFullYear() -
                nascimento.getFullYear();

            const mes =
                hoje.getMonth() -
                nascimento.getMonth();


            if (
                mes < 0 ||
                (mes === 0 &&
                    hoje.getDate() < nascimento.getDate())
            ) {
                idade--;
            }

            return idade;

        });


        const aprendizesIdioma = await prisma.cursos.findMany({
            distinct: [
                "Id_Profile"
            ]
        });


        const aprendizesMaisQueMedio =
            await prisma.formacao_academica.count({
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


        return {

            estagio: {
                quantidade: aprendizesEstagio
            },

            idade: {
                idades
            },

            cursos: {
                quantidade: aprendizesIdioma.length
            },

            formacao: {
                acimaEnsinoMedio: aprendizesMaisQueMedio
            }

        };
    }

    static async filtrarTudo(filtros: any) {

        const {
            nome,
            turma,
            cursos,
            idiomas,
            competencia,
            softskills,
            setor
        } = filtros;


        return await prisma.aprendiz.findMany({

            where: {

                user: nome
                    ? {
                        name: {
                            contains: String(nome)
                        }
                    }
                    : undefined,


                Id_Turma: turma
                    ? Number(turma)
                    : undefined,


                profile: {

                    is: {

                        formacao_academica: cursos
                            ? {
                                some: {
                                    name_Curso: {
                                        contains: String(cursos)
                                    }
                                }
                            }
                            : undefined,


                        competencia: competencia
                            ? {
                                some: {
                                    nome_Competencia: {
                                        contains: String(competencia)
                                    }
                                }
                            }
                            : undefined,


                        soft_skills: softskills
                            ? {
                                some: {
                                    nome_SoftSkills: {
                                        contains: String(softskills)
                                    }
                                }
                            }
                            : undefined,

                        idiomas: idiomas?.length
                        ? {
                            some: {
                                nome_Idioma: {
                                    in: idiomas as idiomas_nome_Idioma[]
                                }
                            }
                        }
                        : undefined,

                        situacao_profissional: setor
                            ? {
                                some: {
                                    nome_Setor: {
                                        contains: String(setor)
                                    }
                                }
                            }
                            : undefined

                    }

                }

            },


            include: {

                user: true,

                turma: false,

                profile: {

                    include: {

                        formacao_academica: true,

                        cursos: true,

                        competencia: true,

                        soft_skills: true,

                        idiomas: true,

                        situacao_profissional: true,
                    }
                }
            }

        });

    }
}