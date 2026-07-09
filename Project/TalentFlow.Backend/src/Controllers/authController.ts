import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import { prisma } from "../lib/prisma.ts";
import { AdicionarUserDto, LoginDto, RedefinirSenhaDto } from "../DTO/authDTO.ts";
import { Prisma } from "../generated/prisma/client.ts";

dotenv.config();

class AuthController {
    static async register(req: Request, res: Response): Promise<void> {
        const data: AdicionarUserDto = req.body;

        try {
            const passwordCrypt = await bcrypt.hash(data.password, 10);
            await prisma.user.create({
                data: {
                    EDV: data.EDV,
                    name: data.nome,
                    tipoUser: data.tipouser,
                    data_nascimento: new Date(data.dataNascimento),
                    user_bosch: data.userBosch,
                    contato: data.contato,
                    email_bosch: data.emailBosch,
                    password_login: passwordCrypt,
                }
            });

            res.status(201).json({ message: "Usuário cadastrado com sucesso" });
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
                res.status(409).json({ message: "EDV ou e-mail já cadastrado" });
                return;
            }

            console.error(error); // log pra debugar, nunca sumir com o erro
            res.status(500).json({ message: "Erro interno ao cadastrar usuário" });
        }
    }

    static async login(req: Request, res: Response): Promise<void> {
        const data: LoginDto = req.body

        const user = await prisma.user.findUnique({ where: { EDV: data.EDV } })
        if (!user) {
            res.status(404).send({ response: "Not Found!" });
            return;
        }
        const isPasswordValid = await bcrypt.compare(data.password, user.password_login);
        if (!isPasswordValid) {
            res.status(400).send({ response: "Email e/ou senha incorreta" });
            return;
        }

        const secret = process.env.SECRET

        if (!secret) {
            res.status(500).send({ response: "Erro de configuração do servidor" });
            return;
        }

        const token = jwt.sign(
            { EDV: user.EDV },
            secret,
            { expiresIn: "2 days" }
        );

        res.status(200).send({ token: token });
    }
    static async RedefinirSenha(req: Request, res: Response): Promise<void> {
        const data: RedefinirSenhaDto = req.body;
        const { EDV } = req.params;
        const edvNumber = Number(EDV);

        if (!data.token || !data.password || !data.confirmPassword) {
            res.status(400).send({ response: "Campos obrigatórios ausentes" });
            return;
        }

        if (data.password !== data.confirmPassword) {
            res.status(400).send({ response: "Senhas não coincidem" });
            return;
        }

        try {
            const secret = process.env.SECRET;
            if (!secret) {
                res.status(500).send({ response: "Erro de configuração do servidor" });
                return;
            }

            const user = await prisma.user.findUnique({ where: { EDV: edvNumber } });
            if (!user) {
                res.status(404).send({ response: "Not Found!" });
                return;
            }

            const passwordCrypt = await bcrypt.hash(data.password, 10);

            await prisma.user.update({
                where: { EDV: edvNumber },
                data: { password_login: passwordCrypt }
            });

            res.status(200).send({ response: "Senha redefinida com sucesso" });

        } catch (error) {
            res.status(400).send({ response: "Token inválido ou expirado" });
        }
    }

}

export default AuthController;