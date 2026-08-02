export type NivelIdioma =
  | "BASICO"
  | "INTERMEDIARIO"
  | "AVANCADO"
  | "FLUENTE";

  export type NivelFormacao =
    | "ENSINO_MEDIO"
    | "TECNICO"
    | "GRADUACAO"
    | "POS_GRADUACAO";


export interface AtualizarPerfilDto {
    fotoAprendiz: File;
    email: string;
    user?: string;
    EDV:number;
    contato:string;
    name:string;
    data_nascimento:string;
}

export interface AtualizarSituacaoProfissionalDto {

    nome_Setor?: string;
    nome_Lider?: string;
    cumprido_Estagio?: boolean;
    bio_profissional?: string;

}

export interface AtualizarFormacaoAcademicaDto {

    id:number;
    name_Curso:string;
    nome_Institucao:string;
    status_Academico:
    "CONCLUIDO" | "CURSANDO"|"NAO_INFORMADO";
    periodo_Atual:number;
    total_Periodo:number;
    nivel_formacao:NivelFormacao;

}

export interface AtualizarCursosComplementaresDto {

    id_Curso:number;
    Id_Profile:number;
    name_Curso:string;
    status_Cursos:
    "CONCLUIDO" | "CURSANDO"|"NAO_INFORMADO";
    data_Conclusao:string;
    carga_horaria:number;

}

export interface AtualizarIdiomasDto {

    id:number;
    nome_Idioma:NivelIdioma;
    nivel_Idioma:NivelIdioma;

}

export interface AtualizarSoftSkillsDto {

    id:number;
    nome_SoftSkills:string[];

}

export interface AtualizarCompetenciasDto {

    id:number;
    nome_Competencia:string;
    nivel_Competencia:string;

}
export interface CriarFormacaoAcademicaDto {
    curso: string;
    instituicao: string;
    situacao: "Concluído" | "Cursando";
    periodoAtual?: number;
    totalPeriodos: number;
    nivelFormacao:
        | "Ensino Médio"
        | "Técnico"
        | "Graduação"
        | "Pós Graduação";
    descricao: string;
    certificado?: string | null;
}