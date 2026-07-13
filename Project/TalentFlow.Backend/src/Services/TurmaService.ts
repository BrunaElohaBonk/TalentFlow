import { Prisma } from "@prisma/client"
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import {prisma} from "../lib/prisma.ts";
import { EditarTurmaDTO } from "../DTO/turmaDTO.ts";

export class TurmaNotFoundError extends Error {
  constructor(message = "Turma não encontrada.") {
    super(message);
    this.name = "TurmaNotFoundError";
  }
}

interface CriarTurmaDto {
  EDV_Instrutor: number;
  name_Curso: string;
}

export class TurmaService {
  static async criar(data: CriarTurmaDto) {
    return prisma.turma.create({ data });
  }

  static async listarTodas() {
    return prisma.turma.findMany({
      include: { user: true, aprendiz: true },
    });
  }

  static async buscarPorId(id: number) {
    const turma = await prisma.turma.findUnique({
      where: { id },
      include: { user: true, aprendiz: true },
    });

    if (!turma) {
      throw new TurmaNotFoundError();
    }

    return turma;
  }

  static async atualizar(id: number, data: EditarTurmaDTO ) {
    try {
      return await prisma.turma.update({ where: { id }, data:{
        name_Curso: data.curso
      } });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError && error.code === "P2025") {
        throw new TurmaNotFoundError();
      }
      throw error;
    }
  }

  static async deletar(id: number): Promise<void> {
    try {
      await prisma.turma.delete({ where: { id } });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError && error.code === "P2025") {
        throw new TurmaNotFoundError();
      }
      throw error;
    }
  }
}