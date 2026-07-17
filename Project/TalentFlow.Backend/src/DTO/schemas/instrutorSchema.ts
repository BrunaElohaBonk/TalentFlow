import { z } from "zod";


export const criarUserSchema = z.object({

    EDV: z.coerce.number()
        .refine(
            valor => valor.toString().length === 8,
            {
                message:
                "EDV deve possuir exatamente 8 números"
            }
        ),


    name: z.string()
        .min(
            3,
            "Nome deve possuir pelo menos 3 caracteres"
        ),


    email_bosch: z.string()
        .email("Email inválido")
        .optional()
        .or(z.literal("")),


    user_bosch: z.string()
        .optional()
        .or(z.literal("")),


    data_nascimento: z.string()
        .min(
            1,
            "Data de nascimento obrigatória"
        ),


    contato: z.string()
        .min(
            8,
            "Contato inválido"
        )

});



export const editarInstrutorSchema = z.object({

    name: z.string()
        .min(
            3,
            "Nome deve possuir pelo menos 3 caracteres"
        )
        .optional(),


    email_bosch: z.string()
        .email("Email inválido")
        .optional()
        .or(z.literal("")),


    user_bosch: z.string()
        .optional()
        .or(z.literal("")),


    data_nascimento: z.string()
        .optional(),


    contato: z.string()
        .min(
            8,
            "Contato inválido"
        )
        .optional()

});