import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { prisma } from "../lib/prisma.ts";

import {
  AdicionarUserDto,
  EsqueceuSenhaDto,
  LoginDto,
  RedefinirSenhaDto
} from "../DTO/authDTO.ts";



export class UserJaExisteError extends Error {
  constructor(message = "EDV ou e-mail já cadastrado") {
    super(message);
    this.name = "UserJaExisteError";
  }
}


export class UserNotFoundError extends Error {
  constructor(message = "Usuário não encontrado") {
    super(message);
    this.name = "UserNotFoundError";
  }
}


export class InvalidCredentialsError extends Error {
  constructor(message = "Email e/ou senha incorreta") {
    super(message);
    this.name = "InvalidCredentialsError";
  }
}


export class ServerConfigError extends Error {
  constructor(message = "Erro de configuração do servidor") {
    super(message);
    this.name = "ServerConfigError";
  }
}


export class InvalidTokenError extends Error {
  constructor(message = "Token inválido ou expirado") {
    super(message);
    this.name = "InvalidTokenError";
  }
}


export class PasswordMismatchError extends Error {
  constructor(message = "Senhas não coincidem") {
    super(message);
    this.name = "PasswordMismatchError";
  }
}



interface JWTPayload {

  EDV:number;

  tipoUser:
    | "APRENDIZ"
    | "INSTRUTOR";

  name:string;

}



type LoginResult =
  | {
      primeiroAcesso:true;
      redirectTo:string;
    }
  | {
      token:string;

      user:{
        EDV:number;
        name:string;
        tipoUser:string;
      };
    };



export class UserService {



  private static getSecret(){

    const secret = process.env.SECRET;

    if(!secret){
      throw new ServerConfigError();
    }

    return secret;

  }



  static converterDataBR(dataString:string):Date {

    const [dia, mes, ano] = dataString.split("/");

    return new Date(`${ano}-${mes}-${dia}`);

  }



  private static formatarDataBR(data:Date):string {

    const dia =
      String(data.getDate())
      .padStart(2,"0");


    const mes =
      String(data.getMonth()+1)
      .padStart(2,"0");


    const ano =
      data.getFullYear();


    return `${dia}/${mes}/${ano}`;

  }





  static async register(data:AdicionarUserDto){


    const passwordCrypt =
      await bcrypt.hash(
        data.password_login,
        10
      );


    try {


      return await prisma.user.create({

        data:{


          EDV:data.EDV,


          tipoUser:data.tipoUser,


          name:data.name,


          data_nascimento:
            this.converterDataBR(
              data.data_nascimento
            ),


          user_bosch:
            data.user_bosch,


          contato:
            data.contato,


          email_bosch:
            data.email_bosch,


          password_login:
            passwordCrypt

        }

      });



    }catch(error:any){


      if(error.code === "P2002"){

        throw new UserJaExisteError();

      }


      throw error;

    }


  }





  static async login(
    data:LoginDto
  ):Promise<LoginResult>{



    const user =
      await prisma.user.findUnique({

        where:{
          EDV:data.EDV
        }

      });



    if(!user){

      throw new UserNotFoundError();

    }




    const primeiroAcesso =
      this.formatarDataBR(
        user.data_nascimento
      );



    if(data.password === primeiroAcesso){


      return {

        primeiroAcesso:true,

        redirectTo:"/trocar-senha"

      };

    }





    const senhaValida =
      await bcrypt.compare(

        data.password,

        user.password_login

      );



    if(!senhaValida){

      throw new InvalidCredentialsError();

    }





    const token =
      jwt.sign(


        {

          EDV:user.EDV,


          tipoUser:user.tipoUser,


          name:user.name


        },


        this.getSecret(),


        {

          expiresIn:"2d"

        }


      );






    return {


      token,


      user:{


        EDV:user.EDV,


        name:user.name,


        tipoUser:user.tipoUser


      }


    };



  }





  static async redefinirSenha(
    data:RedefinirSenhaDto
  ):Promise<void>{



    if(
      !data.token ||
      !data.password ||
      !data.confirmPassword
    ){

      throw new Error(
        "Campos obrigatórios ausentes"
      );

    }




    if(
      data.password !==
      data.confirmPassword
    ){

      throw new PasswordMismatchError();

    }




    let decoded:JWTPayload;



    try{


      decoded =
        jwt.verify(

          data.token,

          this.getSecret()

        ) as JWTPayload;



    }catch{


      throw new InvalidTokenError();


    }





    const user =
      await prisma.user.findUnique({

        where:{
          EDV:decoded.EDV
        }

      });





    if(!user){

      throw new UserNotFoundError();

    }





    const senhaCrypt =
      await bcrypt.hash(
        data.password,
        10
      );





    await prisma.user.update({

      where:{
        EDV:decoded.EDV
      },


      data:{

        password_login:
          senhaCrypt

      }

    });



  }






  static async esqueceuSenha(
    data:EsqueceuSenhaDto
  ):Promise<void>{



    const user =
      await prisma.user.findUnique({

        where:{
          email_bosch:data.email
        }

      });




    if(!user){

      return;

    }





    const resetToken =
      jwt.sign(

        {

          EDV:user.EDV

        },

        this.getSecret(),

        {

          expiresIn:"1h"

        }

      );




    await enviarEmailRedefinicao(

      user.email_bosch,

      resetToken

    );



  }


}




async function enviarEmailRedefinicao(
  email:string,
  token:string
){

  console.log(
    "Enviar email para:",
    email
  );

  console.log(
    "Token:",
    token
  );


}