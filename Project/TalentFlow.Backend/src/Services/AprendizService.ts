import { Prisma } from "@prisma/client";
import { prisma } from "../lib/prisma.js";
import { TipoHistorico } from "@prisma/client";
import { idiomas_nome_Idioma } from "@prisma/client";
import {
  AtualizarCompetenciasDto,
  AtualizarCursosComplementaresDto,
  AtualizarFormacaoAcademicaDto,
  AtualizarIdiomasDto,
  AtualizarPerfilDto,
  AtualizarSituacaoProfissionalDto,
  AtualizarSoftSkillsDto,
} from "../DTO/aprendizDTO.ts";

export default class AprendizService {
  //Metado para registrar tudo desde criar ate deletar

  private static async registrarHistorico(
    tx: Prisma.TransactionClient,
    idProfile: number,
    tipo: TipoHistorico,
    idRegistro: number,
    usuario: number,
    antes: any,
    depois: any
  ) {
    await tx.perfilhistorico.create({
      data: {
        Id_Profile: idProfile!,
        Tipo: tipo,
        IdRegistro: idRegistro!,
        Acao: "UPDATE",
        EDVAlteradoPor: usuario,
        Dados: {
          antes,
          depois,
        },
      },
    });
  }

  static async criar(
    data: { EDV: number; Id_Turma: number },
    usuarioEDV: number
  ) {
    return await prisma.$transaction(async (tx) => {
      const criadoaprendiz = await tx.aprendiz.create({
        data: {
          EDV: data.EDV,
          Id_Turma: data.Id_Turma,
          profile: {
            create: {},
          },
        },
        include: {
          user: true,
          turma: false,
          profile: true,
        },
      });

      await tx.perfilhistorico.create({
        data: {
          Id_Profile: criadoaprendiz.profile?.id,
          Tipo: TipoHistorico.PROFILE,
          IdRegistro: criadoaprendiz.profile?.id,
          Acao: "CREATE",
          EDVAlteradoPor: usuarioEDV,
          Dados: {
            criadoaprendiz: null,
          },
        },
      });

      return criadoaprendiz;
    });
  }

  static async atualizarPerfil(
    idPerfil: number,
    data: AtualizarPerfilDto,
    usuarioEDV: number
  ) {
    return await prisma.$transaction(async (tx: any) => {
      const perfilAntigo = await tx.profile.findUnique({
        where: { id: idPerfil },
      });

      if (!perfilAntigo) {
        throw new Error("Perfil não encontrado.");
      }

      const perfilAtualizado = await tx.profile.update({
        where: { id: idPerfil },
        data,
      });

      await this.registrarHistorico(
        tx,
        idPerfil,
        TipoHistorico.PROFILE,
        idPerfil,
        usuarioEDV,
        perfilAntigo,
        perfilAtualizado
      );

      return perfilAtualizado;
    });
  }

  static async atualizarFormacaoAcademica(
    EDV: number,
    Id_Profile: number,
    data: AtualizarFormacaoAcademicaDto,
    usuarioEDV: number
  ) {
    return await prisma.$transaction(async (tx: any) => {
      const formacaoAcademicaAntigo = await tx.formacao_academica.findUnique({
        where: {
          id: data.id,
          profile: { EDV_Aprendiz: EDV },
        },
      });

      if (!formacaoAcademicaAntigo) {
        throw new Error("Perfil não encontrado.");
      }
      const formacaoAcademicaAtualizado = await tx.formacao_academica.update({
        where: {
          id: data.id,
          profile: { EDV_Aprendiz: EDV },
        },
        data,
      });

      await this.registrarHistorico(
        tx,
        Id_Profile,
        TipoHistorico.FORMACAO_ACADEMICA,
        data.id,
        usuarioEDV,
        formacaoAcademicaAntigo,
        formacaoAcademicaAtualizado
      );
      return formacaoAcademicaAtualizado;
    });
  }

  static async atualizarSituacaoProfissional(
    EDV: number,
    Id_Profile: number,
    data: AtualizarSituacaoProfissionalDto,
    usuarioEDV: number
  ) {
    return await prisma.$transaction(async (tx: any) => {
      const SituacaoProfissionalAntigo =
        await tx.situacao_profissional.findUnique({
          where: {
            profile: { EDV_Aprendiz: EDV },
          },
        });

      if (!SituacaoProfissionalAntigo) {
        throw new Error("Perfil não encontrado.");
      }
      const situacaoProfissionalAtualizado =
        await tx.situacao_profissional.update({
          where: {
            profile: { EDV_Aprendiz: EDV },
          },
          data,
        });
      await this.registrarHistorico(
        tx,
        Id_Profile,
        TipoHistorico.SITUACAO_PROFISSIONAL,
        null!,
        usuarioEDV,
        SituacaoProfissionalAntigo,
        situacaoProfissionalAtualizado
      );
      return situacaoProfissionalAtualizado;
    });
  }

  static async atualizarCompetencias(
    EDV: number,
    Id_Profile: number,
    data: AtualizarCompetenciasDto,
    usuarioEDV: number
  ) {
    return await prisma.$transaction(async (tx: any) => {
      const competenciaAntigo = await tx.competencia.findUnique({
        where: {
          id: data.id,
          profile: { EDV_Aprendiz: EDV },
        },
      });
      if (!competenciaAntigo) {
        throw new Error("Perfil não encontrado.");
      }
      const competenciaAtualizado = await tx.competencia.update({
        where: {
          id: data.id,
          profile: { EDV_Aprendiz: EDV },
        },
        data,
      });

      await this.registrarHistorico(
        tx,
        Id_Profile,
        TipoHistorico.COMPETENCIA,
        data.id,
        usuarioEDV,
        competenciaAntigo,
        competenciaAtualizado
      );
      return competenciaAtualizado;
    });
  }

  static async atualizarIdiomas(
    EDV: number,
    Id_Profile: number,
    data: AtualizarIdiomasDto,
    usuarioEDV: number
  ) {
    return await prisma.$transaction(async (tx: any) => {
      const idiomasAntigo = await tx.idiomas.findUnique({
        where: {
          id: data.id,
          profile: { EDV_Aprendiz: EDV },
        },
      });
      if (!idiomasAntigo) {
        throw new Error("Perfil não encontrado.");
      }
      const idiomasAtualizado = await tx.idiomas.update({
        where: {
          id: data.id,
          profile: { EDV_Aprendiz: EDV },
        },
        data,
      });

      await this.registrarHistorico(
        tx,
        Id_Profile,
        TipoHistorico.IDIOMA,
        data.id,
        usuarioEDV,
        idiomasAntigo,
        idiomasAtualizado
      );

      return idiomasAtualizado;
    });
  }

  static async atualizarCursos(
    EDV: number,
    Id_Profile: number,
    data: AtualizarCursosComplementaresDto,
    usuarioEDV: number
  ) {
    return await prisma.$transaction(async (tx: any) => {
      const cursosAntigo = await tx.cursos.findUnique({
        where: {
          id: data.id,
          profile: { EDV_Aprendiz: EDV },
        },
      });
      if (!cursosAntigo) {
        throw new Error("Perfil não encontrado.");
      }
      const cursosAtualizado = await tx.cursos.update({
        where: {
          id: data.id,
          profile: { EDV_Aprendiz: EDV },
        },
        data,
      });
      await this.registrarHistorico(
        tx,
        Id_Profile,
        TipoHistorico.CURSO,
        data.id,
        usuarioEDV,
        cursosAntigo,
        cursosAtualizado
      );

      return cursosAtualizado;
    });
  }
  
  static async atualizarSoftskills(
    EDV: number,
    Id_Profile: number,
    data: AtualizarSoftSkillsDto,
    usuarioEDV: number
  ) {
    return await prisma.$transaction(async (tx: any) => {
      const softskillAntigo = await tx.soft_skills.findUnique({
        where: {
          id: data.id,
          profile: { EDV_Aprendiz: EDV },
        },
      });
      if (!softskillAntigo) {
        throw new Error("Perfil não encontrado.");
      }
      const softskillAtualizado = await tx.soft_skills.update({
        where: {
          id: data.id,
          profile: { EDV_Aprendiz: EDV },
        },
        data,
      });
      await this.registrarHistorico(
        tx,
        Id_Profile,
        TipoHistorico.CURSO,
        data.id,
        usuarioEDV,
        softskillAntigo,
        softskillAtualizado
      );

      return softskillAtualizado;
    });
  }

  static async verPerfil(EDV: number, id: number) {
    return await prisma.profile.findFirst({
      where: {
        id,
        EDV_Aprendiz: EDV,
      },
      include: {
        situacao_profissional: true,
        soft_skills: true,
        competencia: true,
        formacao_academica: true,
        cursos: true,
      },
    });
  }

  static async verFormacaoAcademica(EDV: number, id: number) {
    return await prisma.formacao_academica.findMany({
      where: {
        Id_Profile: id,
        profile: {
          EDV_Aprendiz: EDV,
        },
      },
    });
  }

  static async verSituacaoProfissional(EDV: number, id: number) {
    return await prisma.situacao_profissional.findMany({
      where: {
        Id_Profile: id,
        profile: {
          EDV_Aprendiz: EDV,
        },
      },
    });
  }

  static async verCompetencias(EDV: number, id: number) {
    return await prisma.competencia.findMany({
      where: {
        Id_Profile: id,
        profile: {
          EDV_Aprendiz: EDV,
        },
      },
    });
  }

  static async verIdiomas(EDV: number, id: number) {
    return await prisma.idiomas.findMany({
      where: {
        Id_Profile: id,
        profile: {
          EDV_Aprendiz: EDV,
        },
      },
    });
  }

  static async verCursos(EDV: number, id: number) {
    return await prisma.cursos.findMany({
      where: {
        Id_Profile: id,
        profile: {
          EDV_Aprendiz: EDV,
        },
      },
    });
  }

  static async verSoftskills(EDV: number, id: number) {
    return await prisma.soft_skills.findMany({
      where: {
        Id_Profile: id,
        profile: {
          EDV_Aprendiz: EDV,
        },
      },
    });
  }
}
export class DashboardService {
  static async dashboardAprendiz() {
    const aprendizes = await prisma.aprendiz.findMany({
      include: {
        user: true,
        profile: {
          include: {
            situacao_profissional: true,
            competencia: true,
            idiomas: true,
            formacao_academica: true,
          },
        },
      },
    });

    const totalAprendizes = aprendizes.length;

    const emEstagio = aprendizes.filter((aprendiz) =>
      aprendiz.profile?.situacao_profissional.some((s) => s.cumprido_Estagio)
    ).length;

    const percentualEstagio =
      totalAprendizes > 0
        ? Number(((emEstagio / totalAprendizes) * 100).toFixed(2))
        : 0;

    const setores: any = {};
    const competencias: any = {};
    const idiomas: any = {};
    const idades: any = {};

    aprendizes.forEach((aprendiz) => {
      const nascimento = new Date(aprendiz.user.data_nascimento);
      const hoje = new Date();

      let idade = hoje.getFullYear() - nascimento.getFullYear();

      const mes = hoje.getMonth() - nascimento.getMonth();

      if (mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())) {
        idade--;
      }

      idades[idade] = (idades[idade] || 0) + 1;

      aprendiz.profile?.situacao_profissional.forEach((s) => {
        if (s.nome_Setor) {
          setores[s.nome_Setor] = (setores[s.nome_Setor] || 0) + 1;
        }
      });

      aprendiz.profile?.competencia.forEach((c) => {
        competencias[c.nome_Competencia] =
          (competencias[c.nome_Competencia] || 0) + 1;
      });

      aprendiz.profile?.idiomas.forEach((i) => {
        idiomas[i.nome_Idioma] = (idiomas[i.nome_Idioma] || 0) + 1;
      });
    });

    const cursoSuperior = aprendizes.filter((aprendiz) =>
      aprendiz.profile?.formacao_academica.some(
        (f) =>
          f.nivel_formacao === "GRADUACAO" ||
          f.nivel_formacao === "POS_GRADUACAO"
      )
    ).length;

    return {
      totalAprendizes,

      estagio: {
        quantidade: emEstagio,
        percentual: percentualEstagio,
      },

      idade: Object.entries(idades).map(([idade, quantidade]) => ({
        idade: Number(idade),
        quantidade,
      })),

      setores: Object.entries(setores).map(([nome, quantidade]) => ({
        nome,
        quantidade,
      })),

      competencias: Object.entries(competencias).map(([nome, quantidade]) => ({
        nome,
        quantidade,
      })),

      idiomas: Object.entries(idiomas).map(([nome, quantidade]) => ({
        nome,
        quantidade,
      })),

      formacao: {
        cursoSuperior,
      },
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
      setor,
      formacao,
      idade,
    } = filtros;

    let filtroIdade: any = undefined;

    if (idade) {
      const hoje = new Date();

      filtroIdade = {
        gte: new Date(
          hoje.getFullYear() - Number(idade) - 1,
          hoje.getMonth(),
          hoje.getDate()
        ),
        lt: new Date(
          hoje.getFullYear() - Number(idade),
          hoje.getMonth(),
          hoje.getDate()
        ),
      };
    }

    return await prisma.aprendiz.findMany({
      where: {
        user: {
          name: nome
            ? {
                contains: String(nome),
              }
            : undefined,

          data_nascimento: filtroIdade,
        },

        Id_Turma: turma ? Number(turma) : undefined,

        profile: {
          is: {
            formacao_academica: formacao
              ? {
                  some: {
                    nivel_formacao: formacao,
                  },
                }
              : undefined,

            cursos: cursos
              ? {
                  some: {
                    name_Curso: {
                      contains: String(cursos),
                    },
                  },
                }
              : undefined,

            competencia: competencia
              ? {
                  some: {
                    nome_Competencia: {
                      contains: String(competencia),
                    },
                  },
                }
              : undefined,

            soft_skills: softskills
              ? {
                  some: {
                    nome_SoftSkills: {
                      contains: String(softskills),
                    },
                  },
                }
              : undefined,

            idiomas: idiomas?.length
              ? {
                  some: {
                    nome_Idioma: {
                      in: idiomas,
                    },
                  },
                }
              : undefined,

            situacao_profissional: setor
              ? {
                  some: {
                    nome_Setor: {
                      contains: String(setor),
                    },
                  },
                }
              : undefined,
          },
        },
      },

      include: {
        user: true,

        turma: true,

        profile: {
          include: {
            formacao_academica: true,
            cursos: true,
            competencia: true,
            soft_skills: true,
            idiomas: true,
            situacao_profissional: true,
          },
        },
      },
    });
  }
}
