import { Prisma } from "@prisma/client";
import { prisma } from "../lib/prisma.js";
import { TipoHistorico } from "@prisma/client";
import { idiomas_nome_Idioma, idiomas_nivel_Idioma } from "@prisma/client";
import {
  AtualizarCompetenciasDto,
  AtualizarCursosComplementaresDto,
  AtualizarFormacaoAcademicaDto,
  AtualizarIdiomasDto,
  AtualizarPerfilDto,
  AtualizarSituacaoProfissionalDto,
  AtualizarSoftSkillsDto,
} from "../DTO/aprendizDTO.ts";



type AprendizDashboard = Prisma.aprendizGetPayload<{
  include: {
    user: true;
    profile: {
      include: {
        situacao_profissional: true;
        competencia: true;
        idiomas: true;
        formacao_academica: true;
      };
    };
  };
}>;

export default class AprendizService {
  //Metado para registrar tudo desde criar ate deletar

  private static async registrarHistorico(
    tx: Prisma.TransactionClient,
    idProfile: number,
    tipo: TipoHistorico,
    idRegistro: number,
    usuario: number,
    antes: any,
    depois: any,
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
  static async adicionarCertificadoCurso(
    id: number,
    certificado: string | undefined,
  ) {
    if (!certificado) {
      throw new Error("Certificado não enviado");
    }

    return await prisma.cursos.update({
      where: {
        id,
      },

      data: {
        certificado,
      },
    });
  }
  static async adicionarCertificadoFormacao(
    id: number,
    certificado: string | undefined,
  ) {
    if (!certificado) {
      throw new Error("Certificado não enviado");
    }

    return await prisma.formacao_academica.update({
      where: {
        id,
      },

      data: {
        certificado,
      },
    });
  }
  static async adicionarCertificadoIdioma(
    id: number,
    certificado: string | undefined,
  ) {
    if (!certificado) {
      throw new Error("Certificado não enviado");
    }

    return await prisma.idiomas.update({
      where: {
        id,
      },

      data: {
        certificado,
      },
    });
  }

  static async atualizarFoto(EDV: number, foto: string | undefined) {
    if (!foto) {
      throw new Error("Imagem não enviada");
    }

    return await prisma.user.update({
      where: {
        EDV: EDV,
      },

      data: {
        fotoPerfil: foto,
      },
    });
  }

  static async criar(
    data: { EDV: number; Id_Turma: number },
    usuarioEDV: number,
  ) {
    return await prisma.$transaction(async (tx: any) => {
      const criadoaprendiz = await tx.aprendiz.create({
        data: {
          EDV: data.EDV,
          Id_Turma: data.Id_Turma,

          profile: {
            create: {
              situacao_profissional: {
                create: {
                  nome_Setor: "NAO_INFORMADO",
                  nome_Lider: "NAO_INFORMADO",
                  cumprido_Estagio: false,
                  bio_profissional: "NAO_INFORMADO",
                },
              },

              formacao_academica: {
                create: {
                  name_Curso: "NAO_INFORMADO",
                  certificado: null,
                  status_Academico: "CURSANDO",
                  nivel_formacao: "ENSINO_MEDIO",
                  periodo_Atual: 0,
                  total_Periodo: 0,
                  nome_Institucao: "NAO_INFORMADO",
                },
              },

              cursos: {
                create: {
                  certificado: null,
                  name_Curso: "NAO_INFORMADO",
                  status_Cursos: "CURSANDO",
                  data_Conclusao: new Date(),
                  carga_horaria: 0,
                },
              },

              idiomas: {
                create: {
                  certificado: null,
                  nome_Idioma: "NAO_INFORMADO",
                  nivel_Idioma: "BASICO",
                },
              },

              competencia: {
                create: {
                  nome_Competencia: "NAO_INFORMADO",
                  nivel_Competencia: "NAO_INFORMADO",
                },
              },

              soft_skills: {
                create: {
                  nome_SoftSkills: "NAO_INFORMADO",
                },
              },
            },
          },
        },

        include: {
          user: true,
          turma: false,
          profile: {
            include: {
              situacao_profissional: true,
              formacao_academica: true,
              cursos: true,
              idiomas: true,
              competencia: true,
              soft_skills: true,
            },
          },
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
    usuarioEDV: number,
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
        perfilAtualizado,
      );

      return perfilAtualizado;
    });
  }
  static async adicionarIdioma(
    Id_Profile: number,
    data: {
      nome_Idioma: idiomas_nome_Idioma;
      nivel_Idioma: idiomas_nivel_Idioma;
      certificado?: string;
    }
  ) {
    return await prisma.idiomas.create({
      data: {
        Id_Profile,
        nome_Idioma: data.nome_Idioma,
        nivel_Idioma: data.nivel_Idioma,
        certificado: data.certificado
      }
    });
  }

  static async atualizarFormacaoAcademica(
    EDV: number,
    Id_Profile: number,
    data: AtualizarFormacaoAcademicaDto,
    usuarioEDV: number,
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
        formacaoAcademicaAtualizado,
      );
      return formacaoAcademicaAtualizado;
    });
  }

  static async atualizarSituacaoProfissional(
    EDV: number,
    idSituacao: number,
    data: AtualizarSituacaoProfissionalDto,
    usuarioEDV: number,
  ) {
    return await prisma.$transaction(async (tx: any) => {

      const SituacaoProfissionalAntigo =
        await tx.situacao_profissional.findUnique({
          where: {
            id: idSituacao,
          },
        });

      if (!SituacaoProfissionalAntigo) {
        throw new Error("Situação profissional não encontrada.");
      }

      const situacaoProfissionalAtualizado =
        await tx.situacao_profissional.update({
          where: {
            id: idSituacao,
          },
          data,
        });

      await this.registrarHistorico(
        tx,
        SituacaoProfissionalAntigo.Id_Profile,
        TipoHistorico.SITUACAO_PROFISSIONAL,
        idSituacao,
        usuarioEDV,
        SituacaoProfissionalAntigo,
        situacaoProfissionalAtualizado,
      );

      return situacaoProfissionalAtualizado;
    });
  }
  static async atualizarCompetencias(
    EDV: number,
    Id_Profile: number,
    data: AtualizarCompetenciasDto,
    usuarioEDV: number,
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
        competenciaAtualizado,
      );
      return competenciaAtualizado;
    });
  }

  static async atualizarIdiomas(
    EDV: number,
    Id_Profile: number,
    data: AtualizarIdiomasDto,
    usuarioEDV: number,
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
        idiomasAtualizado,
      );

      return idiomasAtualizado;
    });
  }

  static async atualizarCursos(
    EDV: number,
    Id_Profile: number,
    data: AtualizarCursosComplementaresDto,
    usuarioEDV: number,
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
        cursosAtualizado,
      );

      return cursosAtualizado;
    });
  }

  static async atualizarSoftskills(
    EDV: number,
    Id_Profile: number,
    data: AtualizarSoftSkillsDto,
    usuarioEDV: number,
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
        softskillAtualizado,
      );

      return softskillAtualizado;
    });
  }
  static async verAprendiz(EDV: number) {
    const Aprendiz = await prisma.aprendiz.findUnique({
      where: {
        EDV: EDV
      }
    })

    if (!Aprendiz) {
      return
    }
    return Aprendiz;
  }

  static async verPerfil(EDV: number) {

    const profile = await prisma.profile.findFirst({
      where: {
        EDV_Aprendiz: EDV
      }
    })

    if (!profile) {
      return
    }

    return await prisma.profile.findFirst({
      where: {
        id: profile.id,
        EDV_Aprendiz: EDV,
      },
      include: {
        situacao_profissional: true,
        soft_skills: true,
        competencia: true,
        formacao_academica: true,
        cursos: true,
        idiomas: true,
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
    const aprendizes: AprendizDashboard[] = await prisma.aprendiz.findMany({
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
      aprendiz.profile?.situacao_profissional.some((s) => s.cumprido_Estagio),
    ).length;

    const percentualEstagio =
      totalAprendizes > 0
        ? Number(((emEstagio / totalAprendizes) * 100).toFixed(2))
        : 0;

    const setores: Record<string, number> = {};
    const competencias: Record<string, number> = {};
    const idiomas: Record<string, number> = {};
    const idades: Record<number, number> = {};

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
          f.nivel_formacao === "POS_GRADUACAO",
      ),
    ).length;

    return {
      totalAprendizes,

      estagio: {
        quantidade: emEstagio,
        naoEstagiando: totalAprendizes - emEstagio,
        percentual: percentualEstagio,
      },

      idade: Object.entries(idades).map(([idade, quantidade]) => ({
        idade: Number(idade),
        quantidade,
      })),

      setores: Object.entries(setores).map(([nome, quantidade]) => ({
        setor: nome,
        quantidade,
      })),

      competencias: Object.entries(competencias).map(([nome, quantidade]) => ({
        competencia: nome,
        quantidade,
      })),

      idiomas: Object.entries(idiomas).map(([nome, quantidade]) => ({
        idioma: nome,
        quantidade,
      })),

      formacao: {
        cursoSuperior,
        naocursoSuperior: totalAprendizes - cursoSuperior,
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

    let filtroIdade = undefined;

    if (idade) {
      const hoje = new Date();

      filtroIdade = {
        gte: new Date(
          hoje.getFullYear() - Number(idade) - 1,
          hoje.getMonth(),
          hoje.getDate(),
        ),

        lt: new Date(
          hoje.getFullYear() - Number(idade),
          hoje.getMonth(),
          hoje.getDate(),
        ),
      };
    }

    return prisma.aprendiz.findMany({
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
                  nome_SoftSkills: softskills,
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
                  nome_Setor: setor,
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