import { Request, Response, NextFunction } from "express";

import {
  AdicionarUserDto,
  EsqueceuSenhaDto,
  LoginDto,
  RedefinirSenhaDto
} from "../DTO/authDTO.ts";

import {
  UserService
} from "../Services/AuthService.ts";


class AuthController {


  static async register(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {

    try {

      const data: AdicionarUserDto = req.body;

      const user =
        await UserService.register(data);


      res.status(201).json({

        message:
          "Usuário cadastrado com sucesso",

        user

      });


    } catch(error) {

      next(error);

    }

  }




  static async login(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {

    try {

      const data: LoginDto = req.body;


      const result =
        await UserService.login(data);


      res.status(200).json(result);


    } catch(error) {

      next(error);

    }

  }

  static async redefinirSenha(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {

    try {

      const data: RedefinirSenhaDto = req.body;


      await UserService.redefinirSenha(data);


      res.status(200).json({

        message:
          "Senha redefinida com sucesso"

      });


    } catch(error) {

      next(error);

    }

  }

  static async esqueceuSenha(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {

    try {

      const data: EsqueceuSenhaDto = req.body;


      await UserService.esqueceuSenha(data);


      res.status(200).json({

        message:
          "Se o e-mail existir, um link de redefinição foi enviado"

      });


    } catch(error) {

      next(error);

    }

  }

  static async logout(
    req: Request,
    res: Response
  ): Promise<void> {


    res.status(200).json({

      message:
        "Logout realizado com sucesso"

    });

  }


}


export default AuthController;