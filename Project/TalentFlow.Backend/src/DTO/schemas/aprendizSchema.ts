import { z } from "zod";



const EDVSchema = z.coerce.number()
    .refine(
        valor => valor.toString().length === 8,
        {
            message:
            "EDV deve possuir exatamente 8 números"
        }
    );



// CRIAR APRENDIZ

export const criarAprendizSchema = z.object({

    EDV: EDVSchema,

    Id_Turma: z.coerce.number()
        .positive(
            "Turma inválida"
        )

});




// ATUALIZAR PERFIL

export const atualizarPerfilSchema = z.object({

    name: z.string()
        .min(
            3,
            "Nome deve possuir pelo menos 3 caracteres"
        )
        .optional(),


    email_bosch: z.string()
        .email(
            "Email inválido"
        )
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




// SITUAÇÃO PROFISSIONAL

export const atualizarSituacaoProfissionalSchema =
z.object({

    nome_Setor: z.string()
        .optional(),


    nome_Lider: z.string()
        .optional(),


    cumprido_Estagio: z.boolean()
        .optional(),


    bio_profissional: z.string()
        .optional()

});





// FORMAÇÃO ACADÊMICA

export const atualizarFormacaoSchema =
z.object({

    name_Curso: z.string()
        .min(
            2,
            "Nome do curso obrigatório"
        ),


    nome_Institucao: z.string()
        .min(
            2,
            "Nome da instituição obrigatório"
        ),


    status_Academico:
        z.enum([
            "CONCLUIDO",
            "CURSANDO"
        ]),


    periodo_Atual:
        z.number(),


    total_Periodo:
        z.number(),


    nivel_formacao:
        z.enum([
            "ENSINO_MEDIO",
            "TECNICO",
            "GRADUACAO",
            "POS_GRADUACAO"
        ])

});





// SOFT SKILLS

export const atualizarSoftSkillsSchema =
z.object({

    nome_SoftSkills:
        z.array(
            z.string()
        )

});





// COMPETÊNCIAS

export const atualizarCompetenciaSchema =
z.object({

    nome_Competencia:
        z.string()
        .min(
            2,
            "Competência obrigatória"
        ),


    nivel_Competencia:
        z.enum([
            "BASICO",
            "INTERMEDIARIO",
            "AVANÇADO"
        ])

});





// IDIOMAS

export const atualizarIdiomaSchema =
z.object({

    nome_Idioma:
        z.enum([
            "ALEMAO",
            "ARABE",
            "COREANO",
            "ESPANHOL",
            "FRANCES",
            "INGLES",
            "ITALIANO",
            "JAPONES",
            "MANDARIM",
            "RUSSO",
            "TAILANDES"
        ]),


    nivel_Idioma:
        z.enum([
            "BASICO",
            "INTERMEDIARIO",
            "AVANCADO",
            "FLUENTE"
        ])

});





// CURSOS

export const atualizarCursoSchema =
z.object({

    name_Curso:
        z.string()
        .min(
            2,
            "Nome do curso obrigatório"
        ),


    status_Cursos:
        z.enum([
            "CONCLUIDO",
            "CURSANDO"
        ]),


    data_Conclusao:
        z.string(),


    carga_horaria:
        z.number()
        .positive(
            "Carga horária inválida"
        )

});