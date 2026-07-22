import { Request, Response, NextFunction } from "express";
import {
  AdicionarUserDto,
  EsqueceuSenhaDto,
  LoginDto,
  RedefinirSenhaDto,
} from "../DTO/authDTO.ts";
import { UserService } from "../Services/AuthService.ts";
import { AuthRequest } from "../Middlewares/authMiddleware.ts";

class AuthController {
  static async register(
    req: AuthRequest,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    const data: AdicionarUserDto = req.body;
    const user = await UserService.register(data);
    req.user!.EDV;
    res.status(201).json({
      message: "Usuário cadastrado com sucesso",
      user,
    });
  }
  static async DeletarUser(
    req: AuthRequest,
    res: Response,
    next: NextFunction,
  ) {
    const { EDV } = req.params;
    await UserService.deletar(Number(EDV), req.user!.EDV);
    return res.status(200).send({
      response: "Sucesso ao Deletar User!",
    });
  }
  static async login(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    const data: LoginDto = req.body;
    const result = await UserService.login(data);
    res.status(200).json(result);
  }
  static async redefinirSenha(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    const data: RedefinirSenhaDto = req.body;
    await UserService.redefinirSenha(data);
    res.status(200).json({
      message: "Senha redefinida com sucesso",
    });
  }

  static async esqueceuSenha(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    const data: EsqueceuSenhaDto = req.body;
    await UserService.esqueceuSenha(data);
    res.status(200).json({
      message: "Se o e-mail existir, um link de redefinição foi enviado",
    });
  }

  static async logout(req: Request, res: Response): Promise<void> {
    res.status(200).json({
      message: "Logout realizado com sucesso",
    });
  }
  static async primeiroAcesso(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      await UserService.primeiroAcesso(req.body);
      res.status(200).json({
        success: true,
        message: "Primeiro acesso configurado com sucesso",
      });
    } catch (error) {
      next(error);
    }
  }
}

export default AuthController;
