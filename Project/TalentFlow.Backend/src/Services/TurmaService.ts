import { prisma } from "../lib/prisma.ts";
import { CriarTurmaDTO, EditarTurmaDTO } from "../DTO/turmaDTO.ts";

export class TurmaNotFoundError extends Error {
  constructor(message = "Turma não encontrada.") {
    super(message);
    this.name = "TurmaNotFoundError";
  }
}

export class TurmaService {
  static async criar(data: CriarTurmaDTO) {
    return await prisma.$transaction(async (tx) => {
      const turma = await prisma.turma.create({ data });
      await tx.turmahistorico.create({
        data: {
          Id_Turma: turma.id,
          acao: "CREATE",
          EDVAlteradoPor: data.EDV_Instrutor,
          dados: {
            turma: null,
          },
        },
      });
      return turma;
    });
  }

  static async listarTodas() {
    return prisma.turma.findMany({
      include: {
        user: true,
        aprendiz: true,
      },
    });
  }

  static async buscarPorId(id: number) {
    const turma = await prisma.turma.findUnique({
      where: { id },
      include: {
        user: true,
        aprendiz: true,
      },
    });

    if (!turma) {
      throw new TurmaNotFoundError();
    }

    return turma;
  }

  static async atualizar(id: number, data: EditarTurmaDTO, usuarioEDV: number) {
    return await prisma.$transaction(async (tx) => {
      try {
        const turmaAntigo = await tx.turma.findUnique({ where: { id } });

        if (!turmaAntigo) {
          throw new Error("turma não encontrado.");
        }
        const autalizadoturma = await prisma.turma.update({
          where: { id },
          data: {
            name_Curso: data.name_Curso,
          },
        });
        await tx.turmahistorico.create({
          data: {
            Id_Turma: id,
            acao: "UPDATE",
            EDVAlteradoPor: usuarioEDV,
            dados: {
              turmaAntigo,
              autalizadoturma,
            },
          },
        });
        return autalizadoturma;
      } catch (error: any) {
        if (error.code === "P2025") {
          throw new TurmaNotFoundError();
        }

        throw error;
      }
    });
  }

  static async deletar(id: number, usuarioEDV: number): Promise<any> {
    return await prisma.$transaction(async (tx) => {
      try {
        const turma = await prisma.turma.update({
          where: { id },
          data: { Ativo: false },
        });
        await tx.turmahistorico.create({
          data: {
            Id_Turma: id,
            acao: "DELETE",
            EDVAlteradoPor: usuarioEDV,
            dados: {
              turma,
            },
          },
        });
        return turma;
      } catch (error: any) {
        if (error.code === "P2025") {
          throw new TurmaNotFoundError();
        }

        throw error;
      }
    });
  }
}
