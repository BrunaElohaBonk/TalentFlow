export type User =
    | "APRENDIZ"
    | "INSTRUTOR";


export interface LoginDto {
    EDV: number;
    password: string;
}


export interface EsqueceuSenhaDto {
    EDV: number;
    email: string;
}


export interface RedefinirSenhaDto {
    token: string;
    EDV: number;
    password: string;
    confirmPassword: string;
}


export interface AdicionarUserDto {
    EDV: number;
    name: string;
    tipoUser: User;
    email_bosch: string;
    user_bosch: string;
    data_nascimento: string;
    contato: string;
    password_login: string;
}


export interface EditarInstrutorDto {
    name?: string;
    email_bosch?: string;
    user_bosch?: string;
    data_nascimento?: string;
    contato?: string;
    password_login?: string;
}