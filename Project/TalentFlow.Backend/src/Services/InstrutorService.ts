import { prisma } from "../lib/prisma.ts";
import {InstrutorDto } from "../DTO/instrutorDTO.ts";
import {AdicionarUserDto} from "../DTO/authDTO.ts";


export default class InstrutorService {

    static async editar(
        EDV: number,
        data: InstrutorDto
    ) {

        const dadosAtualizados = {

            ...data,

            data_nascimento: data.data_nascimento
                ? new Date(data.data_nascimento)
                : undefined

        };


        return await prisma.user.update({

            where: {

                EDV

            },

            data: dadosAtualizados

        });

    }
}