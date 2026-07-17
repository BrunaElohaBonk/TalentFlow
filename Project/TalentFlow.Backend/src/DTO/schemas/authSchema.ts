import { z } from "zod";


export const loginSchema = z.object({

    EDV: z.coerce.number()
        .refine(
            valor => valor.toString().length === 8,
            {
                message:
                "EDV deve possuir exatamente 8 números"
            }
        ),


    password: z.string()
        .min(1, "Senha obrigatória")

});



export const redefinirSenhaSchema = z.object({

    token: z.string()
        .min(1, "Token obrigatório"),


    EDV: z.coerce.number()
        .refine(
            valor => valor.toString().length === 8,
            {
                message:
                "EDV deve possuir exatamente 8 números"
            }
        ),


    password: z.string()
        .min(6, "Senha deve ter no mínimo 6 caracteres"),


    confirmPassword: z.string()

})
.refine(
    dados => dados.password === dados.confirmPassword,
    {
        message:
            "Senhas não coincidem",

        path:[
            "confirmPassword"
        ]
    }
);



export const esqueceuSenhaSchema = z.object({

    EDV: z.coerce.number()
        .refine(
            valor => valor.toString().length === 8,
            {
                message:
                "EDV deve possuir exatamente 8 números"
            }
        ),


    email: z.string()
        .email("Email inválido")

});