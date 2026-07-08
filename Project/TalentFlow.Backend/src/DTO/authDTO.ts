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