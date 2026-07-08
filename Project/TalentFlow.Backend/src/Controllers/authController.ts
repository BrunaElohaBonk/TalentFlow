import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import { prisma } from "../lib/prisma.ts";

dotenv.config();

class AuthController {

    static async register(req: Request, res: Response): Promise<void> {
        const data:authDTO = req.body;

        try {
            const passwordCrypt = await bcrypt.hash(data.password, 10);

            await prisma.intrutor.create ({
                Data: {

                    name: data.name,
                    email: data.email,
                    password: passwordCrypt,
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