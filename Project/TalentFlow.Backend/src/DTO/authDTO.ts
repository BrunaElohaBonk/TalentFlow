export type User =
| "APRENDIZ"
| "INSTRUTOR";

export interface LoginDto {
    EDV:number;
    password: string;
}

export interface EsqueceuSenhaDto {
    EDV:number;
    email:string;
}

export interface RedefinirSenhaDto{
    token:string;
    password:string;
    confirmPassword:string;
}
export interface AdicionarUserDto {
    nome:string;
    EDV:number;
    tipouser:User;
    emailBosch: string;
    userBosch: string;
    dataNascimento:string;
    contato:string;
    password:string;
    trurmas?:[];
    
}