import { prisma } from "../lib/prisma.ts";
import { InstrutorDto } from "../DTO/instrutorDTO.ts";
import { TipoHistorico } from "@prisma/client";
export default class InstrutorService {
  static async editar(EDV: number, data: InstrutorDto, usuarioEDV: number) {
    return await prisma.$transaction(async (tx) => {
      const UserAntigo = await tx.user.findUnique({
        where: { EDV },
      });

      const dadosAtualizados = {
        ...data,
        data_nascimento: data.data_nascimento
          ? new Date(data.data_nascimento)
          : undefined,
      };
      const user = await prisma.user.update({
        where: {
          EDV,
        },
        data: dadosAtualizados,
      });
      await tx.perfilhistorico.create({
        data: {
          Id_Profile: null,
          Tipo: TipoHistorico.DADOS_INSTRUTOR,
          IdRegistro: user.EDV,
          Acao: "DELETE",
          EDVAlteradoPor: usuarioEDV,
          Dados: {
            UserAntigo,
            user,
          },
        },
      });
      return user;
    });
  }
}
