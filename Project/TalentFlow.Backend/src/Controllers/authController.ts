import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import { prisma } from "../lib/prisma.ts";
import { AdicionarUserDto} from "../DTO/authDTO.ts";

dotenv.config();

class AuthController {

    static async register(req: Request, res: Response): Promise<void> {
        const data:AdicionarUserDto = req.body;

        try {
            const passwordCrypt = await bcrypt.hash(data.password, 10);

            await prisma.instrutor.create ({
                data: {
                    EDV: data.EDV,
                    Name: data.nome,
                    tipoUser:data.tipouser,
                    Data_nascimento:data.dataNascimento,
                    
                    
                    Contato:data.contato,
                    Email_bosch: data.emailBosch,
                    Password_login: passwordCrypt,
            }

            });

            await user.save();
            res.status(201).json({ message: "Usuário cadastrado com sucesso" });
        } catch (error) {
            res.status(400).json({ message: "Something failed" });
        }
    }

    static async login(req: Request, res: Response): Promise<void> {
        // Implementação da função
    }
}

export default AuthController;