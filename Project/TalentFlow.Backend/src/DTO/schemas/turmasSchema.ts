import { z } from "zod";


export const criarTurmaSchema = z.object({

    nomeTurma: z.string()
        .min(
            3,
            "Nome da turma deve possuir pelo menos 3 caracteres"
        ),


    name_Curso: z.string()
        .min(
            3,
            "Nome do curso deve possuir pelo menos 3 caracteres"
        ),


    EDV_Instrutor: z.coerce.number()
        .refine(
            valor => valor.toString().length === 8,
            {
                message:
                "EDV do instrutor deve possuir exatamente 8 números"
            }
        ),


    nomeInstrutor: z.string()
        .min(
            3,
            "Nome do instrutor obrigatório"
        )

});





export const editarTurmaSchema = z.object({

    nomeTurma: z.string()
        .min(
            3,
            "Nome da turma deve possuir pelo menos 3 caracteres"
        )
        .optional(),


    name_Curso: z.string()
        .min(
            3,
            "Nome do curso deve possuir pelo menos 3 caracteres"
        )
        .optional(),


    EDV_Instrutor: z.coerce.number()
        .refine(
            valor => valor.toString().length === 8,
            {
                message:
                "EDV do instrutor deve possuir exatamente 8 números"
            }
        )
        .optional(),


    nomeInstrutor: z.string()
        .min(
            3,
            "Nome do instrutor obrigatório"
        )
        .optional()

});