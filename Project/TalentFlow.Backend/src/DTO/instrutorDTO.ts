export interface AdicionarInstrutorDto {
    nomeInstrutor:string;
    EDV:number;
    emailBosch: string;
    userBosch: string;
    dataNascimento:string;
    contato:string;
    password:string;
}

export interface EditarInstrutorDto {
    nomeInstrutor?:string;
    EDV?:number;
    emailBosch?:string;
    userBosch?:string;
    dataNascimento?:string;
    contato?:string;
    password?:string;
    fotoInstrutor?:File;
}