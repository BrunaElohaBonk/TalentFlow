import { prisma } from "../lib/prisma.js";

export default class AprendizService {
    static async criar(data: {
    EDV: number;
    Id_Turma: number;
}) {
    return await prisma.aprendiz.create({
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
            where: {
                id: idPerfil
            }
        });

        if (!perfilAntigo) {
            throw new Error("Perfil não encontrado.");
        }

        const perfilAtualizado = await tx.profile.update({
            where: {
                id: idPerfil
            },
            data
        });

        await tx.perfilhistorico.create({
            data: {
                Id_Profile: idPerfil,
                EDVAlteradoPor: usuarioLogado.EDV,
                dados: {
                    mensagem: `${usuarioLogado.name} editou o perfil`,
                    antes: perfilAntigo,
                    depois: perfilAtualizado
                }
            }
        });

        return perfilAtualizado;
    });
}

    static async atualizarFormacaoAcademica(
        EDV: number,
        id: number,
        data: any
    ) {
        return await prisma.formacao_academica.updateMany({
            where: {
                id,
                profile: {
                    EDV_Aprendiz: EDV
                }
            },
            data
        });
    }

    static async atualizarSituacaoProfissional(
        EDV: number,
        id: number,
        data: any
    ) {
        return await prisma.situacao_profissional.updateMany({
            where: {
                id,
                profile: {
                    EDV_Aprendiz: EDV
                }
            },
            data
        });
    }

    static async atualizarSoftskills(
        EDV: number,
        id: number,
        data: any
    ) {
        return await prisma.soft_skills.updateMany({
            where: {
                id,
                profile: {
                    EDV_Aprendiz: EDV
                }
            },
            data
        });
    }

    static async atualizarCompetencias(
        EDV: number,
        id: number,
        data: any
    ) {
        return await prisma.competencia.updateMany({
            where: {
                id,
                profile: {
                    EDV_Aprendiz: EDV
                }
            },
            data
        });
    }

    static async atualizarIdiomas(
        EDV: number,
        id: number,
        data: any
    ) {
        return await prisma.idiomas.updateMany({
            where: {
                id,
                profile: {
                    EDV_Aprendiz: EDV
                }
            },
            data
        });
    }

    static async atualizarCursos(
        EDV: number,
        id: number,
        data: any
    ) {
        return await prisma.cursos.updateMany({
            where: {
                id,
                profile: {
                    EDV_Aprendiz: EDV
                }
            },
            data
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
            idiomas: true,
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


static async verSoftskills(EDV: number, id: number) {
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


static async verIdiomas(EDV: number, id: number) {
    return await prisma.idiomas.findMany({
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


    const idades = aprendizes.map((aprendiz) => {

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


    const aprendizesIdioma = await prisma.idiomas.findMany({
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

        idiomas: {
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
        curso,
        idioma,
        competencia,
        softskill,
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

                    formacao_academica: curso
                        ? {
                            some: {
                                name_Curso: {
                                    contains: String(curso)
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


                    soft_skills: softskill
                        ? {
                            some: {
                                nome_SoftSkills: {
                                    contains: String(softskill)
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

                    idiomas: true,

                    competencia: true,

                    soft_skills: true,

                    situacao_profissional: true,

                    cursos: true
                }
            }
        }

    });

}}