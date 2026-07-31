import { prisma } from "../lib/prisma.ts";
import { InstrutorDto } from "../DTO/instrutorDTO.ts";
import { TipoHistorico } from "@prisma/client";
export default class InstrutorService {
  static async editar(EDV: number, data: InstrutorDto, usuarioEDV: number) {

    return await prisma.$transaction(async (tx) => {

        const UserAntigo = await tx.user.findUnique({
            where: { EDV },
        });


        let dataNascimento;

        if (data.data_nascimento) {

            const [dia, mes, ano] = data.data_nascimento.split("/");

            dataNascimento = new Date(
                Number(ano),
                Number(mes) - 1,
                Number(dia)
            );
        }


        const dadosAtualizados = {
            name: data.name,
            email_bosch: data.email_bosch,
            contato: data.contato,
            data_nascimento: dataNascimento,
        };


        const user = await tx.user.update({
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
                Acao: "UPDATE",
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
