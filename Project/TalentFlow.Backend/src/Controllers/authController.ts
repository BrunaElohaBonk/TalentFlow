import { Request, Response } from "express";

import {
  AdicionarUserDto,
  EsqueceuSenhaDto,
  LoginDto,
  RedefinirSenhaDto
} from "../DTO/authDTO.ts";

import {
  InvalidCredentialsError,
  InvalidTokenError,
  PasswordMismatchError,
  ServerConfigError,
  UserJaExisteError,
  UserNotFoundError,
  UserService
} from "../Services/AuthService.ts";



class AuthController {



  static async register(
    req: Request,
    res: Response
  ): Promise<void> {


    const data: AdicionarUserDto = req.body;


    try {


      const user =
        await UserService.register(data);



      res.status(201).json({

        message:
          "Usuário cadastrado com sucesso",

        user

      });



    } catch(error){


      if(error instanceof UserJaExisteError){

        res.status(409).json({

          message:error.message

        });

        return;

      }



      console.error(error);



      res.status(500).json({

        message:
          "Erro interno ao cadastrar usuário"

      });



    }


  }







  static async login(
    req: Request,
    res: Response
  ): Promise<void>{



    const data: LoginDto = req.body;



    try {



      const result =
        await UserService.login(data);



      res.status(200).json(result);



    }catch(error){



      if(error instanceof UserNotFoundError){


        res.status(404).json({

          message:error.message

        });


        return;

      }





      if(error instanceof InvalidCredentialsError){


        res.status(401).json({

          message:error.message

        });


        return;


      }






      if(error instanceof ServerConfigError){


        res.status(500).json({

          message:error.message

        });


        return;


      }






      console.error(error);



      res.status(500).json({

        message:
          "Erro interno no login"

      });



    }


  }









  static async redefinirSenha(
    req: Request,
    res: Response
  ): Promise<void>{



    const data: RedefinirSenhaDto = req.body;




    try {



      await UserService.redefinirSenha(data);



      res.status(200).json({

        message:
          "Senha redefinida com sucesso"

      });




    }catch(error){





      if(error instanceof PasswordMismatchError){


        res.status(400).json({

          message:error.message

        });


        return;


      }







      if(error instanceof InvalidTokenError){


        res.status(401).json({

          message:error.message

        });


        return;


      }






      if(error instanceof UserNotFoundError){


        res.status(404).json({

          message:error.message

        });


        return;


      }






      if(error instanceof ServerConfigError){


        res.status(500).json({

          message:error.message

        });


        return;


      }






      res.status(400).json({

        message:
          "Dados inválidos"

      });



    }



  }








  static async esqueceuSenha(
    req: Request,
    res: Response
  ): Promise<void>{



    const data: EsqueceuSenhaDto = req.body;




    try {



      await UserService.esqueceuSenha(data);



      res.status(200).json({

        message:
          "Se o e-mail existir, um link de redefinição foi enviado"

      });




    }catch(error){





      if(error instanceof ServerConfigError){


        res.status(500).json({

          message:error.message

        });


        return;


      }






      console.error(error);



      res.status(500).json({

        message:
          "Erro interno"

      });



    }



  }







  static async logout(
    req: Request,
    res: Response
  ): Promise<void>{



    res.status(200).json({

      message:
        "Logout realizado com sucesso"

    });



  }



}



export default AuthController;