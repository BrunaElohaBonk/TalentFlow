import { Request, Response } from "express";
import dotenv from "dotenv";
import { AdicionarUserDto, EsqueceuSenhaDto, LoginDto, RedefinirSenhaDto } from "../DTO/authDTO.ts";
import { InvalidCredentialsError, InvalidTokenError, PasswordMismatchError, ServerConfigError, UserJaExisteError, UserNotFoundError, UserService} from "../Services/AuthService.ts";

dotenv.config();

class AuthController {
    static async register(req: Request, res: Response): Promise<void> {
        const data: AdicionarUserDto = req.body;
    
        try {
          await UserService.register(data);
          res.status(201).json({ message: "Usuário cadastrado com sucesso" });
        } catch (error) {
          if (error instanceof UserJaExisteError) {
            res.status(409).json({ message: error.message });
            return;
          }
    
          console.error(error);
          res.status(500).json({ message: "Erro interno ao cadastrar usuário" });
        }
      }

      static async login(req: Request, res: Response): Promise<void> {
        const data: LoginDto = req.body;
    
        try {
          const result = await UserService.login(data);
          res.status(200).json(result);
        } catch (error) {
          if (error instanceof UserNotFoundError) {
            res.status(404).send({ response: error.message });
            return;
          }
          if (error instanceof InvalidCredentialsError) {
            res.status(400).send({ response: error.message });
            return;
          }
          if (error instanceof ServerConfigError) {
            res.status(500).send({ response: error.message });
            return;
          }
          console.error(error);
          res.status(500).send({ response: "Erro interno" });
        }
      }
    
      static async redefinirSenha(req: Request, res: Response): Promise<void> {
        const data: RedefinirSenhaDto = req.body;
    
        try {
          await UserService.redefinirSenha(data);
          res.status(200).send({ response: "Senha redefinida com sucesso" });
        } catch (error) {
          if (error instanceof PasswordMismatchError) {
            res.status(400).send({ response: error.message });
            return;
          }
          if (error instanceof ServerConfigError) {
            res.status(500).send({ response: error.message });
            return;
          }
          if (error instanceof InvalidTokenError || error instanceof UserNotFoundError) {
            res.status(error instanceof UserNotFoundError ? 404 : 400).send({
              response: error.message,
            });
            return;
          }
          res.status(400).send({ response: "Campos obrigatórios ausentes" });
        }
      }
      static async EsqueceuSenha(req: Request, res: Response): Promise<void> {
        const data: EsqueceuSenhaDto = req.body;
      
        try {
          await UserService.esqueceuSenha(data);
          res.status(200).send({ response: "Se o e-mail existir, um link de redefinição foi enviado" });
        } catch (error) {
          if (error instanceof ServerConfigError) {
            res.status(500).send({ response: error.message });
            return;
          }
          console.error(error);
          res.status(500).send({ response: "Erro interno" });
        }
    }

    static async Logout(req:Request, res:Response): Promise<void>{
        res.status(200).send({ response: "Logout realizado com sucesso" });
    }
}

export default AuthController;