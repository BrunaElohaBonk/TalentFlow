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

export interface AdicionarAprendizDto {
    nomeAprendiz:string;
    EDV:number;
    turma: string;
    email: string;
    user?: string;
    dataNascimento:string;
    contato:string;
    password: string;
}

export interface AtualizarPerfilDto {
    fotoAprendiz: File;
    nomeAprendiz:string;
    email: string;
    user?: string;
    dataNascimento:string;
    EDV:number;
    contato:string;
}

export interface AtualizarSituacaoProfissionalDto {
    nomeSetor?:string;
    nomeLider?:string;
    cumprindoEstagio?:boolean;
    bio:string
}

export interface AtualizarFormacaoAcademicaDto {
    id: number;
    nomeCurso:string;
    nomeInstituicao:string;
    formacaoConcluida:boolean;
    periodoAtual:number;
    totalPeriodos:number;
    nivelFormacao:NivelFormacao;
    descricaoCurso:string;
    certificado?:File;
}

export interface AtualizarCursosComplementaresDto {
    id: number;
    nomeCurso:string;
    cursoConcluido:boolean;
    dataConclusao?:string
    cargaHoraria:number;
    descricaoCurso:string;
    certificado?:File;
}

export interface AtualizarIdiomasDto {
    id: number;
    nomeIdioma?:string;
    nivelIdioma?:NivelIdioma;
    certificado?:File;
}

export interface AtualizarSoftSkillsDto {
    id: number;
    nomeSoftskills:string[];
}

export interface AtualizarCompetenciasDto {
    id: number;
    nomeCompetencia:string;
    nivelCompetencia:string;
}